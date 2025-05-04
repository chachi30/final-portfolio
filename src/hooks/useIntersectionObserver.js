import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element is visible in the viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Percentage of element that must be visible (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, isVisible, entry] - Ref to attach to the element, visibility state, and the IntersectionObserverEntry
 */
const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Update entry and visibility state
        setEntry(entry);
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // If triggerOnce is true, disconnect observer after element becomes visible
          if (triggerOnce && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    // Observe element if it exists
    const currentElement = elementRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isVisible, entry];
};

export default useIntersectionObserver;