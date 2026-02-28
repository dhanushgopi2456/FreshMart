import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-reveal animations using Intersection Observer.
 * Returns a ref to attach to the element you want to reveal.
 * When the element enters the viewport, it gets the 'active' class added.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.15
 * @param {string} options.rootMargin - Root margin, default '0px 0px -60px 0px'
 * @param {boolean} options.once - Only animate once (default true)
 */
const useScrollReveal = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (options.once !== false) {
                        observer.unobserve(entry.target);
                    }
                } else if (options.once === false) {
                    entry.target.classList.remove('active');
                }
            },
            {
                threshold: options.threshold || 0.15,
                rootMargin: options.rootMargin || '0px 0px -60px 0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin, options.once]);

    return ref;
};

export default useScrollReveal;
