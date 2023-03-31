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
    email: refs.input.value,
    message: refs.textarea.value,
  };
  console.log(data);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
});

refs.textarea.addEventListener(
  'input',
  throttle(e => {
    const data = {
      email: refs.input.value,
      message: e.target.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 500)
);

refs.input.addEventListener(
  'input',
  throttle(e => {
    const data = {
      email: e.target.value,
      message: refs.textarea.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 500)
);

const populateFields = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    if (email) {
      refs.input.value = email;
    }
    if (message) {
      refs.textarea.value = message;
    }
  }
};

populateFields();
