import ReactiveInput from '../WebComponents/ReactiveInput';
import barba from '@barba/core';
document.addEventListener('DOMContentLoaded', () => {
  barba.init({})
  customElements.define('reactive-input', ReactiveInput);
});
