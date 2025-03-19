class Scrollspy {
    constructor(options = {}) {
        this.content = document.querySelector(options.content || '#scrollspy-content');
        this.nav = document.querySelector(options.nav || '#scrollspy-nav');
        this.offset = options.offset || 20;
        this.sections = [];
        this.navLinks = [];
        this.currentSection = null;
        
        this.init();
    }

    init() {
        this.sections = Array.from(this.content.querySelectorAll('[id]'));
        this.navLinks = Array.from(this.nav.querySelectorAll('.nav-link'));

        // Throttle scroll event for better performance
        let ticking = false;
        this.content.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = this.content.querySelector(targetId);
                
                if (targetSection) {
                    const containerRect = this.content.getBoundingClientRect();
                    const targetRect = targetSection.getBoundingClientRect();
                    const relativeTop = targetRect.top - containerRect.top;
                    
                    this.content.scrollTo({
                        top: this.content.scrollTop + relativeTop - this.offset,
                        behavior: 'smooth'
                    });
                }
            });
        });

        this.onScroll();
    }

    onScroll() {
        const scrollPosition = this.content.scrollTop;
        const containerRect = this.content.getBoundingClientRect();
        let currentSection = null;
        let minDistance = Infinity;

        // Find the nearest section
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - containerRect.top - this.offset);
            
            // Check if section is in viewport
            if (rect.top >= containerRect.top - rect.height/2 && 
                rect.bottom <= containerRect.bottom + rect.height/2) {
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = section;
                }
            }
        });

        // If no section is found in viewport, find the nearest one
        if (!currentSection) {
            this.sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top - containerRect.top - this.offset);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSection = section;
                }
            });
        }

        // Only update if section changed
        if (currentSection && this.currentSection !== currentSection) {
            this.currentSection = currentSection;
            this.updateActiveState(currentSection);
        }
    }

    updateActiveState(activeSection) {
        // Remove all active classes first
        this.navLinks.forEach(link => link.classList.remove('active'));

        // Find and activate current link
        const activeLink = this.nav.querySelector(`a[href="#${activeSection.id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');

            // Handle parent sections
            let parent = activeLink.closest('ul').closest('li');
            while (parent) {
                const parentLink = parent.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
                parent = parent.closest('ul').closest('li');
            }
        }
    }
}

// Initialize Scrollspy
document.addEventListener('DOMContentLoaded', () => {
    const scrollspy = new Scrollspy();
});