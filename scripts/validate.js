const allValidationForms = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector))
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    forms.forEach(form => {
      setEventListeners(form, rest)
    })
  })
}

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
  const formButton = formToValidate.querySelector(submitButtonSelector)
  disableButton(formButton, rest)
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input)
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest)
      } else {
        enableButton(formButton, rest)
      }
    })
  })
}

const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = ''
    currentInputErrorContainer.classList.remove(enableValidation.errorClass)
  } else {
    currentInputErrorContainer.textContent = input.validationMessage
    currentInputErrorContainer.classList.add(enableValidation.errorClass)
  }
}

const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid)
}

const enableButton = (button, { inactiveButtonClass, rest }) => {
  button.classList.remove(inactiveButtonClass)
  button.removeAttribute('disabled', '')
}

const disableButton = (button, { inactiveButtonClass, rest }) => {
  button.classList.add(inactiveButtonClass)
  button.setAttribute('disabled', '')
}
