document.addEventListener('DOMContentLoaded', () => {
    // Apply custom colors to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    socialIcons.forEach((icon, index) => {
        const color = isDarkMode && icon.dataset.colorDark 
            ? icon.dataset.colorDark 
            : icon.dataset.color;
        
        icon.querySelector('i').style.color = color;

        // Stagger animation
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.8)';
        setTimeout(() => {
            icon.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 300 + (index * 50));
    });

    // Apply custom colors to link icons
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        const color = card.dataset.color;
        const icon = card.querySelector('.link-icon');
        if (icon && color) {
            icon.style.color = color;
        }

        // Stagger animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 80));
    });

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        socialIcons.forEach(icon => {
            const color = e.matches && icon.dataset.colorDark 
                ? icon.dataset.colorDark 
                : icon.dataset.color;
            icon.querySelector('i').style.color = color;
        });
    });
});
