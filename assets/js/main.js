// Vendora Market - MAIN JS (for homepage and site-wide functions)

/* Dark/Light Mode Toggling */
function toggleDarkMode() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('vendoraTheme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('vendoraTheme', 'dark');
    }
}
function loadTheme() {
    if (localStorage.getItem('vendoraTheme') === 'dark' ||
        (!('vendoraTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}
loadTheme();

/* Animated Floater Icons (hero social icons) */
function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    icons.forEach((icon, idx) => {
        icon.animate([
            { transform: `translateY(0px)` },
            { transform: `translateY(${(idx % 2 === 0 ? 1 : -1) * 16}px)` },
            { transform: `translateY(0px)` }
        ], {
            duration: 3800 + idx*406,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
    });
}
window.addEventListener('DOMContentLoaded', animateFloatingIcons);

/* Modal System */
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

/* Live Statistics Counter Animation */
function animateCounters() {
    document.querySelectorAll('.stat-counter').forEach(el => {
        let target = parseInt(el.dataset.target, 10) || 0;
        let count = 0;
        let inc = Math.max(1, Math.floor(target / 60));
        let interval = setInterval(() => {
            count += inc;
            if (count >= target) { count = target; clearInterval(interval);}
            el.textContent = count.toLocaleString();
        }, 24);
    });
}
window.addEventListener('DOMContentLoaded', animateCounters);

/// Notification bell badge (fetch unread notifications)
async function fetchNotificationsIcon() {
    const { VendoraSupabase } = window;
    if (!VendoraSupabase) return;
    const user = await VendoraSupabase.getUser();
    if (!user) return;
    const { data, error } = await VendoraSupabase.supabase
        .from('notifications').select('*').eq('user_id', user.id).eq('is_read', false);
    const count = data?.length || 0;
    const badge = document.getElementById('notification-badge');
    if (badge) badge.textContent = count > 0 ? count : '';
}
window.fetchNotificationsIcon = fetchNotificationsIcon;
