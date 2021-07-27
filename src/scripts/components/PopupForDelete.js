// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПОПАПЫ С ФОРМАМИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, removeCard) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._removeCard = removeCard;

    this._setEventListeners()
  }

  _setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._submitForm);
  }
  
  _submitForm = (evt) => {
    evt.preventDefault();

    this._removeCard();

    super.close();

    this._form.removeEventListener("submit", this._submitForm);
  }
}
