class FrameResizer {
    constructor() {
        this.frames = document.querySelectorAll('#frame');
        this.init();
    }

    init() {
        this.frames.forEach(frame => {
            const resizer = document.createElement('div');
            resizer.className = 'frame-resizer';

            const widthIndicator = document.createElement('div');
            widthIndicator.className = 'width-indicator';
            frame.appendChild(widthIndicator);
            frame.appendChild(resizer);

            this.updateWidthIndicator(frame, widthIndicator);

            const savedWidth = localStorage.getItem(`frame-${frame.dataset.id || 'default'}`);
            if (savedWidth) {
                frame.style.width = savedWidth;
                this.updateWidthIndicator(frame, widthIndicator);
            }

            let startX, startWidth;

            const startResize = (e) => {
                startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                startWidth = frame.offsetWidth;
                if (e.type.includes('touch')) {
                    document.addEventListener('touchmove', resize, { passive: false });
                    document.addEventListener('touchend', stopResize);
                } else {
                    document.addEventListener('mousemove', resize);
                    document.addEventListener('mouseup', stopResize);
                }
                document.body.style.cursor = 'ew-resize';
                frame.style.userSelect = 'none';
                frame.classList.add('resizing');
                widthIndicator.classList.add('active');
            };

            const resize = (e) => {
                e.preventDefault(); // Предотвращаем прокрутку на тач-устройствах
                const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                const width = startWidth + (currentX - startX);
                const newWidth = Math.min(Math.max(360, width), window.innerWidth);
                frame.style.width = newWidth + 'px';
                this.updateWidthIndicator(frame, widthIndicator);
            };

            const stopResize = () => {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
                document.removeEventListener('touchmove', resize);
                document.removeEventListener('touchend', stopResize);
                document.body.style.cursor = '';
                frame.style.userSelect = '';
                frame.classList.remove('resizing');
                widthIndicator.classList.remove('active');
                localStorage.setItem(`frame-${frame.dataset.id || 'default'}`, frame.style.width);
            };

            resizer.addEventListener('mousedown', startResize);
            resizer.addEventListener('touchstart', startResize, { passive: false });

            window.addEventListener('resize', () => {
                this.updateWidthIndicator(frame, widthIndicator);
            });
        });
    }

    updateWidthIndicator(frame, indicator) {
        indicator.textContent = `${Math.round(frame.offsetWidth)}px`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FrameResizer();
});