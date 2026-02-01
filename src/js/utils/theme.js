export const isDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const getThemedColor = (element) => {
  const darkColor = element.dataset.colorDark;
  const lightColor = element.dataset.color;
  
  return isDarkMode() && darkColor ? darkColor : lightColor;
};

export const applyThemedColors = (elements) => {
  elements.forEach(element => {
    const color = getThemedColor(element);
    const icon = element.querySelector('i');
    if (icon && color) {
      icon.style.color = color;
    }
  });
};

export const watchThemeChanges = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', (e) => {
    callback(e.matches);
  });
};