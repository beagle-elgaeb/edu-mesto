// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПОПАП ДЕМОНСТРАЦИИ ФОТОКАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupPic = this._popup.querySelector(".popup__pic");
    this._popupPicTitle = this._popup.querySelector(".popup__pic-title");
  }
    
  open(pic, title) {
    this._popupPic.src = pic;
    this._popupPic.alt = title;
    this._popupPicTitle.textContent = title;

    super.open();
  }
}