// reveal.ts
// Fades [data-reveal] elements up as they scroll into view. Progressive
// enhancement, built to leave PageSpeed alone:
// - Without this script (or with reduced motion on), nothing is hidden.
// - Anything already on screen at load is skipped, never hidden — so the
//   LCP image can't be delayed and there's no flash of missing content.
// - Elements entering together cascade with a short stagger.
// Styles (.reveal-pending / .reveal-in) live in src/styles/global.css.

const STAGGER_MS = 90;

const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (elements.length > 0 && 'IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.style.setProperty('--reveal-delay', `${order++ * STAGGER_MS}ms`);
        el.classList.replace('reveal-pending', 'reveal-in');
        el.addEventListener(
          'animationend',
          () => {
            el.classList.remove('reveal-in');
            el.style.removeProperty('--reveal-delay');
          },
          { once: true },
        );
      }
    },
    // Trigger a little after the element's top edge enters the viewport.
    { rootMargin: '0px 0px -8% 0px' },
  );

  for (const el of elements) {
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    el.classList.add('reveal-pending');
    observer.observe(el);
  }
}
