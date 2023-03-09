const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__profile_type_name')
const jobInput = formElement.querySelector('.popup__profile_type_info')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  console.log('Open popup clicked');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
};

formElement.addEventListener('submit', handleFormSubmit);



