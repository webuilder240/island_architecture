export function requiredValidators(errors, value) {
  if (value === null || value === '' || value === undefined) {
    errors.push('入力してください。')
  }
}

export function minLengthValidators(errors, value, minLength) {
  if (value.length < minLength) {
    errors.push('入力が短すぎます。')
  }
}

export function maxLengthValidators(errors, value, maxLength) {
  if (value.length > maxLength) {
    errors.push('入力が長すぎます。')
  }
}

export function numberMinRangeValidators(errors, value, minLength) {
  if (minLength > value) {
    errors.push('入力が短すぎます。')
  }
}

export function numberMaxRangeValidators(errors, value, maxLength) {
  if (maxLength < value) {
    errors.push('入力が長すぎます。')
  }
}
