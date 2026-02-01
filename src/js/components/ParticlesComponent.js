export class ParticlesComponent {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.particleCount = 50;
    this.mouse = { x: null, y: null, radius: 150 };
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();
    this.setupMouseTracking();
    this.handleResize();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particles-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
    
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  drawParticles() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                   (document.documentElement.getAttribute('data-theme') !== 'light' &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    this.particles.forEach(particle => {
      this.ctx.fillStyle = isDark 
        ? `rgba(59, 130, 246, ${particle.opacity})` 
        : `rgba(0, 102, 255, ${particle.opacity})`;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  connectParticles() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                   (document.documentElement.getAttribute('data-theme') !== 'light' &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (1 - distance / 120) * 0.2;
          this.ctx.strokeStyle = isDark
            ? `rgba(59, 130, 246, ${opacity})`
            : `rgba(0, 102, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }
      }

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawParticles();
    this.connectParticles();
    this.updateParticles();

    requestAnimationFrame(() => this.animate());
  }

  setupMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
    });
  }
}