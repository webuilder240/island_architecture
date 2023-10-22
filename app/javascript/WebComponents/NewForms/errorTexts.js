export const errorTexts = {
  required: (field) => `This ${field} is required`,
  maxValidate: (field, max) => `This ${field} must be less than ${max}`,
  minValidate: (field, min) => `This ${field} must be greater than ${min}`,
  maxLength: (field, maxLength) => `This ${field} must be less than ${maxLength} characters`,
};
