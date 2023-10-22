 export function maxLength(data, maxLength) {
  return data.length < maxLength
 }
 export function required(data) {
  return data !== "" && data !== null && data !== undefined
 }
 export function maxValidate(data, max) {
  return data < max
 }
 export function minValidate(data, min) {
  return data > min
 }