export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popupCloseButton = this._popup.querySelector('.popup__close')
  }

  _handleClosePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleClosePopupOnOverlay = (evt) => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close();
  }

  _handleClosePopupButton = () => {
    this.close()
  }

  setEventListener() {
    this._popupCloseButton.addEventListener('click', this._handleClosePopupButton)
    this._popup.addEventListener('click', this._handleClosePopupOnOverlay)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleClosePopupByEsc)
  }

  close(popup) {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener("keydown", this._handleClosePopupByEsc)
    this._popup.removeEventListener('click', this._handleClosePopupOnOverlay)
  }

}
