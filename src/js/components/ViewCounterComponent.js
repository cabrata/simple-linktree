export class ViewCounterComponent {
  constructor() {
    this.storageKey = 'profile_views';
    this.sessionKey = 'current_session';
    this.init();
  }

  init() {
    this.incrementViews();
    this.createCounter();
    this.animateCounters();
  }

  incrementViews() {
    const currentSession = sessionStorage.getItem(this.sessionKey);
    
    if (!currentSession) {
      let views = parseInt(localStorage.getItem(this.storageKey) || '0');
      views++;
      localStorage.setItem(this.storageKey, views.toString());
      sessionStorage.setItem(this.sessionKey, 'active');
    }
  }

  getViews() {
    return parseInt(localStorage.getItem(this.storageKey) || '0');
  }

  getTotalLinks() {
    // Count total links from DOM
    return document.querySelectorAll('.link-card').length;
  }

  getTotalClicks() {
    // Get total clicks from analytics
    const analytics = localStorage.getItem('link_analytics');
    if (!analytics) return 0;
    
    const data = JSON.parse(analytics);
    return Object.values(data).reduce((sum, clicks) => sum + clicks, 0);
  }

  createCounter() {
    const counter = document.createElement('div');
    counter.className = 'stats-counter';
    counter.innerHTML = `
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number" data-target="${this.getViews()}" data-suffix="+">0</div>
          <div class="stat-label">Profile Views</div>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <div class="stat-number" data-target="${this.getTotalClicks()}" data-suffix="+">0</div>
          <div class="stat-label">Total Clicks</div>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-item">
          <div class="stat-number" data-target="${this.getTotalLinks()}" data-suffix="+">0</div>
          <div class="stat-label">Active Links</div>
        </div>
      </div>
      
      <div class="stats-decoration">
        <div class="stats-dot"></div>
        <div class="stats-dot"></div>
        <div class="stats-dot"></div>
      </div>
    `;
    
    const profileHeader = document.querySelector('.profile-header');
    profileHeader.insertAdjacentElement('afterend', counter);
  }

  animateCounters() {
    const counterNumbers = document.querySelectorAll('.stat-number');
    
    counterNumbers.forEach((counter, index) => {
      const target = parseInt(counter.dataset.target);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      // Stagger animation start
      setTimeout(() => {
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + suffix;
            counter.classList.add('completed');
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + suffix;
          }
        }, 16);
      }, index * 200);
    });
  }
}