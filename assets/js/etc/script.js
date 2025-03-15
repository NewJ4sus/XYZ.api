// Для aside left menu
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(button => {
        button.addEventListener('click', () => {
            const navItem = button.closest('.aside-item');
            if (navItem) {
                navItem.classList.toggle('active');
            }
        });
    });
});


// Анимация текста в заголовке
const textElement = document.getElementById('animated-text');
// Функция для добавления текста с задержкой
function addText(text, delay) {
    return new Promise((resolve) => {
        setTimeout(() => { textElement.textContent += text; resolve(); }, delay);
    });
}
// Функция для удаления последнего символа с задержкой
function delText(delay) {
    return new Promise((resolve) => {
        setTimeout(() => { textElement.textContent = textElement.textContent.slice(0, -1); resolve(); }, delay);
    });
}
// Отрисовка текста
async function animateText() {
    await addText("X", 300); // Добавляем "X" с задержкой 300 мс
    await addText("Y", 300); // Добавляем "Y" с задержкой 300 мс
    await addText("I", 300); // Добавляем "I" с задержкой 300 мс
    await delText(500);      // Удаляем последний символ ("I") с задержкой 500 мс
    await addText("Z", 300); // Добавляем "Z" с задержкой 300 мс
    await addText(".", 300); // Добавляем "." с задержкой 300 мс
    await addText("a", 300); // Добавляем "a" с задержкой 300 мс
    await addText("p", 300); // Добавляем "p" с задержкой 300 мс
    await addText("i", 300); // Добавляем "i" с задержкой 300 мс
}
animateText();


// Кнопка переключения темы
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    // Сохраняем выбор темы в localStorage
    localStorage.setItem('theme', newTheme);
}
// Устанавливаем тему при загрузке страницы
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}
// Вызываем initTheme() сразу
initTheme();

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
}); 