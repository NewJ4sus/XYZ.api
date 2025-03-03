document.getElementById('menuToggle').addEventListener('click', function () {
    const navbarMenu = document.querySelector('.navbar-menu');
    const style = navbarMenu.getAttribute('data-style-menu');

    // Переключаем видимость меню
    navbarMenu.classList.toggle('active');

    // Применяем стили в зависимости от значения атрибута data-style-menu
    navbarMenu.className = `navbar-menu ${style}`;
});