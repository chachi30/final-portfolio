import { useEffect, useRef, useState } from 'react';

const AnimatedElement = ({
  children,
  animation = 'fade-in',
  threshold = 0.2,
  delay = 0,
  duration = 600,
  className = '',
  rootMargin = '0px',
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    // Create and configure IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Style to be applied to the element
  const style = {
    opacity: !isVisible ? 0 : 1,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`,
  };

  // Determine transform style based on animation type
  if (!isVisible) {
    switch (animation) {
      case 'slide-up':
        style.transform = 'translateY(30px)';
        break;
      case 'slide-down':
        style.transform = 'translateY(-30px)';
        break;
      case 'slide-left':
        style.transform = 'translateX(30px)';
        break;
      case 'slide-right':
        style.transform = 'translateX(-30px)';
        break;
      case 'scale-up':
        style.transform = 'scale(0.95)';
        break;
      case 'scale-down':
        style.transform = 'scale(1.05)';
        break;
      default:
        break;
    }
  } else {
    style.transform = 'translate(0) scale(1)';
  }

  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default AnimatedElement;