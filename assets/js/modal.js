document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.getElementById(trigger.dataset.modalTarget);
            if (modal) {
                modal.style.display = 'block';
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            closeModal(modal);
        });
    });

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200); // Уменьшил время до 200мс
        }
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
});