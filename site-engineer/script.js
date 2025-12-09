// ========================================
// CPMS - SITE ENGINEER DASHBOARD SCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.getElementById('sidebar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navItems = document.querySelectorAll('.nav-item');
    const viewContainers = document.querySelectorAll('.view-container');
    const logoutBtn = document.querySelector('.logout-btn');

    // ========================================
    // MOBILE SIDEBAR TOGGLE
    // ========================================
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth <= 900) {
            sidebar.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ========================================
    // NAVIGATION & VIEW SWITCHING
    // ========================================
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target page
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            navItems.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Hide all views
            viewContainers.forEach(function(view) {
                view.classList.remove('active');
            });
            
            // Show target view
            const targetView = document.getElementById(targetPage + '-view');
            if (targetView) {
                targetView.classList.add('active');
            }
            
            // Close mobile menu after navigation
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // ========================================
    // LOGOUT FUNCTIONALITY
    // ========================================
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            const confirmLogout = confirm('Are you sure you want to logout?');
            if (confirmLogout) {
                // Add your logout logic here
                // For demo purposes, we'll just reload the page
                alert('Logout functionality - redirect to login page');
                // window.location.href = '/login';
            }
        });
    }

    // ========================================
    // RESPONSIVE HANDLING
    // ========================================
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close sidebar when resizing to desktop view
            if (window.innerWidth > 900) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
        }, 250);
    });

    // ========================================
    // CARD HOVER ENHANCEMENTS
    // ========================================
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ========================================
    // PREVENT LAYOUT SHIFT ON IMAGE LOAD
    // ========================================
    
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        // Set explicit dimensions to prevent layout shift
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Show placeholder if image fails to load
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('logo-placeholder') || 
                placeholder.classList.contains('avatar-placeholder')) {
                this.style.display = 'none';
                placeholder.style.display = 'flex';
            }
        });
    });

    // ========================================
    // KEYBOARD NAVIGATION
    // ========================================
    
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ========================================
    // SMOOTH ANIMATIONS ON PAGE LOAD
    // ========================================
    
    // Fade in cards on load
    setTimeout(function() {
        cards.forEach(function(card, index) {
            setTimeout(function() {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
                
                requestAnimationFrame(function() {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });
    }, 100);

    // ========================================
    // CONSOLE LOG FOR DEBUGGING
    // ========================================
    
    console.log('CPMS Site Engineer Dashboard Initialized');
    console.log('Active View:', document.querySelector('.view-container.active').id);
});

