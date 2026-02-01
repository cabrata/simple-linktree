export class BackToTopComponent {
  constructor() {
    this.button = null;
    this.scrollThreshold = 300;
    this.init();
  }

  init() {
    this.createButton();
    this.setupListeners();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'back-to-top';
    this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.button.setAttribute('aria-label', 'Back to top');
    this.button.setAttribute('title', 'Back to top');
    document.body.appendChild(this.button);
  }

  setupListeners() {
    // Show/hide on scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Click to scroll to top
    this.button.addEventListener('click', () => {
      this.scrollToTop();
    });
  }

  toggleVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.scrollThreshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Add click animation
    this.button.style.transform = 'scale(0.9) translateY(0)';
    setTimeout(() => {
      this.button.style.transform = '';
    }, 150);
  }
} 