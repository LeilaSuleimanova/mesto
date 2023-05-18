import FormValidator from "../components/formValidator.js"
import Card from "../components/Сard.js"
import {
  initialCards,
  enableValidation,
  popupEditButton,
  popupAddButton,
  popupProfile,
  selectorElement,
  selectorTemplate,
  popupWrapImageSelector,
  popupAddSelector,
  profileInfo,
  formPopupAdd,
  formPopupInfo } from '../utils/Сonstants.js'
import '../pages/index.css'
import PopupWithImage from "../components/popupWithImage.js"
import Section from "../components/section.js"
import UserInfo from "../components/userInfo.js"
import PopupWithForm from "../components/popupWithForm.js"

const formAddValidator = new FormValidator(formPopupAdd, enableValidation)
const formInfoValidator = new FormValidator(formPopupInfo, enableValidation)

formAddValidator.enableValidation()
formInfoValidator.enableValidation()

const popupWrapImage = new PopupWithImage(popupWrapImageSelector)

const userInfo = new UserInfo(profileInfo)

const section = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const newCard = new Card(cardData, selectorTemplate, popupWrapImage.open);
    return newCard.createCard();
  }
}, selectorElement)

section.addCardArray()

const popupWithForm = new PopupWithForm(popupProfile, (data) => {
  userInfo.setUserInfo(data)
})

const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  section.addItem(data)
})

popupAddCard.setEventListeners()
popupWrapImage.setEventListener();
popupWithForm.setEventListeners();

// Функция открытия попапа
// const openPopupEdit = function () {
//   // nameInput.value = profileName.textContent;
//   // jobInput.value = profileJob.textContent;

//   popupWithForm.setInputValues(userInfo.getUserInfo())
//   popupWithForm.open();
// };
// popupEditButton.addEventListener("click", openPopupEdit);

const buttonEditProfile = document.querySelector(".profile__edit-button");
buttonEditProfile.addEventListener("click", () => {
  popupWithForm.setInputValues(userInfo.getUserInfo());
  popupWithForm.open();
  formInfoValidator.disableButton();
});

const openPopupAdd = () => {
  formAddValidator.toggleButtonState();
  popupAddCard.open();
}

popupAddButton.addEventListener("click", openPopupAdd);


