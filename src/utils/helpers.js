/**
 * Format date string to a more readable format
 * @param {string} dateString - Date string to format (e.g., "2025-04-15" or "Apr 15, 2025")
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
    // Check if the date is already in a readable format
    if (/[A-Za-z]+\s\d{1,2},\s\d{4}/.test(dateString)) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      
      // Default options for date formatting
      const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
      };
      
      return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
  
  /**
   * Truncate text to a specified length and add ellipsis
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text with ellipsis if needed
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    
    // Find the last space before maxLength to avoid cutting words
    const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');
    const truncated = text.substring(0, lastSpace > 0 ? lastSpace : maxLength);
    
    return `${truncated}...`;
  };
  
  /**
   * Slugify a string for use in URLs
   * @param {string} text - Text to slugify
   * @returns {string} URL-friendly slug
   */
  export const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/&/g, '-and-')      // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
      .replace(/\-\-+/g, '-');     // Replace multiple - with single -
  };
  
  /**
   * Get contrast text color (black or white) based on background color
   * @param {string} hexColor - Hex color code (with or without #)
   * @returns {string} '#000000' for dark text or '#ffffff' for light text
   */
  export const getContrastColor = (hexColor) => {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Milliseconds to wait
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Validate email address format
   * @param {string} email - Email address to validate
   * @returns {boolean} Whether the email format is valid
   */
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Generate a random ID
   * @param {number} length - Length of the ID
   * @returns {string} Random ID
   */
  export const generateId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
  };