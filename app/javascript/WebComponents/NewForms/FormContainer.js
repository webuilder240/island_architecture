// const inputs = new WeakMap();
import { maxLength, minValidate, maxValidate, required } from './Validates.js'
import { errorTexts } from './errorTexts.js'

const inputs = new WeakMap();
const validates = new WeakMap();
const errors = new WeakMap();
const fields = new WeakMap();

export class FormContainer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(el => {
      this.settingVariables(el)
      el.addEventListener('input', (e) => this.updateInputState(e));
      el.addEventListener("blur", (e) => this.updateInputState(e))
    });

    this.querySelectorAll('select').forEach(el => {
      this.settingVariables(el)
      el.addEventListener('change', (e) => this.updateInputState(e));
    })
  }

  disconnectedCallback() {
    this.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(el => {
      el.removeEventListener('input', () => this.updateInputState());
    });

    this.querySelectorAll('select').forEach(el => {
      el.removeEventListener('change', () => this.updateInputState());
    })
  }
  settingVariables(el) {
    this.setFields(el)
    this.setErrors(el)
    this.setValidates(el)
  }
  setFields(el) {
    const name = el.getAttribute('name');
    const field = el.getAttribute('data-field');
    let elementFields = fields.get(this);
    if (!elementFields) {
      elementFields = {};
      fields.set(this, elementFields);
    }
    elementFields[name] = (field || name);
  }
  setErrors(el) {
    const name = el.getAttribute('name');
    let elementErrors = errors.get(this);
    if (!elementErrors) {
      elementErrors = {};
      errors.set(this, elementErrors);
    }
    elementErrors[name] = []
  }
  setValidates(el) {
    const name = el.getAttribute('name');
    let elementValidates = validates.get(this);
    if (!elementValidates) {
      elementValidates = {};
      validates.set(this, elementValidates);
    }
    elementValidates[name] = [];

    if (el.getAttribute('data-maxLength')) {
      const dataMaxLength = parseInt(el.getAttribute('data-maxlength'))
      elementValidates[name].push({func: maxLength, params: [dataMaxLength]})
    }

    if (el.getAttribute("required")) {
      elementValidates[name].push({func: required, params: []})
    }

    if (el.getAttribute('min')) {
      const min = parseInt(el.getAttribute('min'))
      elementValidates[name].push({func: minValidate, params: [min]})
    }

    if (el.getAttribute('max')) {
      const max = parseInt(el.getAttribute('max'))
      elementValidates[name].push({func: maxValidate, params: [max]})
    }
  }
  updateInputState(e) {
    const el = e.target;
    const name = el.getAttribute('name');
    let elementInputs = inputs.get(this);
    if (!elementInputs) {
      elementInputs = {};
      inputs.set(this, elementInputs);
    }
    elementInputs[name] = {value: el.value};

    this.runValidates(name)
    this.renderErrorTexts(name)
    this.updateSubmitState()
  }
  updateSubmitState() {
    const submitButton = this.querySelector('input[type="submit"]');
    const result = this.allValid()
    submitButton.disabled = !(result)
  }
  allValid() {
    const hash = errors.get(this)
    for (let key in hash) {
      if (hash[key].length > 0) {
        return false
      }
    }
    return true
  }
  runValidates(name) {
    const input = inputs.get(this)[name]
    const valids = validates.get(this)[name]
    let errorsTmp = errors.get(this)[name]
    valids.forEach(valid => {
      const result = valid.func(input.value, ...valid.params)
      const index = errorsTmp.findIndex(error => error.name === valid.func.name)
      if (result) {
        if (index !== -1) {
          errorsTmp.splice(index, 1)
        }
      } else {
        if (index === -1) {
          errorsTmp.push({name: valid.func.name})
        }
      }
    })
    errors[name] = errorsTmp
  }
  renderErrorTexts(name) {
    const errorValues = errors.get(this)[name]
    const field = fields.get(this)[name]
    const errorEl = this.querySelector(`[data-error="${name}"]`)
    if (errorValues.length === 0) {
      if (errorEl.textContent !== "") { 
        errorEl.textContent = ""
      }
    } else {
      errorValues.forEach(errorValue => {
        let errorText = ""
        if (errorValue.name === "required") {
          errorText = errorTexts[errorValue.name](field)
        } else {
          const validate = validates.get(this)[name]
          const funcParams = validate.find(valid => valid.func.name === errorValue.name).params
          errorText = errorTexts[errorValue.name](field, ...funcParams)
        }
        errorEl.textContent = errorText
      })
    }
  }
  handleSubmit(handle) {
    if (this.allValid()) {
      handle(this)
    }
  }
}
