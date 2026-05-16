const { supabase } = window.VendoraSupabase || {};

// Fetch products and render grid
async function loadMarketplace() {
    const productsGrid = document.getElementById('products-grid');
    const { data: products, error } = await supabase
        .from('products').select('*').eq('is_featured', true);
    if (error) return productsGrid.innerHTML = '<p class="text-red-500">Failed to load.</p>';
    // Render product cards
    productsGrid.innerHTML = products.map(prod => `
        <div class="glass p-4 rounded-xl shadow-lg flex flex-col gap-2">
            <img src="${prod.image_url||'/assets/img/placeholder-hero.png'}" alt="${prod.title}" class="w-full rounded-lg aspect-square object-cover" />
            <div class="font-bold text-lg">${prod.title}</div>
            <div class="text-sm text-gray-400">${prod.category}</div>
            <div class="font-semibold text-gold-500 mb-2">â‚¦${prod.price.toLocaleString()}</div>
            <button onclick="openProductModal('${prod.id}')" class="neon-btn bg-gradient-to-r from-blue-500 to-gold-500 text-white w-full py-2 rounded-full font-semibold">Buy</button>
        </div>
    `).join('');
}
// Product modal
async function openProductModal(productId) {
    // Fetch product/variants, show modal for purchase etc.
    // Placeholder: to be implemented
}
// Search / category filter handlers can be implemented similarly
