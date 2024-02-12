import '../pages/index.css';
import { initialCards } from './cards.js';
import {
  createNewCard,
  removeCardClick,
  likeClickFn
} from './card.js';
import { openPopup, closePopup } from './modal.js';

const cardList = document.querySelector('.places__list'); // список карточек

// Кнопка и попап редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
// Имя и описание профиля
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// Поля и форма редактирования профиля
const profileEditForm = document.forms['edit-profile'];
const profileFormName = profileEditForm.elements.name;
const profileFormDesc = profileEditForm.elements.description;
// Кнопка, попап и форма добавление карточки
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
//Изображения, открытие изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupFullImage = document.querySelector('.popup__image');
const popupImageDesc = document.querySelector('.popup__caption');

// Добавление первоначальных карточек из массива
addStarterCards(initialCards);

// Сабмит формы редактирования профиля
function editFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
  closePopup(profileEditPopup)
}

// Слушатели для редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileFormName.value = profileName.textContent;
  profileFormDesc.value = profileDesc.textContent;
});
profileEditForm.addEventListener('submit', editFormSubmit);

// Слушатели для добавления карточки
newCardButton.addEventListener('click', () => openPopup(newCardPopup));
newCardForm.addEventListener('submit', (e) =>
  submitCardForm(e, newCardForm)
);

// Добавление карточки в список
function addCardToList(card) {
  cardList.prepend(card);
}
// Сабмит формы создания карточки
function submitCardForm(e, form) {
  e.preventDefault();
  const newCardValues = {
    name: form.elements['place-name'].value,
    link: form.elements['link'].value,
    alt: name
  };
  const card = createNewCard(
    newCardValues,
    removeCardClick,
    likeClickFn,
    openFullImg
  );

  addCardToList(card);
  form.reset();
  closePopup(newCardPopup);
}
// Функция добавления исходных карточек
function addStarterCards(initialCards) {
  initialCards.forEach((item) => {
    const newCard = createNewCard(
      item,
      removeCardClick,
      likeClickFn,
      openFullImg
    );
    addCardToList(newCard);
  });
}
// Открытие фотографии
function openFullImg(cardDesc, cardName) {
  popupFullImage.src = cardDesc;
  popupFullImage.alt = cardName;
  popupImageDesc.textContent = cardName;

  openPopup(imagePopup);
}

