export const staggerAnimation = (elements, delay = 50) => {
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay * index);
  });
};

export const createRipple = (event, element) => {
  const ripple = element.querySelector('.ripple');
  if (!ripple) return;

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.opacity = '0.4';
  ripple.style.transform = 'scale(0)';
  
  ripple.style.animation = 'none';
  setTimeout(() => {
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
  }, 10);
};

export const observeIntersection = (elements, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}; 