export class CommandPaletteComponent {
  constructor(config) {
    this.config = config;
    this.isOpen = false;
    this.selectedIndex = 0;
    this.links = [];
    this.filteredLinks = [];
    this.init();
  }

  init() {
    this.collectLinks();
    this.createPalette();
    this.setupListeners();
  }

  collectLinks() {
    // Collect all links from config
    this.config.linkSections.forEach(section => {
      section.links.forEach(link => {
        this.links.push({
          title: link.title,
          subtitle: link.subtitle,
          url: link.url,
          icon: link.icon,
          color: link.color,
          section: section.title
        });
      });
    });

    // Add social media links
    this.config.socialMedia.forEach(social => {
      this.links.push({
        title: social.name,
        subtitle: 'Social Media',
        url: social.url,
        icon: social.icon,
        color: social.color,
        section: 'Social Media'
      });
    });

    this.filteredLinks = [...this.links];
  }

  createPalette() {
    const palette = document.createElement('div');
    palette.className = 'command-palette';
    palette.innerHTML = `
      <div class="command-palette-backdrop"></div>
      <div class="command-palette-modal">
        <div class="command-palette-search">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search links... (Ctrl+K or ⌘K)"
            class="command-palette-input"
            autocomplete="off"
          >
          <kbd class="command-palette-hint">ESC</kbd>
        </div>
        <div class="command-palette-results"></div>
        <div class="command-palette-footer">
          <div class="command-palette-footer-item">
            <kbd>↑</kbd><kbd>↓</kbd> Navigate
          </div>
          <div class="command-palette-footer-item">
            <kbd>↵</kbd> Select
          </div>
          <div class="command-palette-footer-item">
            <kbd>ESC</kbd> Close
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(palette);
    
    this.paletteElement = palette;
    this.input = palette.querySelector('.command-palette-input');
    this.resultsContainer = palette.querySelector('.command-palette-results');
    this.backdrop = palette.querySelector('.command-palette-backdrop');
  }

  setupListeners() {
    // Keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }
      
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on backdrop click
    this.backdrop.addEventListener('click', () => {
      this.close();
    });

    // Search input
    this.input.addEventListener('input', (e) => {
      this.search(e.target.value);
    });

    // Keyboard navigation
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectPrevious();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.selectCurrent();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.paletteElement.classList.add('active');
    this.input.value = '';
    this.search('');
    
    // Focus input after animation
    setTimeout(() => {
      this.input.focus();
    }, 100);
    
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.paletteElement.classList.remove('active');
    this.selectedIndex = 0;
    document.body.style.overflow = '';
  }

  search(query) {
    const lowerQuery = query.toLowerCase();
    
    if (!query) {
      this.filteredLinks = [...this.links];
    } else {
      this.filteredLinks = this.links.filter(link => {
        return link.title.toLowerCase().includes(lowerQuery) ||
               link.subtitle.toLowerCase().includes(lowerQuery) ||
               link.section.toLowerCase().includes(lowerQuery);
      });
    }
    
    this.selectedIndex = 0;
    this.renderResults();
  }

  renderResults() {
    if (this.filteredLinks.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="command-palette-empty">
          <i class="fas fa-search"></i>
          <p>No links found</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = this.filteredLinks.map((link, index) => `
      <div class="command-palette-item ${index === this.selectedIndex ? 'selected' : ''}" data-index="${index}">
        <i class="${link.icon}" style="color: ${link.color}"></i>
        <div class="command-palette-item-content">
          <div class="command-palette-item-title">${this.highlightMatch(link.title)}</div>
          <div class="command-palette-item-subtitle">${link.section} • ${link.subtitle}</div>
        </div>
        <i class="fas fa-arrow-right command-palette-item-arrow"></i>
      </div>
    `).join('');

    // Add click listeners
    this.resultsContainer.querySelectorAll('.command-palette-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.selectedIndex = index;
        this.selectCurrent();
      });

      item.addEventListener('mouseenter', () => {
        this.selectedIndex = index;
        this.updateSelection();
      });
    });
  }

  highlightMatch(text) {
    const query = this.input.value.toLowerCase();
    if (!query) return text;
    
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text;
    
    return text.substring(0, index) + 
           '<mark>' + text.substring(index, index + query.length) + '</mark>' + 
           text.substring(index + query.length);
  }

  selectNext() {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredLinks.length - 1);
    this.updateSelection();
  }

  selectPrevious() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    this.updateSelection();
  }

  updateSelection() {
    const items = this.resultsContainer.querySelectorAll('.command-palette-item');
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  selectCurrent() {
    if (this.filteredLinks[this.selectedIndex]) {
      const link = this.filteredLinks[this.selectedIndex];
      window.open(link.url, '_blank');
      this.close();
    }
  }
} 