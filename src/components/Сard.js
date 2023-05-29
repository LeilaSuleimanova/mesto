class Card {
  constructor(cardData, selectorTemplate, handleOpenPopup, changeLikes, openDeletePopup) {
    this._cardData = cardData;
    this._selectorTemplate = selectorTemplate;
    this._handleOpenPopup = handleOpenPopup;
    this._idUser = cardData.idUser;
    this._idOwner = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesQuantity = cardData.likes.length;
    this._changeLikes = changeLikes;
    this._cardId = cardData._id;
    this._openDeletePopup = openDeletePopup;
  }

  _getNewCardFromTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleButtonLike = () => {
    this._changeLikes(this._buttonLikeElement, this._cardId)
  }

  _removeTrashButton() {
    this._idUser === this._idOwner ? this._buttonDeleteElement.style.display = 'block' : this._buttonDeleteElement.style.display = 'none'
  }

  _changeLikeQuantity() {
    this._likes.forEach(element => {
      if (element._id === this._idUser) {
        this._buttonLikeElement.classList.add('element__button-like_active')
        return
      }
    })
    this._counter.textContent = this._likesQuantity
  }

  toggleLikes(like) {
    this._buttonLikeElement.classList.toggle('element__button-like_active')
    this._counter.textContent = like.length
  }

  likeByMe() {
    return this._likes.find(card => card._id === this._idUser)
  }

  removeCardElement() {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._handleButtonLike)
    this._buttonDeleteElement.addEventListener('click', () => this._openDeletePopup({ card: this, cardId: this._cardId }))
    this._imageElement.addEventListener('click', () => this._handleOpenPopup(this._cardData))
  }


  createCard() {
    this._cloneElement = this._getNewCardFromTemplate();
    this._imageElement = this._cloneElement.querySelector('.element__image');
    this._buttonLikeElement = this._cloneElement.querySelector('.element__button-like')
    this._buttonDeleteElement = this._cloneElement.querySelector('.element__button-delete')
    this._counter = this._cloneElement.querySelector('.element__counter')
    this._titleElement = this._cloneElement.querySelector('.element__title').textContent = this._cardData.name;
    this._imageElement.src = this._cardData.link;
    this._imageElement.alt = this._cardData.name;
    this._removeTrashButton();
    this._setEventListeners();
    this._changeLikeQuantity();
    return this._cloneElement
  }
}

export default Card

