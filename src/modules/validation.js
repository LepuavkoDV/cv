export function getValidationClass ($v, fieldname) {
  const field = $v[fieldname]
  if (field) {
    return {
      'is-invalid': field.$invalid && field.$dirty
    }
  }
}
