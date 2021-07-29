// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ОТОБРАЖЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default class UserInfo {
  constructor( { fullNameSelector, professionSelector, avatarSelector } ) {
    this._fullNameSelector = fullNameSelector;
    this._professionSelector = professionSelector;
    this._avatarSelector = avatarSelector;

    this._fullName = document.querySelector(this._fullNameSelector);
    this._profession = document.querySelector(this._professionSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }
  
  getUserInfo() {
    const infoObject = {};

    const fullName = this._fullName;
    const profession = this._profession;

    infoObject[fullName.id] = fullName.textContent;
    infoObject[profession.id] = profession.textContent;
    
    return infoObject;
  }

  setUserInfo(inputsObject) {
    this._fullName.textContent = inputsObject.fullName;
    this._profession.textContent = inputsObject.profession;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
