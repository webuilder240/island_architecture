import { setupIntersectionObserver } from './intersectionSetup.js';
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObserver('Onboarding')
  setupIntersectionObserver('Sidemenu')
});
