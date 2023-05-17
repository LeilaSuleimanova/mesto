// Массив карточек
export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formPopupAdd = document.querySelector('#popup-form-add')
const formPopupInfo = document.querySelector('#popup-form-info')
const popupEditButton = document.querySelector('.profile__edit-button')
const popupAddButton = document.querySelector('.profile__add-button')
const popupProfile = '#popup-profile'
const selectorElement = '.elements'
const selectorTemplate = '.template-cards'
const popupWrapImageSelector = '#popup-image'
const popupAddSelector = '#popup-add'
const profileInfo = {
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle'
}

export {
  popupEditButton,
  popupAddButton,
  popupProfile,
  selectorElement,
  selectorTemplate,
  popupWrapImageSelector,
  popupAddSelector,
  profileInfo,
  formPopupAdd,
  formPopupInfo
}
