import barba from '@barba/core';
import { setupIntersectionObserver } from './intersectionSetup.js';

let onboardingObserver;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  setupIntersectionObserver('Sidemenu')

  barba.init({})

  barba.hooks.afterEnter(() => {
    onboardingObserver = setupIntersectionObserver('Onboarding');
  })

  barba.hooks.beforeLeave(() => {
    disconnectedIntersectionObserver(onboardingObserver);
  })
});
