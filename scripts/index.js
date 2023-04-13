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

// Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция открытия попапа
const openPopupEdit = function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openPopupAdd = function () {
  openPopup(popupAdd);
  const input = document.querySelector('.popup__input')
  const button = document.querySelector('.popup__save-button')
  if (!input.value) {
    button.setAttribute('disabled', '')
  }
};

//Добавление класса открытия попапа в разметку
const openPopup = popup => {
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

// Отображение в попапе инпутов
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

// Добавление карточек
initialCards.forEach(renderCards)

function renderCards(item) {
  const newCard = createCard(item);
  elements.append(newCard);
}

function createCard(item) {
  const template = document.querySelector(".template-cards").content
  const cardElement = template.cloneNode(true)
  const likeButton = cardElement.querySelector('.element__button-like')
  const deleteButton = cardElement.querySelector('.element__button-delete')
  const imgElement = cardElement.querySelector('.element__image')

  likeButton.addEventListener('click', () =>
    likeButton.classList.toggle("element__button-like_active"))
  imgElement.src = item.link;
  imgElement.alt = item.name;
  cardElement.querySelector('.element__title').textContent = item.name;
  deleteButton.addEventListener('click', handleDeleteCard)

  imgElement.addEventListener('click', function () {
    openPopup(popupWrapImage);
    popupImage.src = imgElement.src;
    popupImageTitle.textContent = imgElement.alt;
  });

  return cardElement
}

function handleAddCard(event) {
  event.preventDefault();
  const newCard = createCard({
    name: titleInput.value,
    link: urlInput.value
  })
  elements.prepend(newCard);
  closePopup(popupAdd);
  event.target.reset();
}

// Удаление карточки
function handleDeleteCard(event) {
  const card = event.target.closest('.element');
  card.remove();
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

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

allValidationForms(enableValidation)




