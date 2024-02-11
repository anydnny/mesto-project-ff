import '../pages/index.css';
import { initialCards } from './cards.js';
import {
  addStarterCards,
  submitCardForm
} from './card.js';
import { openPopup, editFormSubmit } from './modal.js';

const cardList = document.querySelector('.places__list'); // список карточек

// Кнопка и попап редактирования профиля
const editBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
// Имя и описание профиля
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// Поля и форма редактирования профиля
const editPopupForm = document.forms['edit-profile'];
const editFormName = editPopupForm.elements.name;
const editFormDesc = editPopupForm.elements.description;
// Кнопка, попап и форма добавление карточки
const addBtn = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
const addPopupForm = document.forms['new-place'];

// Добавление первоначальных карточек из массива
addStarterCards(cardList, initialCards);
// Слушатели для редактирования профиля
editBtn.addEventListener('click', () => {
  openPopup(editPopup);
  editFormName.value = profileName.textContent;
  editFormDesc.value = profileDesc.textContent;
});
editPopupForm.addEventListener('submit', (e) =>
  editFormSubmit(e, profileName, profileDesc, editFormName, editFormDesc)
);
// Слушатели для добавления карточки
addBtn.addEventListener('click', () => openPopup(addPopup));
addPopupForm.addEventListener('submit', (e) =>
  submitCardForm(e, addPopupForm, cardList)
);
