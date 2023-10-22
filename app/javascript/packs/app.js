import ReactiveInput from '../WebComponents/ReactiveInput';
import { ValidatedFormContainer } from '../WebComponents/Forms/base';
import { FormContainer } from '../WebComponents/NewForms/FormContainer';
document.addEventListener('DOMContentLoaded', () => {
  customElements.define('form-container', FormContainer);
  require("../WebComponents/Forms/base")
});
