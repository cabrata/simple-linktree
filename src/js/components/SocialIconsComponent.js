import { createRipple } from '../utils/animations';
import { applyThemedColors, watchThemeChanges } from '../utils/theme';

export class SocialIconsComponent {
  constructor() {
    this.icons = document.querySelectorAll('.social-icon');
    this.init();
  }

  init() {
    this.setupColors();
    this.setupRippleEffect();
    this.watchTheme();
  }

  setupColors() {
    applyThemedColors(this.icons);
  }

  setupRippleEffect() {
    this.icons.forEach(icon => {
      icon.addEventListener('mousedown', (e) => {
        createRipple(e, icon);
      });
    });
  }

  watchTheme() {
    watchThemeChanges(() => {
      this.setupColors();
    });
  }
}