import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputchange, 500));
form.addEventListener('submit', onSubmitClick);

checkStorageContent();

function onInputchange(e) {
  const formData = {
    email: form.email.value,
    message: form.message.value,
  };

  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

function onSubmitClick(e) {
  e.preventDefault();

  const formData = {
    email: form.email.value,
    message: form.message.value,
  };
  
  if (formData.email === '' || formData.message === '') {
    alert('Enter email and message!');
    return;
  }

  console.log(formData);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function checkStorageContent() {
  const storedData = localStorage.getItem(STORAGE_KEY);

  if (storedData) {
    const formData = JSON.parse(storedData);
    form.email.value = formData.email;
    form.message.value = formData.message;
  }
}
