// Общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', handleClosePopupEsc);
}

// Общая функция закрытия попапа
function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  openedPopup.removeEventListener('click', handleClosePopupClick);
  document.removeEventListener('keydown', handleClosePopupEsc);
}

// Закрытие по клику
function handleClosePopupClick(e) {
  if (
    e.target.classList.contains('popup__close') ||
    e.target.classList.contains('popup')
  ) {
    closePopup();
  }
}

// Закрытие по кнопке Esc
function handleClosePopupEsc(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
}

// Сабмит формы редактирования профиля
function editFormSubmit(e, profileName, profileDesc, formName, formDesc) {
  e.preventDefault();

  profileName.textContent = formName.value;
  profileDesc.textContent = formDesc.value;

  closePopup()
}

export { openPopup, closePopup, handleClosePopupEsc, editFormSubmit };
