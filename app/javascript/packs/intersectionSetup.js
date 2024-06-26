import { onboardingObserverCallback } from './observerCallback.js';

export function setupIntersectionObserver(componentName) {
  const target = document.querySelector(`#${componentName}-container`);

  if (target) {
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(
      (entries, observer) => onboardingObserverCallback(componentName, entries, observer),
      observerOptions
    );

    observer.observe(target);
    
    return observer
  }
}
export function disconnectedIntersectionObserver(observer) {
  observer.disconnect();
}
