// ============================================
// WALLET FUNCTIONS
// ============================================

async function loadWalletData() {
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) return;
    
    const user = await window.VendoraSupabase.getUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }
    
    try {
        // Load wallet balance
        const { data: wallet } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', user.id)
            .single();
        
        const balance = wallet?.balance || 0;
        const balanceEl = document.getElementById('wallet-balance');
        if (balanceEl) {
            balanceEl.textContent = 'â‚¦' + parseFloat(balance).toLocaleString();
        }
        
        // Load transactions
        const { data: transactions } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(50);
        
        const txTable = document.getElementById('wallet-txs');
        if (txTable) {
            txTable.innerHTML = (transactions || []).map(tx => `
                <tr class="border-b hover:bg-white/5">
                    <td class="py-2 px-2">${new Date(tx.created_at).toLocaleString()}</td>
                    <td class="py-2 px-2 capitalize">${tx.type}</td>
                    <td class="py-2 px-2 font-semibold">â‚¦${parseFloat(tx.amount).toLocaleString()}</td>
                    <td class="py-2 px-2">
                        <span class="px-2 py-1 rounded text-xs ${tx.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}">
                            ${tx.status}
                        </span>
                    </td>
                </tr>
            `).join('');
        }
        
        console.log('âœ… Wallet data loaded');
        
    } catch (error) {
        console.error('Error loading wallet:', error);
        alert('Error: ' + error.message);
    }
}

async function depositWallet(e) {
    e.preventDefault();
    
    const amount = parseInt(e.target.amount?.value, 10) || 0;
    if (amount <= 0) {
        alert('âŒ Amount must be greater than 0');
        return;
    }
    
    alert(`ðŸ’³ Opening payment for â‚¦${amount}\n\n(Demo mode - in production, Kora Pay would open here)`);
    
    // In production, integrate with Kora Pay here
    // For now, we'll simulate success
    setTimeout(async () => {
        const supabase = window.VendoraSupabase?.supabase;
        const user = await window.VendoraSupabase.getUser();
        
        if (!supabase || !user) return;
        
        try {
            // Get wallet
            const { data: wallet } = await supabase
                .from('wallets')
                .select('*')
                .eq('user_id', user.id)
                .single();
            
            if (!wallet) return;
            
            // Update balance
            const newBalance = wallet.balance + amount;
            await supabase
                .from('wallets')
                .update({ balance: newBalance })
                .eq('id', wallet.id);
            
            // Record transaction
            await supabase.from('transactions').insert([{
                user_id: user.id,
                type: 'deposit',
                amount: amount,
                status: 'completed',
                reference: `DEPOSIT_${Date.now()}`
            }]);
            
            alert('âœ… Deposit successful!');
            e.target.reset();
            loadWalletData();
            
        } catch (error) {
            console.error('Deposit error:', error);
        }
    }, 2000);
}

document.addEventListener('DOMContentLoaded', loadWalletData);

console.log('âœ… Wallet functions loaded');
