// ============================================================================
// Enhanced Script with Improved Error Handling, Utilities, and Performance
// ============================================================================

/**
 * Utility Functions
 */
const Utils = {
  /**
   * Safe DOM element selector with null checking
   * @param {string} selector - CSS selector
   * @returns {Element|null} - DOM element or null
   */
  querySelector(selector) {
    if (!selector || typeof selector !== 'string') {
      console.warn('Invalid selector provided:', selector);
      return null;
    }
    try {
      return document.querySelector(selector);
    } catch (error) {
      console.error('querySelector error for selector:', selector, error);
      return null;
    }
  },

  /**
   * Safe multiple elements selector
   * @param {string} selector - CSS selector
   * @returns {NodeList|[]} - DOM elements or empty array
   */
  querySelectorAll(selector) {
    if (!selector || typeof selector !== 'string') {
      console.warn('Invalid selector provided:', selector);
      return [];
    }
    try {
      return document.querySelectorAll(selector) || [];
    } catch (error) {
      console.error('querySelectorAll error for selector:', selector, error);
      return [];
    }
  },

  /**
   * Check if element exists in DOM
   * @param {Element|null} element - DOM element to check
   * @returns {boolean} - True if element exists
   */
  elementExists(element) {
    return element !== null && element !== undefined && element instanceof Element;
  },

  /**
   * Add class to element with validation
   * @param {Element|null} element - DOM element
   * @param {string} className - Class name to add
   */
  addClass(element, className) {
    if (this.elementExists(element) && className && typeof className === 'string') {
      element.classList.add(className);
    }
  },

  /**
   * Remove class from element with validation
   * @param {Element|null} element - DOM element
   * @param {string} className - Class name to remove
   */
  removeClass(element, className) {
    if (this.elementExists(element) && className && typeof className === 'string') {
      element.classList.remove(className);
    }
  },

  /**
   * Toggle class on element
   * @param {Element|null} element - DOM element
   * @param {string} className - Class name to toggle
   */
  toggleClass(element, className) {
    if (this.elementExists(element) && className && typeof className === 'string') {
      element.classList.toggle(className);
    }
  },

  /**
   * Safely set event listener
   * @param {Element|null} element - DOM element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler callback
   */
  addEventListener(element, event, handler) {
    if (this.elementExists(element) && event && typeof handler === 'function') {
      try {
        element.addEventListener(event, handler);
      } catch (error) {
        console.error(`Error adding event listener for ${event}:`, error);
      }
    }
  },

  /**
   * Safely remove event listener
   * @param {Element|null} element - DOM element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler callback
   */
  removeEventListener(element, event, handler) {
    if (this.elementExists(element) && event && typeof handler === 'function') {
      try {
        element.removeEventListener(event, handler);
      } catch (error) {
        console.error(`Error removing event listener for ${event}:`, error);
      }
    }
  },

  /**
   * Get attribute value with fallback
   * @param {Element|null} element - DOM element
   * @param {string} attr - Attribute name
   * @param {*} fallback - Fallback value
   * @returns {*} - Attribute value or fallback
   */
  getAttribute(element, attr, fallback = null) {
    if (this.elementExists(element) && attr && typeof attr === 'string') {
      return element.getAttribute(attr) || fallback;
    }
    return fallback;
  },

  /**
   * Set attribute value safely
   * @param {Element|null} element - DOM element
   * @param {string} attr - Attribute name
   * @param {*} value - Attribute value
   */
  setAttribute(element, attr, value) {
    if (this.elementExists(element) && attr && typeof attr === 'string') {
      try {
        element.setAttribute(attr, value);
      } catch (error) {
        console.error(`Error setting attribute ${attr}:`, error);
      }
    }
  },

  /**
   * Debounce function to improve performance
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} - Debounced function
   */
  debounce(func, delay = 300) {
    if (typeof func !== 'function') {
      console.warn('debounce requires a function');
      return () => {};
    }
    let timeoutId;
    return function debounced(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  /**
   * Throttle function for performance optimization
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  throttle(func, limit = 300) {
    if (typeof func !== 'function') {
      console.warn('throttle requires a function');
      return () => {};
    }
    let inThrottle;
    return function throttled(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Check if device is mobile
   * @returns {boolean} - True if mobile device
   */
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  /**
   * Safely parse JSON
   * @param {string} jsonString - JSON string to parse
   * @param {*} fallback - Fallback value if parsing fails
   * @returns {*} - Parsed object or fallback
   */
  parseJSON(jsonString, fallback = null) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('JSON parsing error:', error);
      return fallback;
    }
  },

  /**
   * Format console logs with timestamp
   * @param {string} level - Log level (log, warn, error)
   * @param {*} message - Message to log
   */
  logWithTimestamp(level = 'log', message) {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] ${message}`);
  },
};

/**
 * Application Manager
 */
const App = {
  initialized: false,

  /**
   * Initialize application
   */
  init() {
    if (this.initialized) {
      console.warn('App already initialized');
      return;
    }

    try {
      this.setupEventListeners();
      this.setupResizeHandler();
      this.initialized = true;
      Utils.logWithTimestamp('log', 'App initialized successfully');
    } catch (error) {
      Utils.logWithTimestamp('error', `App initialization failed: ${error.message}`);
    }
  },

  /**
   * Setup main event listeners
   */
  setupEventListeners() {
    // Add your main event listeners here
    const menuButton = Utils.querySelector('[data-menu-toggle]');
    if (menuButton) {
      Utils.addEventListener(menuButton, 'click', (e) => this.handleMenuToggle(e));
    }

    // Setup navigation links
    this.setupNavigation();

    // Setup form handlers if forms exist
    this.setupForms();
  },

  /**
   * Setup navigation event listeners
   */
  setupNavigation() {
    const navLinks = Utils.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      Utils.addEventListener(link, 'click', (e) => this.handleNavClick(e));
    });
  },

  /**
   * Setup form event listeners and validation
   */
  setupForms() {
    const forms = Utils.querySelectorAll('form');
    forms.forEach((form) => {
      Utils.addEventListener(form, 'submit', (e) => this.handleFormSubmit(e));
    });
  },

  /**
   * Setup resize handler with throttling
   */
  setupResizeHandler() {
    const resizeHandler = Utils.throttle(() => {
      this.handleWindowResize();
    }, 300);

    Utils.addEventListener(window, 'resize', resizeHandler);
  },

  /**
   * Handle menu toggle
   * @param {Event} event - Click event
   */
  handleMenuToggle(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      const menu = Utils.querySelector('[data-menu]');
      if (menu) {
        Utils.toggleClass(menu, 'active');
      }
    } catch (error) {
      Utils.logWithTimestamp('error', `Menu toggle error: ${error.message}`);
    }
  },

  /**
   * Handle navigation link clicks
   * @param {Event} event - Click event
   */
  handleNavClick(event) {
    try {
      const href = Utils.getAttribute(event.target, 'href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const target = Utils.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          this.closeMenu();
        }
      }
    } catch (error) {
      Utils.logWithTimestamp('error', `Navigation click error: ${error.message}`);
    }
  },

  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  handleFormSubmit(event) {
    try {
      event.preventDefault();
      const form = event.target;

      // Validate form
      if (!this.validateForm(form)) {
        console.warn('Form validation failed');
        return;
      }

      // Process form data
      const formData = new FormData(form);
      console.log('Form data collected');

      // Add your form submission logic here
      // Example: send to server
      // this.submitFormData(formData);
    } catch (error) {
      Utils.logWithTimestamp('error', `Form submission error: ${error.message}`);
    }
  },

  /**
   * Validate form inputs
   * @param {Element} form - Form element
   * @returns {boolean} - Form validity
   */
  validateForm(form) {
    if (!Utils.elementExists(form)) {
      return false;
    }

    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  },

  /**
   * Validate individual input
   * @param {Element} input - Input element
   * @returns {boolean} - Input validity
   */
  validateInput(input) {
    if (!Utils.elementExists(input)) {
      return false;
    }

    const value = input.value?.trim() || '';
    const type = input.type || '';
    const required = input.required || false;

    // Check required field
    if (required && !value) {
      Utils.addClass(input, 'error');
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        Utils.addClass(input, 'error');
        return false;
      }
    }

    Utils.removeClass(input, 'error');
    return true;
  },

  /**
   * Close menu
   */
  closeMenu() {
    const menu = Utils.querySelector('[data-menu]');
    if (menu) {
      Utils.removeClass(menu, 'active');
    }
  },

  /**
   * Handle window resize
   */
  handleWindowResize() {
    // Add your resize logic here
    console.log('Window resized');
  },

  /**
   * Cleanup and destroy app
   */
  destroy() {
    try {
      // Add cleanup logic
      this.initialized = false;
      Utils.logWithTimestamp('log', 'App destroyed');
    } catch (error) {
      Utils.logWithTimestamp('error', `App destruction error: ${error.message}`);
    }
  },
};

/**
 * Initialize app when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

/**
 * Cleanup on page unload
 */
Utils.addEventListener(window, 'beforeunload', () => App.destroy());

// ============================================================================
// Export for use in other modules (if using modules)
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils, App };
}
