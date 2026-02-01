export class ScrollProgressComponent {
  constructor() {
    this.progressBar = null;
    this.init();
  }

  init() {
    this.createProgressBar();
    this.updateProgress();
    this.setupListeners();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'scroll-progress';
    this.progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
    document.body.appendChild(this.progressBar);
  }

  updateProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const fill = this.progressBar.querySelector('.scroll-progress-fill');
    fill.style.width = scrolled + '%';
    
    // Add glow effect when scrolling
    if (scrolled > 0) {
      fill.style.boxShadow = '0 0 10px var(--accent)';
    } else {
      fill.style.boxShadow = 'none';
    }
  }

  setupListeners() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
} 