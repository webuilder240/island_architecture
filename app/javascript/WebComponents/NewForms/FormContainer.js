// const inputs = new WeakMap();
import { maxLength, minValidate, maxValidate, required } from './Validates.js'
import { errorTexts } from './errorTexts.js'
const inputs = {}
const validates = {}
const errors = {}
const fields = {}

export class FormContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(el => {
      this.setFields(el)
      this.setErrors(el)
      this.setValidates(el)
      el.addEventListener('input', (e) => this.updateInputState(e));
      el.addEventListener("blur", (e) => this.updateInputState(e))
    });

    this.querySelectorAll('select').forEach(el => {
      this.setFields(el)
      this.setErrors(el)
      this.setValidates(el)
      el.addEventListener('change', (e) => this.updateInputState(e));
    })

    // this.updateInputState();

    // const submitButton = this.querySelector('button');
    // submitButton.addEventListener('click', () => this.submitForm());
  }

  disconnectedCallback() {
    this.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(el => {
      el.removeEventListener('input', () => this.updateInputState());
    });

    this.querySelectorAll('select').forEach(el => {
      el.removeEventListener('change', () => this.updateInputState());
    })

    // const submitButton = this.querySelector('button');
    // submitButton.removeEventListener('click', () => this.submitForm());
  }
  setFields(el) {
    const name = el.getAttribute('name');
    const field = el.getAttribute('data-field');
    fields[name] = (field || name)
  }
  setErrors(el) {
    const name = el.getAttribute('name');
    errors[name] = []
  }
  setValidates(el) {
    const name = el.getAttribute('name');
    validates[name] = []
    if (el.getAttribute('data-maxLength')) {
      const dataMaxLength = parseInt(el.getAttribute('data-maxlength'))
      validates[name].push({func: maxLength, params: [dataMaxLength]})
    }

    if (el.getAttribute("required")) {
      validates[name].push({func: required, params: []})
    }

    if (el.getAttribute('min')) {
      const min = parseInt(el.getAttribute('min'))
      validates[name].push({func: minValidate, params: [min]})
    }

    if (el.getAttribute('max')) {
      const max = parseInt(el.getAttribute('max'))
      validates[name].push({func: maxValidate, params: [max]})
    }
  }
  updateInputState(e) {
    const el = e.target
    const name = el.getAttribute('name');
    inputs[name] = {value: el.value};
    this.runValidates(name)
    this.renderErrorTexts(name)
    this.updateSubmitState()
    // console.log(inputs)
    // inputs.set(name, {value: el.value});
    // inputs.set(this, {
    // });
    // this.querySelector('button').disabled = !allValid;
  }
  updateSubmitState() {
    // const submitButton = this.querySelector('button');
    // submitButton.disabled = !this.allValid();
  }
  allValid() {
    return errors.forEach(error => {
      if (error.length > 0) {
        return false
      }
    }) 
  }
  runValidates(name) {
    const input = inputs[name]
    const valids = validates[name]
    let errorsTmp = errors[name]
    valids.forEach(valid => {
      const result = valid.func(input.value, ...valid.params)
      if (result) {
        const index = errorsTmp.findIndex(error => error.name === valid.func.name)
        if (index !== -1) {
          errorsTmp.splice(index, 1)
        }
      } else {
        const index = errorsTmp.findIndex(error => error.name === valid.func.name)
        if (index === -1) {
          errorsTmp.push({name: valid.func.name, result: result})
        }
      }
    })
    errors[name] = errorsTmp
  }
  renderErrorTexts(name) {
    const errorValues = errors[name]
    const field = fields[name]
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
          const funcParams = validates[name].find(valid => valid.func.name === errorValue.name).params
          errorText = errorTexts[errorValue.name](field, ...funcParams)
        }
        errorEl.textContent = errorText
      })
    }
  }
}