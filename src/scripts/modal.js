// Submit формы редактирования пользователя
function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormName.value;
  profileDesc.textContent = editFormDesc.value;
  editPopup.classList.remove("popup_is-opened");
  editPopupForm.removeEventListener('submit', editFormSubmit)
}
// Открытие формы редактирования пользователя
function openEditPopup(popup, form, formNameField, formDescField) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeEditPopup);
  window.addEventListener("keydown", closeEditPopupEsc);
  console.log('Слушатель на закрытие')

  formNameField.value = profileName.textContent;
  formDescField.value = profileDesc.textContent;

  form.addEventListener('submit', editFormSubmit)
  console.log('Добавлен слушатель на submit')
}

function closeEditPopup(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    editPopup.classList.remove("popup_is-opened");
    editPopup.removeEventListener("click", closeEditPopup);
    window.removeEventListener("keydown", closeEditPopupEsc);
  }
}

function closeEditPopupEsc(evt) {
  if (evt.key === "Escape") {
    editPopup.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", closeEditPopupEsc);
  }
}

export {editFormSubmit, openEditPopup, closeEditPopup, closeEditPopupEsc}
