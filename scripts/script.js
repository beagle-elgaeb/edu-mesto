let popup = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__button-edit");
let buttonClosePopup = document.querySelector(".popup__button-close");
let fullName = document.querySelector(".profile__info-full-name");
let inputFullName = document.querySelector(".popup__form-item_text_full-name");
let profession = document.querySelector(".profile__info-profession");
let inputProfession = document.querySelector(".popup__form-item_text_profession");
let formProfile = document.querySelector(".popup__form");
let mouseDownTarget;
let mouseUpTarget;

// Открываем popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

buttonEditProfile.addEventListener("click", openPopup);

function openPopup() {
  popup.classList.add("popup_opened");
  inputFullName.value = fullName.textContent;
  inputProfession.value = profession.textContent;
}

// Закрываем popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

buttonClosePopup.addEventListener("click", closePopup);

function closePopup() {
  popup.classList.remove("popup_opened");
  
}

// Закрываем popup по нажатию во вне ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

document.addEventListener("mousedown", function(event) {
  mouseDownTarget = event.target;
})

document.addEventListener("mouseup", function(event) {
  mouseUpTarget = event.target;
});

popup.addEventListener("click", function(event) {
  if (event.target === event.currentTarget && mouseDownTarget === mouseUpTarget) {
  closePopup();
  }
});

// Сохраняем введённые в форму данные ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

formProfile.addEventListener("submit", saveProfile);

function saveProfile(event) {
  event.preventDefault();
  fullName.textContent = inputFullName.value;
  profession.textContent = inputProfession.value;
  closePopup();
}