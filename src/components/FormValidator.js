class FormValidator {
  constructor(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, ...rest }) {
    this._form = form
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._errorClass = errorClass
    this._additionalParams = rest
  }

  enableValidation() {
    this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector))
    this._formButton = this._form.querySelector(this._submitButtonSelector)
    this._setEventListeners()
    this.toggleButtonState()
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton()
    } else {
      this._enableButton()
    }
  }

  _setEventListeners() {
    this.disableButton()
    this._formInputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(input)
        this.toggleButtonState()
      })
    })
  }

  _checkInputValidity(input) {
    const currentInputErrorContainer = this._form.querySelector(`#${input.id}-error`)
    if (input.checkValidity()) {
      currentInputErrorContainer.textContent = ''
      currentInputErrorContainer.classList.remove(this._errorClass)
    } else {
      currentInputErrorContainer.textContent = input.validationMessage
      currentInputErrorContainer.classList.add(this._errorClass)
    }
  }

  disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass)
    this._formButton.setAttribute('disabled', '')
  }

  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass)
    this._formButton.removeAttribute('disabled', '')
  }

  _hasInvalidInput() {
    return this._formInputs.some(item => !item.validity.valid)
  }

}

export default FormValidator
