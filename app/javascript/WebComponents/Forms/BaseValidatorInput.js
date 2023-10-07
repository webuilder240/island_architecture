export class BaseValidatedInput extends HTMLElement {
  set errors(messages) {
    const message = messages.join(', ');
    this.shadowRoot.querySelector('.error').textContent = message
    this.setAttribute('data-valid', messages.legth === 0);
  }

  get value() {
    const el = this.shadowRoot.querySelector('input') || this.shadowRoot.querySelector('textarea');
    if (el) {
      return el.value;
    }
  }

  validate() {
    // To be implemented by subclasses
  }
}
