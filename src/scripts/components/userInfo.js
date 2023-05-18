export default class UserInfo {
  constructor(profileInfo) {
    this._profileName = document.querySelector(profileInfo.userNameSelector)
    this._profileDescription = document.querySelector(profileInfo.userDescriptionSelector)
  }

  getUserInfo() {
    return { name: this._profileName.textContent, info: this._profileDescription.textContent }
  }

  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileDescription.textContent = user.info;
  }

}
