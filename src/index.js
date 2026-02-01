// Main entry point for Webpack
import './styles/main.css';
import './js/index.js';

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept();
}