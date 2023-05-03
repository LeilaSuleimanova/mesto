import FormValidator from "./formValidator.js"
import Card from "./card.js"

const formPopupAdd = document.querySelector('#popup-form-add')
const formPopupInfo = document.querySelector('#popup-form-info')

const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formAddInstance = new FormValidator(formPopupAdd, enableValidation)
const formInfoInstance = new FormValidator(formPopupInfo, enableValidation)

formAddInstance.enableValidation()
formInfoInstance.enableValidation()

// Константы для первого попапа
const popupProfile = document.querySelector('#popup-profile')
const popupEditButton = document.querySelector('.profile__edit-button')
const formProfile = popupProfile.querySelector('.popup__form')
const nameInput = formProfile.querySelector('.popup__input_type_name')
const jobInput = formProfile.querySelector('.popup__input_type_info')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const popupElement = document.querySelector('.profile__subtitle')

// Константы для второго попапа
const popupAdd = document.querySelector('#popup-add')
const popupAddButton = document.querySelector('.profile__add-button')
const formAdd = popupAdd.querySelector("form[name='popup-form-add']")
const titleInput = popupAdd.querySelector(".popup__input_type_title")
const urlInput = popupAdd.querySelector(".popup__input_type_url")

// Константы для карточек
const elements = document.querySelector(".elements")

//Константы для третьего попапа
const popupWrapImage = document.querySelector('#popup-image')
const popupImage = popupWrapImage.querySelector('.popup__image')
const popupImageTitle = popupWrapImage.querySelector('.popup__image-title')

//константы для класса Кард
const selectorTemplate = '.template-cards'

// Функция открытия попапа
const openPopupEdit = function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openPopupAdd = function () {
  openPopup(popupAdd);
  const input = popupAdd.querySelector('.popup__input')
  const button = popupAdd.querySelector('.popup__save-button')
  if (!input.value) {
    button.classList.add('popup__save-button_invalid')
    button.setAttribute('disabled', '')
  }
};

//Добавление класса открытия попапа в разметку
export const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupButtonEsc)
  popup.addEventListener('click', closePopupOnOverlay)
}

// Функция закрытия попапа
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupButtonEsc)
  popup.removeEventListener('click', closePopupOnOverlay)
}

const closePopupOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(evt.target);
}

const closePopupButtonEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    if (activePopup) {
      closePopup(activePopup)
    }
  }
}

function createNewCard(cardData) {
  const newCard = new Card(cardData, selectorTemplate);
  const cardElement = newCard.createCard()
  return cardElement
}

//добавление карточки
function addCard(container, newCard) {
  container.prepend(newCard);
}

// Обработка Сабмит инпут
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

function handleAddCard(event) {
  event.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: urlInput.value
  }
  addCard(elements, createNewCard(newCard))
  closePopup(popupAdd);
  event.target.reset();
}

// создание при загрузке страницы начальных карточек
initialCards.forEach(renderCards)

function renderCards(cardData) {
  addCard(elements, createNewCard(cardData))
}

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

formProfile.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', handleAddCard);

popupEditButton.addEventListener("click", openPopupEdit);
popupAddButton.addEventListener("click", openPopupAdd);






