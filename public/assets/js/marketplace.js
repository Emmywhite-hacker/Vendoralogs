// ============================================
// MARKETPLACE FUNCTIONS
// ============================================

async function loadMarketplace() {
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) {
        console.error('Supabase not available');
        return;
    }
    
    const user = await window.VendoraSupabase.getUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        // Load wallet balance
        const { data: wallets } = await supabase
            .from('wallets')
            .select('balance')
            .eq('user_id', user.id)
            .single();
        
        const balance = wallets?.balance || 0;
        const balanceEl = document.getElementById('wallet-balance');
        if (balanceEl) {
            balanceEl.textContent = 'â‚¦' + parseFloat(balance).toLocaleString();
        }
        
        // Load products
        const { data: products, error } = await supabase
            .from('products')
            .select('*');
        
        if (error) throw error;
        
        const grid = document.getElementById('products-grid');
        if (!grid) return;
        
        grid.innerHTML = (products || []).map(product => `
            <div class="glass p-4 rounded-xl shadow-lg flex flex-col gap-3">
                <img 
                    src="${product.image_url || '/assets/img/placeholder.png'}" 
                    alt="${product.title}" 
                    class="w-full h-40 object-cover rounded-lg"
                    onerror="this.src='/assets/img/placeholder.png'"
                />
                <div class="font-bold text-lg">${product.title}</div>
                <div class="text-sm text-gray-400">${product.category || 'Uncategorized'}</div>
                <div class="text-yellow-400 font-semibold">â‚¦${parseFloat(product.price).toLocaleString()}</div>
                <button 
                    onclick="buyProduct('${product.id}', ${product.price}, '${product.title}')"
                    class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition"
                >
                    Buy Now
                </button>
            </div>
        `).join('');
        
        console.log('âœ… Marketplace loaded');
        
    } catch (error) {
        console.error('Error loading marketplace:', error);
        alert('Error loading products: ' + error.message);
    }
}

async function buyProduct(productId, price, title) {
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) return;
    
    const user = await window.VendoraSupabase.getUser();
    if (!user) {
        alert('Please login first');
        window.location.href = '/login.html';
        return;
    }
    
    try {
        // Get wallet
        const { data: wallet } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', user.id)
            .single();
        
        if (!wallet) {
            alert('âŒ Wallet not found');
            return;
        }
        
        if (wallet.balance < price) {
            alert(`âŒ Insufficient balance. You need â‚¦${price - wallet.balance} more`);
            return;
        }
        
        // Deduct from wallet
        const newBalance = wallet.balance - price;
        const { error: updateError } = await supabase
            .from('wallets')
            .update({ balance: newBalance })
            .eq('id', wallet.id);
        
        if (updateError) throw updateError;
        
        // Create transaction
        const { error: txError } = await supabase
            .from('transactions')
            .insert([{
                user_id: user.id,
                type: 'purchase',
                amount: price,
                status: 'completed',
                reference: `PURCHASE_${Date.now()}`
            }]);
        
        if (txError) throw txError;
        
        // Create order
        const { error: orderError } = await supabase
            .from('orders')
            .insert([{
                product_id: productId,
                user_id: user.id,
                price: price,
                status: 'completed'
            }]);
        
        if (orderError) throw orderError;
        
        alert(`âœ… Purchase successful! ${title} added to your account.`);
        loadMarketplace();
        
    } catch (error) {
        console.error('Purchase error:', error);
        alert('âŒ Purchase failed: ' + error.message);
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const products = document.querySelectorAll('#products-grid > div');
            
            products.forEach(product => {
                const title = product.querySelector('.font-bold')?.textContent.toLowerCase() || '';
                product.style.display = title.includes(query) ? 'flex' : 'none';
            });
        });
    }
    
    loadMarketplace();
});

console.log('âœ… Marketplace functions loaded');
