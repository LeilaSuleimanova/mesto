export default class UserInfo {
  constructor(profileInfo) {
    this._profileName = document.querySelector(profileInfo.userNameSelector)
    this._profileDescription = document.querySelector(profileInfo.userDescriptionSelector)
  }

  getUserInfo() {
    return { name: this._profileName.textcontent, info: this._profileDescription.textcontent }
  }

  setUserInfo(user) {
    this._profileName.textcontent = user.name;
    this._profileDescription.textcontent = user.info;
  }

}
