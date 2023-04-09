export const showDataErrorMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
  errorElement.querySelector('.error__button').remove();
  errorElement.onclick = () => location.reload();
  const mainElement = document.querySelector('main');
  mainElement.appendChild(errorElement);
};

