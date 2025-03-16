document.addEventListener("DOMContentLoaded", function () {
    // Инициализация tooltip
    const tooltipButtons = document.querySelectorAll("[data-bs-toggle='tooltip']");
    tooltipButtons.forEach(button => {
        button.addEventListener("mouseenter", function () {
            showElement(button, "custom-tooltip");
        });
        button.addEventListener("mouseleave", function () {
            hideElement(button);
        });
    });

    // Инициализация popover
    const popoverButtons = document.querySelectorAll("[data-bs-toggle='popover']");
    popoverButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            togglePopover(button);
        });
    });

    document.addEventListener("click", function (event) {
        const clickedButton = event.target.closest('[data-bs-toggle="popover"]');
        
        document.querySelectorAll(".custom-popover").forEach(popover => {
            const button = popover._button;
            
            // Если кликнули не по кнопке и не по поповеру
            if (!clickedButton && !event.target.closest('.custom-popover')) {
                // Проверяем data-prevent-close только для поповера, по области которого не кликнули
                if (!button || button.getAttribute("data-prevent-close") !== "true") {
                    popover.remove();
                    if (button) button._element = null;
                }
            }
            // Если кликнули по другой кнопке
            else if (clickedButton && button !== clickedButton) {
                // Закрываем предыдущий поповер только если у новой кнопки нет data-prevent-close
                if (clickedButton.getAttribute("data-prevent-close") !== "true") {
                    popover.remove();
                    if (button) button._element = null;
                }
            }
        });
    });

    function showElement(button, className) {
        // Проверяем, существует ли уже элемент
        if (button._element) {
            button._element.remove();
            button._element = null;
            return;
        }

        let element = document.createElement("div");
        element.classList.add(className);
        element.textContent = button.getAttribute("data-bs-content");
        document.body.appendChild(element);
        element._button = button;
        button._element = element;
        positionElement(element, button, button.getAttribute("data-bs-placement"));

        // Добавляем обработчик для предотвращения закрытия при клике по самому поповеру
        element.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    }

    function hideElement(button) {
        if (button._element) {
            button._element.remove();
            button._element = null;
        }
    }

    function togglePopover(button) {
        const existingPopover = button._element;
        
        if (existingPopover) {
            existingPopover.remove();
            button._element = null;
        } else {
            // Если у текущей кнопки нет data-prevent-close, закрываем все остальные поповеры
            if (button.getAttribute("data-prevent-close") !== "true") {
                document.querySelectorAll(".custom-popover").forEach(popover => {
                    if (popover._button) {
                        popover.remove();
                        popover._button._element = null;
                    }
                });
            }
            showElement(button, "custom-popover");
        }
    }

    function positionElement(element, button, placement) {
        const rect = button.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const offset = 10;

        // Получаем размеры окна
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Изначально позиционируем элемент согласно placement
        let left, top;
        
        switch (placement) {
            case "top":
                left = rect.left + scrollLeft + rect.width / 2 - element.offsetWidth / 2;
                top = rect.top + scrollTop - element.offsetHeight - offset;
                
                // Если элемент выходит за верхнюю границу, переместим его вниз
                if (top - scrollTop < 0) {
                    top = rect.bottom + scrollTop + offset;
                }
                break;
            case "right":
                left = rect.right + scrollLeft + offset;
                top = rect.top + scrollTop + rect.height / 2 - element.offsetHeight / 2;
                
                // Если элемент выходит за правую границу, переместим его влево
                if (left + element.offsetWidth - scrollLeft > windowWidth) {
                    left = rect.left + scrollLeft - element.offsetWidth - offset;
                }
                break;
            case "bottom":
                left = rect.left + scrollLeft + rect.width / 2 - element.offsetWidth / 2;
                top = rect.bottom + scrollTop + offset;
                
                // Если элемент выходит за нижнюю границу, переместим его вверх
                if (top + element.offsetHeight - scrollTop > windowHeight) {
                    top = rect.top + scrollTop - element.offsetHeight - offset;
                }
                break;
            case "left":
                left = rect.left + scrollLeft - element.offsetWidth - offset;
                top = rect.top + scrollTop + rect.height / 2 - element.offsetHeight / 2;
                
                // Если элемент выходит за левую границу, переместим его вправо
                if (left - scrollLeft < 0) {
                    left = rect.right + scrollLeft + offset;
                }
                break;
        }

        // Проверяем и корректируем горизонтальное положение
        if (left - scrollLeft < 0) {
            left = scrollLeft + offset;
        } else if (left + element.offsetWidth - scrollLeft > windowWidth) {
            left = windowWidth + scrollLeft - element.offsetWidth - offset;
        }

        // Проверяем и корректируем вертикальное положение
        if (top - scrollTop < 0) {
            top = scrollTop + offset;
        } else if (top + element.offsetHeight - scrollTop > windowHeight) {
            top = windowHeight + scrollTop - element.offsetHeight - offset;
        }

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }
});
