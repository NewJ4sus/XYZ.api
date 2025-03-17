document.addEventListener('DOMContentLoaded', function() {
    const toggleElements = document.querySelectorAll('.accordion-item, .collapse, .collapse-nostyle');

    toggleElements.forEach(element => {
        const header = element.querySelector('.accordion-header, .collapse-header, .collapse-btn');
        const content = element.querySelector('.accordion-collapse, .collapse-content');

        header.addEventListener('click', () => {
            // Close all other elements
            toggleElements.forEach(otherElement => {
                if (otherElement !== element && otherElement.classList.contains('active')) {
                    otherElement.classList.remove('active');
                    otherElement.querySelector('.accordion-collapse, .collapse-content').style.maxHeight = '0';
                }
            });

            // Toggle current element
            element.classList.toggle('active');
            if (element.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});