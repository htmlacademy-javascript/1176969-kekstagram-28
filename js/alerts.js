export const errorLoadDataElement = {
  mainElement: document.querySelector('main'),
  element: document.querySelector('#error').content.querySelector('.error').cloneNode(true),
  render() {
    this.element.querySelector('.error__title').textContent = 'Ошибка загрузки данных';
    this.element.querySelector('.error__button').remove();
    this.element.onclick = () => location.reload();
    this.mainElement.appendChild(this.element);
  },
  remove() {
    this.element.remove();
  },
};

export const loadingElement = {
  mainElement: document.querySelector('main'),
  element: document.querySelector('#messages').content.querySelector('.img-upload__message--loading').cloneNode(true),
  render() {
    this.mainElement.appendChild(this.element);
  },
  remove() {
    this.element.remove();
  },
};

export const successElement = {
  mainElement: document.querySelector('main'),
  element: document.querySelector('#success').content.querySelector('.success').cloneNode(true),
  handleEscKeydown({key}) {
    if (key === 'Escape') {
      successElement.remove();
    }
  },
  render() {
    this.element.querySelector('.success__button').onclick = () => this.remove();
    this.element.addEventListener('click', ({target}) => {
      if (!target.closest('.success__inner')) {
        this.remove();
      }
    });
    document.body.addEventListener('keydown', this.handleEscKeydown);
    this.mainElement.appendChild(this.element);
  },
  remove() {
    document.body.removeEventListener('keydown', this.handleEscKeydown);
    successElement.element.remove();
  },
};

export const errorFormDataElement = {
  mainElement: document.querySelector('main'),
  element: document.querySelector('#error').content.querySelector('.error').cloneNode(true),
  render() {
    this.element.onclick = () => this.remove();
    this.mainElement.appendChild(this.element);
  },
  remove() {
    this.element.remove();
  },
};
