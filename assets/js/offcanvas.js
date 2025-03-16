class offcanvas {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-offcanvas-target]');
            if (trigger) {
                const targetId = trigger.dataset.offcanvasTarget;
                const offcanvas = document.getElementById(targetId);
                if (offcanvas) {
                    this.toggle(offcanvas);
                }
            }

            // Handle close button clicks
            if (e.target.closest('.btn-close')) {
                const offcanvas = e.target.closest('.offcanvas');
                if (offcanvas) {
                    this.hide(offcanvas);
                }
            }
        });

        // Handle clickaway
        document.addEventListener('click', (e) => {
            const offcanvass = document.querySelectorAll('.offcanvas.show');
            offcanvass.forEach(offcanvas => {
                if (offcanvas.dataset.offcanvasClickaway === 'true' && 
                    !offcanvas.contains(e.target) && 
                    !e.target.closest('[data-offcanvas-target]')) {
                    this.hide(offcanvas);
                }
            });
        });
    }

    toggle(offcanvas) {
        if (offcanvas.classList.contains('show')) {
            this.hide(offcanvas);
        } else {
            this.show(offcanvas);
        }
    }

    show(offcanvas) {
        const hasBackdrop = offcanvas.dataset.offcanvasBackdrop === 'true';
        const disableScroll = offcanvas.dataset.offcanvasScroll === 'false';

        if (hasBackdrop) {
            this.showBackdrop();
        }

        if (disableScroll) {
            document.body.classList.add('offcanvas-scroll-disabled');
        }

        offcanvas.classList.add('show');
    }

    hide(offcanvas) {
        offcanvas.classList.remove('show');
        this.hideBackdrop();
        document.body.classList.remove('offcanvas-scroll-disabled');
    }

    showBackdrop() {
        let backdrop = document.querySelector('.offcanvas-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'offcanvas-backdrop';
            document.body.appendChild(backdrop);
        }
        backdrop.classList.add('show');
    }

    hideBackdrop() {
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.classList.remove('show');
        }
    }
}

// Initialize
new offcanvas();