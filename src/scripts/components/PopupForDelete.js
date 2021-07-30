// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПОПАПЫ УДАЛЕНИЯ КАРТОЧКИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._buttonSubmit = this._popup.querySelector(".popup__button-delete");
  }

  open(removeCard) {
    this._removeCard = removeCard;

    this._form.addEventListener("submit", this._submitForm);
    
    super.open();
  }

  close() {
    this._buttonSubmit.textContent = "Да";

    this._form.removeEventListener("submit", this._submitForm);

    super.close();
  }

  _submitForm = (evt) => {
    evt.preventDefault();

    this._removeCard();

    this._buttonSubmit.textContent = "Удаление...";

    this._form.removeEventListener("submit", this._submitForm);
  }
}
