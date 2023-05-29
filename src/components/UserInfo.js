export default class UserInfo {
  constructor(profileInfo) {
    this._profileName = document.querySelector(profileInfo.userNameSelector)
    this._profileDescription = document.querySelector(profileInfo.userDescriptionSelector)
    this._profileImage = document.querySelector(profileInfo.userImageSelector)
  }

  getUserInfo() {
    return { name: this._profileName.textContent, info: this._profileDescription.textContent }
  }

  setUserInfo({ avatar, name, info }) {
    this._profileImage.src = avatar;
    this._profileName.textContent = name;
    this._profileDescription.textContent = info;
  }

}
