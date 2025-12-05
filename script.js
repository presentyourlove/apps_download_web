document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'aifinance_theme';

    // 1. Check for saved user preference
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Default is dark as per HTML structure, but we can respect system preference if needed.
        // For this requirement, "Default to Dark Mode" is primary.
        // So we don't strictly need to check system preference unless we want to be very smart.
        // Let's stick to the explicit "Default is Dark Mode" requested.
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // 2. Toggle Theme Function
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update DOM
        htmlElement.setAttribute('data-theme', newTheme);

        // Save to LocalStorage
        localStorage.setItem(THEME_KEY, newTheme);

        // Optional: Animation effect for button
        themeToggleBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'scale(1)';
        }, 150);
    });
});
