function showAlert(type, message, withBg = true, showClose = true, showStatusIcon = true, autoClose = false) {
    const alertsContainer = document.querySelector('.alerts-container');
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} ${withBg ? 'with-bg' : ''}`;
    
    // Alert icon based on type
    const icons = {
        default: `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4m0 4h.01"/>
        </svg>`,
        success: `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <path d="M22 4L12 14.01l-3-3"/>
        </svg>`,
        warning: `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <path d="M12 9v4m0 4h.01"/>
        </svg>`,
        error: `<svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M15 9l-6 6m0-6l6 6"/>
        </svg>`
    };

    // Create alert content
    alert.innerHTML = `
        ${showStatusIcon ? icons[type] : ''}
        <div class="alert-content">${message}</div>
        ${showClose ? `
            <button class="alert-close" onclick="closeAlert(this.parentElement)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        ` : ''}
    `;

    // Add to container
    alertsContainer.appendChild(alert);

    // Auto close if enabled
    if (autoClose) {
        setTimeout(() => closeAlert(alert), 5000);
    }
}

function closeAlert(alert) {
    alert.classList.add('removing');
    setTimeout(() => alert.remove(), 300);
}