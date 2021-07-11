// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПОПАП ДЕМОНСТРАЦИИ ФОТОКАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
    
  open(pic, title) {
    this._popup.querySelector(".popup__pic").src = pic;
    this._popup.querySelector(".popup__pic-title").alt = title;
    this._popup.querySelector(".popup__pic-title").textContent = title;

    super.open();
  }
}