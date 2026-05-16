// Admin dashboard actions

const { supabase } = window.VendoraSupabase || {};

/* Admin actions (add/edit/delete)... Placeholders, expand as needed */
async function createProduct(e) {
    e.preventDefault();
    const form = e.target;
    const { data, error } = await supabase.from('products').insert([{
        title: form.title.value,
        description: form.description.value,
        price: form.price.value,
        category: form.category.value,
        image_url: form.image_url.value
    }]);
    if (error) alert(error.message);
    else alert('Product Created!');
}

async function deleteProduct(id) {
    if (!confirm('Delete product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert(error.message);
    else alert('Product deleted!');
}
