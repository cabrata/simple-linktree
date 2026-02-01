export class ConfettiComponent {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.confettiPieces = [];
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.createCanvas();
    this.setupTriggers();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    this.canvas.style.opacity = '0';
    this.canvas.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupTriggers() {
    // Trigger confetti on specific link clicks
    document.querySelectorAll('.link-card').forEach((card, index) => {
      card.addEventListener('click', (e) => {
        const title = card.querySelector('.link-title').textContent.toLowerCase();
        
        // Trigger confetti for special links
        if (title.includes('support') || 
            title.includes('donate') || 
            title.includes('subscribe') ||
            title.includes('portfolio') ||
            index === 0) { // First link
          
          const rect = card.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          this.celebrate(x, y);
        }
      });
    });

    // Trigger on share button click
    const shareBtn = document.querySelector('.share-button');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const rect = shareBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        this.celebrate(x, y);
      });
    }
  }

  celebrate(x, y) {
    this.canvas.style.opacity = '1';
    this.createConfetti(x, y);
    this.animate();
    
    setTimeout(() => {
      this.canvas.style.opacity = '0';
    }, 3000);
  }

  createConfetti(x, y) {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      this.confettiPieces.push({
        x: x,
        y: y,
        width: Math.random() * 8 + 4,
        height: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        velocityX: Math.random() * 6 - 3,
        velocityY: Math.random() * -8 - 2,
        gravity: 0.15,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'square' : 'circle'
      });
    }
  }

  animate() {
    if (this.confettiPieces.length === 0) {
      this.isAnimating = false;
      return;
    }

    this.isAnimating = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.confettiPieces = this.confettiPieces.filter(piece => {
      piece.velocityY += piece.gravity;
      piece.x += piece.velocityX;
      piece.y += piece.velocityY;
      piece.rotation += piece.rotationSpeed;
      piece.opacity -= 0.005;

      if (piece.opacity <= 0 || piece.y > this.canvas.height) {
        return false;
      }

      this.ctx.save();
      this.ctx.translate(piece.x, piece.y);
      this.ctx.rotate((piece.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = piece.opacity;
      this.ctx.fillStyle = piece.color;

      if (piece.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, piece.width / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
      }

      this.ctx.restore();
      return true;
    });

    requestAnimationFrame(() => this.animate());
  }

  // Public method to trigger confetti manually
  trigger(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    this.celebrate(x, y);
  }
} 