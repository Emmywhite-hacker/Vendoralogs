const { supabase } = window.VendoraSupabase || {};

// Fetch and display notifications
async function loadNotifications() {
    const user = await window.VendoraSupabase.getUser();
    if (!user) return;
    const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { descending: true });
    const el = document.getElementById('notifications-list');
    el.innerHTML = data.map(n => `<div class="p-2 border-b"><b>${n.title}</b><div>${n.body}</div></div>`).join('');
    // Optionally, mark as read here after user views
}
