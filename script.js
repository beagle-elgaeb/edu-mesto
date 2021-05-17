let popup = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__button-edit");
let buttonClosePopup = document.querySelector(".popup__button-close");
let fullName = document.querySelector(".profile__info-full-name");
let inputFullName = document.querySelector(".popup__form-item_text_full-name");
let profession = document.querySelector(".profile__info-profession");
let inputProfession = document.querySelector(".popup__form-item_text_profession");
let buttonSaveProfile = document.querySelector(".popup__button-save");

// Открываем и закрываем popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

buttonEditProfile.addEventListener("click", openClosePopup);
buttonClosePopup.addEventListener("click", openClosePopup);

function openClosePopup(event) {
  event.preventDefault();
  popup.classList.toggle("popup_opened");
}

// Закрываем popup по нажатию во вне ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

popup.addEventListener("click", function(event) {
  if (event.target === event.currentTarget) {
    openClosePopup(event)
  }
})

// Вставляем в форму данные из профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

inputFullName.value = fullName.textContent;
inputProfession.value = profession.textContent;

// Сохраняем введённые в форму данные ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

buttonSaveProfile.addEventListener("click", saveProfile);

function saveProfile(event) {
  event.preventDefault();
  fullName.textContent = inputFullName.value;
  profession.textContent = inputProfession.value;
  openClosePopup(event);
}