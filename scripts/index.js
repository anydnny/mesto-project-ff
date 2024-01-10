// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardList = document.querySelector('.places__list');


function deleteCard (cardElement) {
  cardElement.remove()
}

function createCard(card, removeCard) {

  const cardTemplate = document.querySelector("#card-template").content;
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
