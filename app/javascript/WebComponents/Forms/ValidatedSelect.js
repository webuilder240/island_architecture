import { BaseValidatedInput } from './BaseValidatorInput';

export class ValidatedSelect extends BaseValidatedInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('select').addEventListener('change', () => this.validate());
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .error {
                    color: red;
                }
            </style>
            <div>
                <label for="select">${this.getAttribute('label')}:</label>
                <select id="select">
                    <slot></slot>
                </select>
                <span class="error"></span>
            </div>
        `;
  }

  validate() {
    if (!this.value || this.value === 'default') {
      this.error = '選択してください。';
    } else {
      this.error = '';
    }
  }
}
