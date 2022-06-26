/**
 * Parse the field data from the form being submitted
 * @param e The SubmitEvent passed to `onSubmit`
 * @returns An object whose keys are the names of the form elements and
 * whose values are the values of the form elements.
 *
 * For radio groups that have multiple radio inputs with the same name,
 * the value at that key will be the value attribute of the selected
 * radio button.
 *
 * For checkbox groups that have multiple checkbox inputs with the same
 * name, the value at that key will be an array containing the value
 * attributes of the selected checkboxes.  Note that the value is
 * guaranteed to always be an array, even if only a single checkbox
 * is checked.
 */
export function getFormData<T = any>(e: SubmitEvent) {
  const formData = new FormData(e.target as HTMLFormElement)

  const el = e.target as HTMLElement
  const checkboxNameToCount = Array.from(el.querySelectorAll('input[type=checkbox]'))
    .map((input) => (input as HTMLInputElement).name)
    .reduce((accum, inputName) => {
      if (accum[inputName]) {
        accum[inputName]++
      } else {
        accum[inputName] = 1
      }
      return accum
    }, {} as Record<string, number>)

  const data = {} as any
  formData.forEach((value, inputName) => {
    if (data[inputName] === undefined) {
      const isCheckboxGroup = checkboxNameToCount[inputName] > 1

      if (isCheckboxGroup) {
        data[inputName] = [value]
      } else {
        data[inputName] = value
      }
    } else if (Array.isArray(data[inputName])) {
      data[inputName].push(value)
    }
  })

  return data as T
}
