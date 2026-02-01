export class LinksComponent {
  constructor() {
    this.links = document.querySelectorAll('.link-card');
    this.init();
  }

  init() {
    this.applyColors();
    this.setupHoverEffects();
  }

  applyColors() {
    this.links.forEach(link => {
      const color = link.dataset.color;
      const icon = link.querySelector('.link-icon');
      
      if (icon && color) {
        icon.style.color = color;
      }

      // Apply glow color
      link.addEventListener('mouseenter', () => {
        const glow = link.querySelector('.link-glow');
        if (glow && color) {
          glow.style.background = `linear-gradient(135deg, ${color}33, ${color}11)`;
        }
      });
    });
  }

  setupHoverEffects() {
    this.links.forEach(link => {
      let timeout;
      
      link.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        link.style.willChange = 'transform';
      });

      link.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          link.style.willChange = 'auto';
        }, 300);
      });
    });
  }
}