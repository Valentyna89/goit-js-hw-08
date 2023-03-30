import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form email'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// refs.form.addEventListener('input', e => {
//   formData[e.target.email] = e.target.message;
//   console.log(formData);
// });

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const message = e.target.value;

  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    refs.textarea.value = savedMessage;
    console.log(savedMessage);
  }
}
