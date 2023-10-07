import ReactiveInput from '../WebComponents/ReactiveInput';
import { ValidatedFormContainer } from '../WebComponents/Forms/base';
import barba from '@barba/core';
document.addEventListener('DOMContentLoaded', () => {
  // customElements.define('validator-form-container', ValidatedFormContainer);
  require("../WebComponents/Forms/base")

  barba.init({})
});
