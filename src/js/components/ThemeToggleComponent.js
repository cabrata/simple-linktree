export class ThemeToggleComponent {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'auto';
    this.init();
  }

  init() {
    this.createToggle();
    this.applyTheme();
    this.setupListeners();
  }

  createToggle() {
    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = `
      <button class="theme-btn" data-theme="light" title="Light Mode">
        <i class="fas fa-sun"></i>
      </button>
      <button class="theme-btn" data-theme="auto" title="Auto Mode">
        <i class="fas fa-circle-half-stroke"></i>
      </button>
      <button class="theme-btn" data-theme="dark" title="Dark Mode">
        <i class="fas fa-moon"></i>
      </button>
      <div class="theme-indicator"></div>
    `;
    document.body.appendChild(toggle);
  }

  applyTheme() {
    const buttons = document.querySelectorAll('.theme-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.querySelector(`[data-theme="${this.theme}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      this.moveIndicator(activeBtn);
    }

    if (this.theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }

  moveIndicator(button) {
    const indicator = document.querySelector('.theme-indicator');
    const rect = button.getBoundingClientRect();
    const parent = button.parentElement.getBoundingClientRect();
    
    indicator.style.left = `${rect.left - parent.left}px`;
    indicator.style.width = `${rect.width}px`;
  }

  setupListeners() {
    const buttons = document.querySelectorAll('.theme-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.theme = btn.dataset.theme;
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Trigger animation
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
          btn.style.transform = 'scale(1)';
        }, 100);
      });
    });
  }
}