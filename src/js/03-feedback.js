import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('[type="email"]'),
  textarea: document.querySelector('[name="message"]'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    message: refs.textarea.value,
    email: refs.input.value,
  };
  console.log(data);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
});

refs.textarea.addEventListener(
  'input',
  throttle(e => {
    const data = {
      message: e.target.value,
      email: refs.input.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 500)
);

refs.input.addEventListener(
  'input',
  throttle(e => {
    const data = {
      message: refs.textarea.value,
      email: e.target.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 500)
);

const populateFields = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { message, email } = JSON.parse(savedData);
    if (message) {
      refs.textarea.value = message;
    }
    if (email) {
      refs.input.value = email;
    }
  }
};

populateFields();
