// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ОБЪЯВЛЕНИЕ ФУНКЦИЙ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

// Закрытие popup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// Закрытие popup по esc ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function closePopupEsc(evt) {
  if (evt.key === ESC) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Создание карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function getPhotoOfCard(card) {
  return card.querySelector(".card__photo");;
}

function createCard(pic, title) {
  // Клонирование карточки
  const card = cardForClone.cloneNode(true);

  const cardTitleElement = card.querySelector(".card__title");
  const cardPhotoElement = card.querySelector(".card__photo");
  const likeCardButtons = card.querySelector(".card__button-like");
  const deleteCardButtons = card.querySelector(".card__button-delete");

  // Заполнение карточки
  cardPhotoElement.src = pic;
  cardPhotoElement.alt = title;
  cardTitleElement.textContent = title;

  // Лайки
  likeCardButtons.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__button-like_active");
  });

  // Удаление карточки
  deleteCardButtons.addEventListener("click", function () {
    card.remove();
  });

  // Открытие фотографии в попапе
  cardPhotoElement.addEventListener("click", function () {
    openPopup(picPopup);
    popupPhotoElement.src = cardPhotoElement.src;
    popupPhotoElement.alt = cardTitleElement.textContent
    popupTitleElement.textContent = cardTitleElement.textContent;
  });

  return card;
}

// Добавление на страницу карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function addCard(cards, card) {
  cards.prepend(card);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛУШАТЕЛИ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Открытие popup редактирования профиля ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileButton.addEventListener("click", function () {
  fullNameInput.value = fullNameElement.textContent;
  professionInput.value = professionElement.textContent;

  // const fullNameEvent = new Event("input");
  // fullNameInput.dispatchEvent(fullNameEvent);
  // const professionEvent = new Event("input");
  // professionInput.dispatchEvent(professionEvent);

  hideInputError(editProfileForm, fullNameInput, selectors);
  hideInputError(editProfileForm, professionInput, selectors); 

  openPopup(editProfilePopup);
});

// Открытие popup новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardButton.addEventListener("click", function () {
  openPopup(addCardPopup);

  hideInputError(addCardForm, picInput, selectors);
  hideInputError(addCardForm, titleInput, selectors);  
});

// Закрытие popup  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let mouseDownTarget;
let mouseUpTarget;

// Переменная нажатия кнопки
document.addEventListener("mousedown", function (evt) {
  mouseDownTarget = evt.target;
})

// Переменная отжатия кнопки
document.addEventListener("mouseup", function (evt) {
  mouseUpTarget = evt.target;
});

// Закрытие
popups.forEach(function (popup, i) {

  //          по крестику
  closePopupButtons[i].addEventListener("click", function () {
    closePopup(popup);
  });

  //          по вне
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget && mouseDownTarget === mouseUpTarget) {
      closePopup(popup);
    }
  });
});

// Сохранение профайла ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  fullNameElement.textContent = fullNameInput.value;
  professionElement.textContent = professionInput.value;

  closePopup(editProfilePopup);
});

// Добавление на страницу первоначальной карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

primalCards.forEach(function (cardData) {
  addCard(cards, createCard(cardData.link, cardData.name));
});

// Добавление на страницу новой карточки ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  const submitButton = addCardForm.querySelector(selectors.submitButtonSelector);
  submitButton.classList.add(selectors.inactiveButtonClass);
  submitButton.setAttribute("disabled", "true");
  
  addCard(cards, createCard(picInput.value, titleInput.value));
  closePopup(addCardPopup);
  addCardForm.reset();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МНЕ ТАК ХОЧЕТСЯ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

document.addEventListener('contextmenu', evt => {
  evt.preventDefault();
})
