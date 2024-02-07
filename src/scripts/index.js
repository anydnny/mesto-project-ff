import '../pages/index.css';
import { initialCards } from './cards.js';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector("#card-template").content;

function deleteCard (cardElement) {
  cardElement.remove()
}

function createCard(card, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = card.link;
  cardImage.alt = `На фото ${card.name}`;
  cardTitle.textContent = card.name;

  cardDeleteBtn.addEventListener('click', () => removeCard(cardElement));

  return cardElement
}

function addStarterCards() {
  initialCards.forEach(card => {
    const cardItem = createCard(card, deleteCard);
    cardList.append(cardItem);
  })
}

addStarterCards()
