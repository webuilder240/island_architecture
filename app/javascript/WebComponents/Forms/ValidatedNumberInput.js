import { BaseValidatedInput } from "./BaseValidatorInput";

export class ValidatedNumberInput extends BaseValidatedInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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
                    <input type="number" id="input" min="${this.getAttribute('min')}" max="${this.getAttribute('max')}">
                    <span class="error"></span>
                </div>
            `;
  }

  validate() {
    const value = parseInt(this.value, 10);
    if (isNaN(value) || value < parseInt(this.getAttribute('min')) || value > parseInt(this.getAttribute('max'))) {
      this.error = '入力が正しくありません。';
    } else {
      this.error = '';
    }
  }
}
