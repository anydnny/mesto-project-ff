function enableValidation (validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => e.preventDefault());
    setEventListeners(formElement, validationSettings)
  })
}

function setEventListeners (formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationSettings)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidityInput(formElement, inputElement, validationSettings)
      toggleButtonState(inputList, buttonElement, validationSettings)
    })
  })
  hasInvalidInput(inputList)
}

function checkValidityInput (formElement, inputElement, validationSettings) {
  if(!inputElement.validity.valid) {
        if(inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
          showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings)
        } else {
          inputElement.setCustomValidity('');
          showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings)
        }
  } else {
      hideInputError(formElement, inputElement, validationSettings)
  }
}

function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  inputElement.setCustomValidity('');

  errorElement.classList.remove(validationSettings.errorClass)
  errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement, validationSettings) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.disabled = false
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings)
  }
  )
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)
  buttonElement.classList.add(validationSettings.inactiveButtonClass);
  buttonElement.disabled = true
}


export {enableValidation, clearValidation}
