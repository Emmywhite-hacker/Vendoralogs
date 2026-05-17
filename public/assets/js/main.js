// ============================================
// MAIN SITE FUNCTIONS
// ============================================

// Dark Mode Toggle
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

// Load theme on page load
function loadTheme() {
    const theme = localStorage.getItem('vendoraTheme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    }
}

loadTheme();

// Modal Functions
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        console.log(`ðŸ“‚ Modal opened: ${id}`);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        console.log(`ðŸ“‚ Modal closed: ${id}`);
    }
}

// Animate Floating Icons
function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    icons.forEach((icon, idx) => {
        const duration = 3800 + idx * 406;
        const offset = (idx % 2 === 0 ? 1 : -1) * 16;
        
        icon.animate([
            { transform: 'translateY(0px)' },
            { transform: `translateY(${offset}px)` },
            { transform: 'translateY(0px)' }
        ], {
            duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
    });
}

// Animate Statistics Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        let current = 0;
        const increment = Math.ceil(target / 60);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current.toLocaleString();
        }, 30);
    });
}

// Fetch and update notifications badge
async function updateNotificationBadge() {
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) return;
    
    try {
        const user = await window.VendoraSupabase.getUser();
        if (!user) return;
        
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_read', false);
        
        const badge = document.getElementById('notification-badge');
        if (badge) {
            const count = data?.length || 0;
            badge.textContent = count > 0 ? count : '';
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('âœ… DOM Content Loaded');
    animateFloatingIcons();
    animateCounters();
    updateNotificationBadge();
    
    // Set intervals for periodic updates
    setInterval(updateNotificationBadge, 30000);
});

console.log('âœ… Main functions loaded');
