// ... existing code ...

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar-screen');
    const searchInput = searchBar.querySelector('input');
    const closeButton = document.getElementById('closeSearchBar');

    // Toggle on click
    searchBar.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchInput.focus();
    });

    // Toggle on Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBar.classList.add('active');
            searchInput.focus();
        }
    });

    // Close search bar when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target)) {
            searchBar.classList.remove('active');
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchInput.blur();
        }
    });

    // Закрытие по кнопке
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBar.classList.remove('active');
        searchInput.blur();
    });
});