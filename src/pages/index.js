import FormValidator from "../components/formValidator.js"
import Card from "../components/Сard.js"
import {
  enableValidation,
  popupAddButton,
  popupProfile,
  selectorElement,
  selectorTemplate,
  popupWrapImageSelector,
  popupAddSelector,
  profileInfo,
  formPopupAdd,
  formPopupInfo,
  popupAvatarSelector,
  formPopupAvatar,
  popupAvatarButton,
  popupDeleteSelector,
} from '../utils/Сonstants.js'
import '../pages/index.css'
import PopupWithImage from "../components/popupWithImage.js"
import Section from "../components/section.js"
import UserInfo from "../components/userInfo.js"
import PopupWithForm from "../components/popupWithForm.js"
import Api from "../components/Api.js"
import PopupWithDeleteForm from "../components/PopupWithDeleteForm.js"

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'fb04fe28-7bc0-4cbf-bc40-2c92feffd1a0',
    'Content-Type': 'application/json'
  }
});

const formAddValidator = new FormValidator(formPopupAdd, enableValidation)
const formInfoValidator = new FormValidator(formPopupInfo, enableValidation)
const formAvatarValidator = new FormValidator(formPopupAvatar, enableValidation)

formAddValidator.enableValidation()
formInfoValidator.enableValidation()
formAvatarValidator.enableValidation()

const popupWrapImage = new PopupWithImage(popupWrapImageSelector)

const userInfo = new UserInfo(profileInfo)

const popupDeleteCard = new PopupWithDeleteForm(popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCardElement()
      popupDeleteCard.close()
    })
    .catch((error) => console.log(`Ошибка при создании данных ${error}`))
    .finally(() => popupDeleteCard.setStartText())
}
)

function createNewCard(cardData) {
  const newCard = new Card(cardData, selectorTemplate, popupWrapImage.open,
    () => {
      const isLiked = newCard.likeByMe()
      if (isLiked) {
        api.deleteLike(cardData._id)
          .then(res => {
            newCard.toggleLikes(res.likes)
          })
          .catch((error) => console.log(`Ошибка при создании данных ${error}`))
      } else {
        api.addlike(cardData._id)
          .then(res => {
            newCard.toggleLikes(res.likes)
          })
          .catch((error) => console.log(`Ошибка при создании данных ${error}`))
      }
    }, popupDeleteCard.open)

  return newCard.createCard();
}

const section = new Section((cardData) => {
  section.addItem(createNewCard(cardData))
}, selectorElement);

const popupFormEdit = new PopupWithForm(popupProfile, (data) => {
  api.setUserData(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, info: res.about, avatar: res.avatar })
      popupFormEdit.close()
    })
    .catch((error) => console.log(`Ошибка при создании данных ${error}`))
    .finally(() => popupFormEdit.setStartText())
})

const popupAvatarEdit = new PopupWithForm(popupAvatarSelector, (data) => {
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, info: res.about, avatar: res.avatar })
      popupAvatarEdit.close()
    })
    .catch((error) => console.log(`Ошибка при создании данных ${error}`))
    .finally(() => popupAvatarEdit.setStartText())
})

const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  api.addNewCard(data)
    .then((infoCard) => {
      console.log()
      infoCard.idUser = userInfo.getId()
      section.addItem(createNewCard(infoCard))
      popupAddCard.close()
    })
    .catch((error => console.log(`Ошибка при создании данных ${error}`)))
    .finally(() => popupAddCard.setStartText())
})

popupAvatarEdit.setEventListeners()
popupAddCard.setEventListeners()
popupWrapImage.setEventListener();
popupFormEdit.setEventListeners();
popupDeleteCard.setEventListeners();

const buttonEditProfile = document.querySelector(".profile__edit-button");
buttonEditProfile.addEventListener("click", () => {
  popupFormEdit.setInputValues(userInfo.getUserInfo());
  popupFormEdit.open();
  formInfoValidator.disableButton();
});

const openPopupAdd = () => {
  formAddValidator.toggleButtonState();
  popupAddCard.open();
}

const openPopupAvatar = () => {
  formAvatarValidator.toggleButtonState();
  popupAvatarEdit.open();
}

popupAvatarButton.addEventListener("click", openPopupAvatar);
popupAddButton.addEventListener("click", openPopupAdd);

Promise.all([api.getData(), api.getInitialCards()])
  .then(([infoUser, infoCard]) => {
    infoCard.forEach(element => element.idUser = infoUser._id)
    userInfo.setUserInfo({ name: infoUser.name, info: infoUser.about, avatar: infoUser.avatar })
    userInfo.setId(infoUser._id)
    section.addCardArray(infoCard.reverse())
  })
  .catch((error => console.log(`Ошибка при создании данных ${error}`)))
