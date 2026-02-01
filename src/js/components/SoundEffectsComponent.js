export class SoundEffectsComponent {
  constructor() {
    this.enabled = localStorage.getItem('soundEffects') !== 'false';
    this.sounds = {};
    this.init();
  }

  init() {
    this.createSounds();
    this.createToggle();
    this.setupListeners();
  }

  createSounds() {
    // Create sound effects using Web Audio API
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Preload sounds
    this.sounds = {
      click: this.createClickSound(),
      hover: this.createHoverSound(),
      success: this.createSuccessSound(),
      toggle: this.createToggleSound()
    };
  }

  createClickSound() {
    return () => {
      if (!this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    };
  }

  createHoverSound() {
    return () => {
      if (!this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.03;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    };
  }

  createSuccessSound() {
    return () => {
      if (!this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = 1000;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      oscillator.frequency.exponentialRampToValueAtTime(1500, this.audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    };
  }

  createToggleSound() {
    return () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = this.enabled ? 400 : 600;
      gainNode.gain.value = 0.08;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);
      oscillator.stop(this.audioContext.currentTime + 0.08);
    };
  }

  createToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'sound-toggle';
    toggle.innerHTML = this.enabled 
      ? '<i class="fas fa-volume-high"></i>' 
      : '<i class="fas fa-volume-xmark"></i>';
    toggle.setAttribute('aria-label', 'Toggle sound effects');
    toggle.setAttribute('title', this.enabled ? 'Sound ON' : 'Sound OFF');
    
    toggle.addEventListener('click', () => {
      this.toggle();
      toggle.innerHTML = this.enabled 
        ? '<i class="fas fa-volume-high"></i>' 
        : '<i class="fas fa-volume-xmark"></i>';
      toggle.setAttribute('title', this.enabled ? 'Sound ON' : 'Sound OFF');
    });
    
    document.body.appendChild(toggle);
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEffects', this.enabled);
    this.sounds.toggle();
  }

  setupListeners() {
    // Link cards
    document.querySelectorAll('.link-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.sounds.hover();
      });
      
      card.addEventListener('click', () => {
        this.sounds.click();
      });
    });

    // Social icons
    document.querySelectorAll('.social-icon').forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        this.sounds.hover();
      });
      
      icon.addEventListener('click', () => {
        this.sounds.click();
      });
    });

    // Theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.sounds.click();
      });
    });

    // Share button
    const shareBtn = document.querySelector('.share-button');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.sounds.click();
      });
    }

    // Copy success
    document.addEventListener('clipboardCopy', () => {
      this.sounds.success();
    });

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        this.sounds.click();
      });
    }
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }
} 