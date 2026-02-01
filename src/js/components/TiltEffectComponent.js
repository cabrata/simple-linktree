export class TiltEffectComponent {
  constructor() {
    this.cards = document.querySelectorAll('.link-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      this.addTiltEffect(card);
    });
  }

  addTiltEffect(card) {
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
        translateY(-6px)
      `;
      
      // Add shine effect
      this.updateShine(card, x, y, rect.width, rect.height);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateY(0)';
      this.removeShine(card);
    });
  }

  updateShine(card, x, y, width, height) {
    let shine = card.querySelector('.tilt-shine');
    
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
    }
    
    const percentX = (x / width) * 100;
    const percentY = (y / height) * 100;
    
    shine.style.background = `
      radial-gradient(
        circle at ${percentX}% ${percentY}%,
        rgba(255, 255, 255, 0.2) 0%,
        transparent 60%
      )
    `;
    shine.style.opacity = '1';
  }

  removeShine(card) {
    const shine = card.querySelector('.tilt-shine');
    if (shine) {
      shine.style.opacity = '0';
    }
  }
}