import { BaseValidatedInput } from "./BaseValidatorInput";

export class ValidatedInput extends BaseValidatedInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();

    if (this.getAttribute('data-maxLength')) {
      this.maxLength = parseInt(this.getAttribute('data-maxlength'))
    }
    this.error = null
    this.required = Boolean(this.getAttribute('data-required')) || false
  }

  connectedCallback() {
    this.shadowRoot.querySelector('input').addEventListener('input', () => this.validate());
  }

  render() {
    this.shadowRoot.innerHTML = `
                <style>
                    .error {
                        color: red;
                    }
                </style>
                <div>
                    <label for="input">${this.getAttribute('label')}:</label>
                    <input type="text" id="input" maxlength="${this.getAttribute('data-maxlength')}">
                    <span class="error"></span>
                </div>
            `;
  }

  validate() {
    if (this.required) {
      if (this.value === null || this.value === '' || this.value === undefined) {
        this.error = '入力してください。';
      } else {
        this.error = '';
      }
    }
    // if (this.value.length > this.maxLength) {
    //   this.error = '入力が長すぎます。';
    // } else {
    //   this.error = '';
    // }
  }
}
