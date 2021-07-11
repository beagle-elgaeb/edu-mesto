// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ ПОПАПЫ С ФОРМАМИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);

    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._buttonSubmit = this._popup.querySelector(".popup__button-save");
    this._inputsArray = Array.from(this._form.querySelectorAll(".popup__input"));
  }
    
  close() {
    this._form.reset();

    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    
      this._submitForm(this._getInputValues());
    
      this.close();
    });
  }

  _getInputValues() {
    const inputsObject = {};

    this._inputsArray.forEach(input => {
      const name = input.name;
      const value = input.value;

      inputsObject[name] = value;
    });
    
    return inputsObject;
  }
}