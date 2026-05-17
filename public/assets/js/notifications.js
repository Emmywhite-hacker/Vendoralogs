// ============================================
// NOTIFICATIONS FUNCTIONS
// ============================================

async function loadNotifications() {
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) return;
    
    const user = await window.VendoraSupabase.getUser();
    if (!user) return;
    
    try {
        const { data: notifications } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);
        
        const list = document.getElementById('notifications-list');
        if (!list) return;
        
        list.innerHTML = (notifications || []).map(n => `
            <div class="p-3 border-b border-gray-600 hover:bg-white/5">
                <div class="font-bold">${n.title || 'Notification'}</div>
                <div class="text-sm text-gray-400">${n.body || ''}</div>
                <div class="text-xs text-gray-500 mt-1">${new Date(n.created_at).toLocaleString()}</div>
            </div>
        `).join('') || '<div class="p-3 text-gray-400">No notifications</div>';
        
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadNotifications);

console.log('âœ… Notifications functions loaded');
