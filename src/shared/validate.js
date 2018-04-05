export const validate = (value, rules) => {
  if (!rules || Object.keys(rules).length === 0) {
    return true; // empty rules. Don't need validation
  }
  let isValid = true;
  const trimmedVal = value.trim();
  if (rules.required) {
    isValid = trimmedVal !== '';
  }
  if (rules.minLength) {
    isValid = isValid && trimmedVal.length >= rules.minLength;
  }
  if (rules.maxLength) {
    isValid = isValid && trimmedVal.length <= rules.maxLength;
  }
  if (rules.type && rules.type === 'number') {
    isValid = isValid && !trimmedVal.match(/[^0-9]/g);
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = isValid && pattern.test(trimmedVal);
  }
  return isValid;
};
