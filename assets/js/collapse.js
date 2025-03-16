class Collapse {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-collapse-target]');
            if (trigger) {
                const targetId = trigger.dataset.collapseTarget;
                const collapse = document.getElementById(targetId);
                if (collapse) {
                    this.toggle(collapse);
                }
            }

            // Handle close button clicks
            if (e.target.closest('.btn-close')) {
                const collapse = e.target.closest('.collapse');
                if (collapse) {
                    this.hide(collapse);
                }
            }
        });

        // Handle clickaway
        document.addEventListener('click', (e) => {
            const collapses = document.querySelectorAll('.collapse.show');
            collapses.forEach(collapse => {
                if (collapse.dataset.collapseClickaway === 'true' && 
                    !collapse.contains(e.target) && 
                    !e.target.closest('[data-collapse-target]')) {
                    this.hide(collapse);
                }
            });
        });
    }

    toggle(collapse) {
        if (collapse.classList.contains('show')) {
            this.hide(collapse);
        } else {
            this.show(collapse);
        }
    }

    show(collapse) {
        const hasBackdrop = collapse.dataset.collapseBackdrop === 'true';
        const disableScroll = collapse.dataset.collapseScroll === 'false';

        if (hasBackdrop) {
            this.showBackdrop();
        }

        if (disableScroll) {
            document.body.classList.add('collapse-scroll-disabled');
        }

        collapse.classList.add('show');
    }

    hide(collapse) {
        collapse.classList.remove('show');
        this.hideBackdrop();
        document.body.classList.remove('collapse-scroll-disabled');
    }

    showBackdrop() {
        let backdrop = document.querySelector('.collapse-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'collapse-backdrop';
            document.body.appendChild(backdrop);
        }
        backdrop.classList.add('show');
    }

    hideBackdrop() {
        const backdrop = document.querySelector('.collapse-backdrop');
        if (backdrop) {
            backdrop.classList.remove('show');
        }
    }
}

// Initialize
new Collapse();