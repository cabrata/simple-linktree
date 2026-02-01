export class SkeletonLoadingComponent {
  constructor() {
    this.loadingDuration = 1500; // milliseconds
    this.init();
  }

  init() {
    this.createSkeletons();
    this.hideRealContent();
    
    setTimeout(() => {
      this.showRealContent();
    }, this.loadingDuration);
  }

  createSkeletons() {
    const container = document.querySelector('.container');
    
    const skeletonHTML = `
      <div class="skeleton-wrapper">
        <!-- Profile Skeleton -->
        <div class="skeleton-profile">
          <div class="skeleton-avatar"></div>
          <div class="skeleton-name"></div>
          <div class="skeleton-bio"></div>
          <div class="skeleton-bio short"></div>
          
          <!-- Social Icons Skeleton -->
          <div class="skeleton-social">
            ${Array(8).fill('<div class="skeleton-social-icon"></div>').join('')}
          </div>
        </div>

        <!-- Counter Skeleton -->
        <div class="skeleton-counter"></div>

        <!-- Links Skeleton -->
        <div class="skeleton-section">
          <div class="skeleton-section-title"></div>
          ${Array(3).fill('<div class="skeleton-link"></div>').join('')}
        </div>

        <!-- Spotify Skeleton -->
        <div class="skeleton-section">
          <div class="skeleton-section-title"></div>
          <div class="skeleton-spotify"></div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('afterbegin', skeletonHTML);
  }

  hideRealContent() {
    const elements = [
      '.profile-header',
      '.view-counter',
      '.section-divider',
      '.links-grid',
      '.spotify-section',
      '.footer'
    ];

    elements.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = 'none';
      }
    });

    // Hide all section dividers and link grids
    document.querySelectorAll('.section-divider, .links-grid, .spotify-section').forEach(el => {
      el.style.display = 'none';
    });
  }

  showRealContent() {
    const skeleton = document.querySelector('.skeleton-wrapper');
    
    if (skeleton) {
      skeleton.style.opacity = '0';
      
      setTimeout(() => {
        skeleton.remove();
        
        // Show real content with stagger
        const elements = [
          '.profile-header',
          '.view-counter',
          ...Array.from(document.querySelectorAll('.section-divider, .links-grid, .spotify-section')),
          '.footer'
        ];

        elements.forEach((selector, index) => {
          setTimeout(() => {
            const element = typeof selector === 'string' 
              ? document.querySelector(selector) 
              : selector;
              
            if (element) {
              element.style.display = '';
              element.style.opacity = '0';
              element.style.transform = 'translateY(20px)';
              
              requestAnimationFrame(() => {
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              });
            }
          }, index * 100);
        });
      }, 300);
    }
  }
} 