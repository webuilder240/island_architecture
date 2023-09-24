// import { initializeEvents } from './observerHandler.js';
// import { onboardingObserverCallback } from './vueAppHandler.js';
import { setupIntersectionObserver } from './intersectionSetup.js';
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObserver('Onboarding')
});
