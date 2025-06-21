import { useEffect } from 'react';

const useScrollReveal = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { threshold = 0.1, root = null, rootMargin = '0px', direction = 'up', duration = 600 } = options;

    const initialStyle = {
      opacity: 0,
      transform:
        direction === 'up'
          ? 'translateY(20px)'
          : direction === 'down'
          ? 'translateY(-20px)'
          : direction === 'left'
          ? 'translateX(20px)'
          : 'translateX(-20px)',
      transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
    };

    Object.assign(element.style, initialStyle);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.style.opacity = 1;
        element.style.transform = 'translate(0, 0)';
        observer.unobserve(element);
      }
    }, { threshold, root, rootMargin });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, options]);
};

export default useScrollReveal;