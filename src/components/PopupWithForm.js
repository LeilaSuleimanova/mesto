import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector)
    this._submit = submit
    this._form = this._popup.querySelector('.popup__form')
    this._input = this._form.querySelectorAll('.popup__input')
    this._submitButton = this._form.querySelector('.popup__save-button')
    this._startTextContentButton = this._submitButton.textContent
  }

  _getInputValues() {
    // const data = Object.fromEntries(new FormData(this._form))
    // return data
    this._value = {}
    this._input.forEach(input => {
      this._value[input.name] = input.value
    })
    return this._value
  }

  setInputValues(user) {
    this._input.forEach(input => {
      input.value = user[input.name]
    })
  }

  setEventListeners() {
    super.setEventListener()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitButton.textContent = `Сохранение...`
      this._submit(this._getInputValues())
    })
  }

  setStartText() {
    this._submitButton.textContent = this._startTextContentButton
  }

  close() {
    super.close()
    this._form.reset()
  }

}
