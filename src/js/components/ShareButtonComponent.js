export class ShareButtonComponent {
  constructor(config) {
    this.config = config;
    this.profileUrl = window.location.href;
    this.init();
  }

  init() {
    this.createShareButton();
    this.createModal();
    this.setupListeners();
  }

  createShareButton() {
    const button = document.createElement('button');
    button.className = 'share-button';
    button.innerHTML = `
      <i class="fas fa-share-nodes"></i>
      <span>Share Profile</span>
    `;
    
    const profileHeader = document.querySelector('.profile-header');
    profileHeader.appendChild(button);
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-content">
        <button class="share-close">
          <i class="fas fa-times"></i>
        </button>
        
        <h3 class="share-title">Share Profile</h3>
        
        <div class="qr-code-container">
          <div class="qr-code" id="qrcode"></div>
          <p class="qr-label">Scan QR Code</p>
        </div>
        
        <div class="share-options">
          <button class="share-option" data-action="copy">
            <i class="fas fa-copy"></i>
            <span>Copy Link</span>
          </button>
          
          <a class="share-option" data-action="whatsapp" target="_blank">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
          
          <a class="share-option" data-action="twitter" target="_blank">
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
          </a>
          
          <a class="share-option" data-action="telegram" target="_blank">
            <i class="fab fa-telegram"></i>
            <span>Telegram</span>
          </a>
        </div>
        
        <div class="share-link">
          <input type="text" readonly value="${this.profileUrl}" class="share-input">
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Generate QR Code
    this.generateQRCode();
  }

  generateQRCode() {
    // Simple QR code using Google Charts API
    const qrContainer = document.getElementById('qrcode');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this.profileUrl)}`;
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
  }

  setupListeners() {
    const shareBtn = document.querySelector('.share-button');
    const modal = document.querySelector('.share-modal');
    const closeBtn = document.querySelector('.share-close');
    const copyBtn = document.querySelector('[data-action="copy"]');
    const input = document.querySelector('.share-input');

    shareBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.profileUrl);
        this.showToast('Link copied to clipboard!');
        
        // Dispatch event for sound effect
        document.dispatchEvent(new CustomEvent('clipboardCopy'));
        
        copyBtn.innerHTML = `
          <i class="fas fa-check"></i>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <i class="fas fa-copy"></i>
            <span>Copy Link</span>
          `;
        }, 2000);
      } catch (err) {
        input.select();
        document.execCommand('copy');
        this.showToast('Link copied!');
        document.dispatchEvent(new CustomEvent('clipboardCopy'));
      }
    });

    // Social share links
    const whatsappBtn = document.querySelector('[data-action="whatsapp"]');
    const twitterBtn = document.querySelector('[data-action="twitter"]');
    const telegramBtn = document.querySelector('[data-action="telegram"]');

    const text = `Check out ${this.config.profile.name}'s profile!`;
    
    whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(text + ' ' + this.profileUrl)}`;
    twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.profileUrl)}`;
    telegramBtn.href = `https://t.me/share/url?url=${encodeURIComponent(this.profileUrl)}&text=${encodeURIComponent(text)}`;
  }

  closeModal() {
    const modal = document.querySelector('.share-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
}