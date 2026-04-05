import { useRef, useState, useCallback, useEffect } from 'react';
import { caseStudies } from '@/models/case-study';

export function useCaseStudyCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1,
    );
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    return () => container.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState]);

  const scrollLeft = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]') as HTMLElement;
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]') as HTMLElement;
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  return { caseStudies, scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight };
}
