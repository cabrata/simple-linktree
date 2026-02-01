import { SocialIconsComponent } from './components/SocialIconsComponent';
import { LinksComponent } from './components/LinksComponent';
import { ThemeToggleComponent } from './components/ThemeToggleComponent';
import { ViewCounterComponent } from './components/ViewCounterComponent';
import { ShareButtonComponent } from './components/ShareButtonComponent';
import { ClickAnalyticsComponent } from './components/ClickAnalyticsComponent';
import { TiltEffectComponent } from './components/TiltEffectComponent';
import { TypingAnimationComponent } from './components/TypingAnimationComponent';
import { ParticlesComponent } from './components/ParticlesComponent';
import { SkeletonLoadingComponent } from './components/SkeletonLoadingComponent';
import { ScrollProgressComponent } from './components/ScrollProgressComponent';
import { BackToTopComponent } from './components/BackToTopComponent';
import { CommandPaletteComponent } from './components/CommandPaletteComponent';
import { SoundEffectsComponent } from './components/SoundEffectsComponent';
import { ConfettiComponent } from './components/ConfettiComponent';
import config from '../config/data';

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initComponents());
    } else {
      this.initComponents();
    }
  }

  initComponents() {
    // Initialize immediate effects (no DOM dependency)
    new ScrollProgressComponent();
    new BackToTopComponent();
    new ParticlesComponent();
    
    // Initialize skeleton loading
    new SkeletonLoadingComponent();
    
    // Initialize components that need DOM (after skeleton finishes)
    setTimeout(() => {
      // Check if elements exist before initializing
      const profileExists = document.querySelector('.profile-header');
      const linksExist = document.querySelectorAll('.link-card').length > 0;
      
      if (profileExists) {
        new TypingAnimationComponent(config);
       // new ViewCounterComponent();
        new ShareButtonComponent(config);
      }
      
      if (linksExist) {
        new SocialIconsComponent();
        new LinksComponent();
        new ClickAnalyticsComponent();
        new TiltEffectComponent();
      }
      
      // Always initialize these
      new ThemeToggleComponent();
      new CommandPaletteComponent(config);
      new SoundEffectsComponent();
      new ConfettiComponent();
      
      console.log('✅ All components initialized!');
    }, 1600); // Slightly after skeleton animation

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Performance optimization
    this.optimizePerformance();
  }

  optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    }

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-fast', '0.01s');
      document.documentElement.style.setProperty('--transition-base', '0.01s');
      document.documentElement.style.setProperty('--transition-slow', '0.01s');
    }
  }
}

// Initialize app
new App();