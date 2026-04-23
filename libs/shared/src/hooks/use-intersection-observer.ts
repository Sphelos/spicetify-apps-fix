import { useEffect, useState, type RefObject } from 'react';

export function useIntersectionObserver(
    elementRef: RefObject<HTMLElement>,
): boolean {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        if (elementRef.current === null) {
            return;
        }

        const options = {
            rootMargin: '0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            setVisible(entries.some((e) => e.isIntersecting));
        }, options);

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        };
    }, [elementRef]);

    return visible;
}
