export class ClickAnalyticsComponent {
  constructor() {
    this.storageKey = 'link_analytics';
    this.init();
  }

  init() {
    this.trackClicks();
    this.addAnalyticsToLinks();
  }

  getAnalytics() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  saveAnalytics(analytics) {
    localStorage.setItem(this.storageKey, JSON.stringify(analytics));
  }

  trackClicks() {
    const links = document.querySelectorAll('.link-card');
    
    links.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        const analytics = this.getAnalytics();
        const linkId = `link_${index}`;
        
        analytics[linkId] = (analytics[linkId] || 0) + 1;
        this.saveAnalytics(analytics);
        
        // Update UI
        this.updateLinkAnalytics(link, linkId);
      });
    });
  }

  addAnalyticsToLinks() {
    const links = document.querySelectorAll('.link-card');
    const analytics = this.getAnalytics();
    const maxClicks = Math.max(...Object.values(analytics), 1);
    
    links.forEach((link, index) => {
      const linkId = `link_${index}`;
      const clicks = analytics[linkId] || 0;
      const percentage = (clicks / maxClicks) * 100;
      
      // Create analytics bar
      const analyticsBar = document.createElement('div');
      analyticsBar.className = 'analytics-bar';
      analyticsBar.innerHTML = `
        <div class="analytics-fill" style="width: ${percentage}%"></div>
        <div class="analytics-count">${clicks} ${clicks === 1 ? 'click' : 'clicks'}</div>
      `;
      
      link.appendChild(analyticsBar);
    });
  }

  updateLinkAnalytics(link, linkId) {
    const analytics = this.getAnalytics();
    const clicks = analytics[linkId];
    
    const countElement = link.querySelector('.analytics-count');
    const fillElement = link.querySelector('.analytics-fill');
    
    if (countElement) {
      countElement.textContent = `${clicks} ${clicks === 1 ? 'click' : 'clicks'}`;
      
      // Animate
      countElement.style.transform = 'scale(1.2)';
      setTimeout(() => {
        countElement.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Recalculate percentages
    const maxClicks = Math.max(...Object.values(analytics), 1);
    const percentage = (clicks / maxClicks) * 100;
    
    if (fillElement) {
      fillElement.style.width = `${percentage}%`;
    }
  }
}