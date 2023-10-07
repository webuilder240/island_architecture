import { BaseValidatedInput } from "./BaseValidatorInput";

export class ValidatedTextarea extends BaseValidatedInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('textarea').addEventListener('input', () => this.validate());
  }

  render() {
    this.shadowRoot.innerHTML = `
                <style>
                    .error {
                        color: red;
                    }
                </style>
                <div>
                    <label for="textarea">${this.getAttribute('label')}:</label>
                    <textarea id="textarea"></textarea>
                    <span class="error"></span>
                </div>
            `;
  }

  validate() {
    this.error = ''; // No specific validation for the textarea in this example
  }
}
