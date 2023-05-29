import Popup from "./Popup.js";
export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, deleteSubmit) {
    super(popupSelector);
    this._deleteSubmit = deleteSubmit;
    this._deleteForm = this._popup.querySelector('.popup__form')
    this._submitButton = this._popup.querySelector('.popup__save-button')
    this._startTextContentButton = this._submitButton.textContent
  }

  setEventListeners() {
    super.setEventListener()
    this._deleteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._deleteSubmit({ card: this._card, cardId: this._cardId })
    })
  }

  setStartText() {
    this._submitButton.textContent = this._startTextContentButton
  }

  open = ({ card, cardId }) => {
    super.open()
    this._card = card
    this._cardId = cardId
  }

}
