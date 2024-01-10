// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardList = document.querySelector('.places__list');

function addCard(item) {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  function removeCard() {
    cardElement.remove()
  }

  cardImage.src = `${item.link}`;
  cardImage.alt = `На фото ${item.name}`;
  cardTitle.textContent = `${item.name}`;
  cardDeleteBtn.addEventListener('click', removeCard)

  cardList.append(cardElement);
}

function addStarterCards() {
  initialCards.forEach(item => addCard(item))
}

addStarterCards()
