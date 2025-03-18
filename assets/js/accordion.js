document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordions
    const accordions = document.querySelectorAll('.ui[data-ui="accordion"]');
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.ui-item');
        
        items.forEach(item => {
            const header = item.querySelector('.ui-header');
            const content = item.querySelector('.ui-content');
            
            header.addEventListener('click', () => {
                // Close other items in this accordion
                items.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.ui-content').style.maxHeight = '0';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            });
        });
    });
});