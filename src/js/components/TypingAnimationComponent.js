export class TypingAnimationComponent {
  constructor(config) {
    this.texts = [
      config.profile.bio,
      "Full Stack Developer 💻",
      "Content Creator 🎥",
      "Open Source Enthusiast 🚀"
    ];
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    this.deletingSpeed = 50;
    this.delayBetweenTexts = 2000;
    this.init();
  }

  init() {
    const bioElement = document.querySelector('.bio');
    if (bioElement) {
      bioElement.innerHTML = '<span class="typing-text"></span><span class="typing-cursor">|</span>';
      this.textElement = bioElement.querySelector('.typing-text');
      this.type();
    }
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.textElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.textElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      delay = this.delayBetweenTexts;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      delay = 500;
    }

    setTimeout(() => this.type(), delay);
  }
}