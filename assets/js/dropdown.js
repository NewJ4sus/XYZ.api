class Dropdown {
    constructor(element) {
        this.dropdown = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.isCentered = element.classList.contains('centered-items');
        
        this.init();
    }

    init() {
        // Toggle dropdown
        this.toggle.addEventListener('click', () => this.toggleDropdown());

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Handle item selection
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.selectItem(item);
            });
        });

        // Initialize centered items if needed
        if (this.isCentered) {
            this.initCenteredItems();
        }

        // Handle initial position for non-centered dropdowns
        if (!this.isCentered) {
            this.handlePosition();
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.dropdown.classList.contains('active')) {
                if (this.isCentered) {
                    this.positionCenteredMenu();
                } else {
                    this.handlePosition();
                }
            }
        });

        // Handle scroll
        if (this.isCentered) {
            // For centered dropdowns, only need to handle scroll inside the menu
            this.menu.addEventListener('scroll', (e) => {
                if (this.dropdown.classList.contains('active')) {
                    e.stopPropagation(); // Prevent window scroll handler from firing
                }
            });
        } else {
            // For standard dropdowns, handle window scroll
            window.addEventListener('scroll', () => {
                if (this.dropdown.classList.contains('active')) {
                    this.handlePosition();
                }
            }, true);
        }
    }

    toggleDropdown() {
        const isActive = !this.dropdown.classList.contains('active');
        
        if (isActive) {
            this.dropdown.classList.remove('closing');
            this.dropdown.classList.add('active');
            if (this.isCentered) {
                this.positionCenteredMenu();
            } else {
                this.handlePosition();
            }
        } else {
            this.closeDropdown();
        }
    }

    closeDropdown() {
        this.dropdown.classList.add('closing');
        this.dropdown.classList.remove('active');
    }

    selectItem(item) {
        if (this.isCentered) {
            // Update selected state
            this.items.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            
            // Update toggle text and close immediately
            this.toggle.textContent = item.textContent;
            this.closeDropdown();
        } else {
            // For standard dropdowns, update immediately
            this.toggle.textContent = item.textContent;
            this.closeDropdown();
        }
    }

    initCenteredItems() {
        // Set initial selected item
        const selected = Array.from(this.items).find(item => 
            item.classList.contains('selected')
        ) || this.items[0];
        
        selected.classList.add('selected');
        this.toggle.textContent = selected.textContent;
    }

    positionCenteredMenu() {
        const toggleRect = this.toggle.getBoundingClientRect();
        const selected = this.dropdown.querySelector('.dropdown-item.selected');
        const itemHeight = 40; // Fixed height from CSS
        const selectedIndex = Array.from(this.items).indexOf(selected);
        const totalItems = this.items.length;
        
        // Calculate how many items we want to show in total (max 8)
        const maxVisibleItems = Math.min(8, totalItems);
        const menuHeight = maxVisibleItems * itemHeight;
        
        // Calculate ideal position to center selected item on toggle
        let topPosition = selectedIndex * itemHeight;
        
        // Calculate how many items should be visible above selected item
        const idealItemsAbove = Math.min(selectedIndex, Math.floor((maxVisibleItems - 1) / 2));
        const idealItemsBelow = maxVisibleItems - idealItemsAbove - 1;
        
        // Adjust position based on ideal items above
        topPosition = idealItemsAbove * itemHeight;
        
        // Check if we're near the end of the list
        const remainingItemsBelow = totalItems - selectedIndex - 1;
        if (remainingItemsBelow < idealItemsBelow) {
            // Adjust position to show more items above
            const extraItemsAbove = idealItemsBelow - remainingItemsBelow;
            topPosition = Math.min((selectedIndex + extraItemsAbove) * itemHeight, (totalItems - maxVisibleItems) * itemHeight);
        }
        
        // Apply final position and height
        this.menu.style.maxHeight = `${menuHeight}px`;
        this.menu.style.height = `${menuHeight}px`;
        this.menu.style.top = `${-topPosition}px`;
        
        // Scroll to show selected item
        requestAnimationFrame(() => {
            const scrollPosition = selectedIndex * itemHeight - topPosition;
            this.menu.scrollTop = Math.max(0, scrollPosition);
        });
    }

    handlePosition() {
        const position = this.dropdown.dataset.position || 'bottom left';
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Check if dropdown would go off screen
        const dropdownRect = this.dropdown.getBoundingClientRect();
        const menuRect = this.menu.getBoundingClientRect();

        // Reset position to original if conditions allow
        const originalPosition = this.dropdown.dataset.originalPosition || position;
        this.dropdown.dataset.originalPosition = this.dropdown.dataset.originalPosition || position;
        this.dropdown.dataset.position = originalPosition;

        // Handle vertical position
        if (originalPosition.includes('top')) {
            if (dropdownRect.top < menuRect.height) {
                this.dropdown.dataset.position = originalPosition.replace('top', 'bottom');
            }
        } else if (originalPosition.includes('bottom')) {
            if ((dropdownRect.bottom + menuRect.height) > viewportHeight) {
                this.dropdown.dataset.position = originalPosition.replace('bottom', 'top');
            }
        }

        // Handle horizontal position
        if (originalPosition.includes('right')) {
            if ((dropdownRect.right + menuRect.width) > viewportWidth) {
                this.dropdown.dataset.position = this.dropdown.dataset.position.replace('right', 'left');
            }
        } else if (originalPosition.includes('left')) {
            if (dropdownRect.left < 0) {
                this.dropdown.dataset.position = this.dropdown.dataset.position.replace('left', 'right');
            }
        }
    }
}

// Initialize all dropdowns
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        new Dropdown(dropdown);
    });
}); 