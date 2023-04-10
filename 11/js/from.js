import { sendData } from './api.js';
import { errorFormDataElement, loadingElement } from './alerts.js';

const defaultScale = 100;
const maxScale = 100;
const minScale = 25;
let scaleValue = defaultScale;

const effectSchema = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const effectState = {};

const openPopup = (uploadPopupElement) => {
  uploadPopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const updateEffectLevelValue = (effect) => {
  const levelInputElement = document.querySelector('.effect-level__value');
  if (levelInputElement) {
    levelInputElement.value = effectState[effect];
  }
};

const createSliderElement = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 10,
    connect: 'lower',
    format: {
      to: function (value) {
        return parseFloat(value);
      },
      from: function (value) {
        return value;
      },
    },
  });
  sliderElement.setAttribute('disabled', true);
  sliderElement.noUiSlider.on('update', () => {
    const effect = document.querySelector('.effects__item .effects__radio:checked')?.id?.split('-')?.[1] ?? '';
    const imgPreviewElement = document.querySelector('.img-upload__wrapper .img-upload__preview img');
    switch (effect) {
      case 'marvin':
        imgPreviewElement.style.filter = `${effectSchema[effect]}(${sliderElement.noUiSlider.get()}%)`;
        break;
      case 'phobos':
        imgPreviewElement.style.filter = `${effectSchema[effect]}(${sliderElement.noUiSlider.get() / 100}px)`;
        break;
      case 'heat':
        imgPreviewElement.style.filter = `${effectSchema[effect]}(${sliderElement.noUiSlider.get() / 100})`;
        break;
      default:
        imgPreviewElement.style.filter = `${effectSchema[effect]}(${sliderElement.noUiSlider.get() / 100})`;
    }
  });
  sliderElement.noUiSlider.on('change', () => {
    const effect = document.querySelector('.effects__item .effects__radio:checked').id.split('-')?.[1] ?? '';
    effectState[effect] = sliderElement.noUiSlider.get();
    updateEffectLevelValue(effect);
  });
};

const changeEffect = (sliderElement, min, max, step, effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    step
  });
  effectState[effect] = effectState[effect] ?? max;
  sliderElement.noUiSlider.set(effectState[effect]);
  updateEffectLevelValue(effect);
};

const clearEffectState = () => {
  for (const effect in effectState) {
    delete effectState[effect];
  }
};

const resetUploadForm = () => {
  const formElement = document.querySelector('#upload-select-image');
  formElement.reset();
};

const resetImgElement = () => {
  const imgElement = document.querySelector('.img-upload__preview img');
  imgElement.className = '';
  imgElement.style.filter = 'none';
  imgElement.style.transform = 'none';
};

const resetForm = () => {
  const sliderElement = document.querySelector('.effect-level__slider');
  sliderElement.noUiSlider.destroy();

  scaleValue = defaultScale;
  resetImgElement();
  clearEffectState();
  resetUploadForm();
};

const closePopup = () => {
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  uploadPopupElement.classList.add('hidden');
  document.removeEventListener('keydown', handleClosePopupKeydown);
  uploadPopupElement.querySelector('#upload-cancel').removeEventListener('click', handleClosePopupClick);
  document.body.classList.remove('modal-open');
  resetForm();
};

const formErrorMessage = {};
const setHastagsErrorMessage = (message) => {
  formErrorMessage['hastag'] = message;
};
const getHastagsErrorMessage = () => formErrorMessage.hastag;

const createValidator = (orderForm) => {
  const pristine = new Pristine(orderForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  }, false);

  pristine.addValidator(
    orderForm.querySelector('.text__hashtags'),
    handleHashtagValidate,
    getHastagsErrorMessage
  );

  pristine.addValidator(
    orderForm.querySelector('.text__description'),
    handleDescriptionValidate,
    'Комментарий длиннее 140 символов'
  );

  return pristine;
};

function handleClosePopupClick () {
  closePopup();
}

function handleClosePopupKeydown ({key}) {
  const activeElementAttribute = document.activeElement?.getAttribute('name');
  if (key === 'Escape' && activeElementAttribute !== 'hashtags' && activeElementAttribute !== 'description') {
    closePopup();
  }
}

function handleScaleClick ({target}) {
  const scaleValueElement = target.closest('.scale').querySelector('.scale__control--value');
  const incrementScaleElement = target.closest('.scale__control--bigger');
  const decrementScaleElement = target.closest('.scale__control--smaller');
  const imgPreviewElement = target.closest('.img-upload__preview-container').querySelector('.img-upload__preview img');

  if (incrementScaleElement && scaleValue < maxScale) {
    scaleValue += minScale;
  }

  if (decrementScaleElement && scaleValue > minScale) {
    scaleValue -= minScale;
  }

  scaleValueElement.value = `${(scaleValue)}%`;
  imgPreviewElement.style.transform = `scale(${scaleValue / 100})`;
}

function handleImgEffectChange ({target}, sliderElement) {
  const imgPreviewElement = target.closest('.img-upload__wrapper').querySelector('.img-upload__preview img');
  const effect = target.id.split('-')?.[1] ?? '';

  if (imgPreviewElement.className !== '') {
    imgPreviewElement.classList.replace(imgPreviewElement.className, `effects__preview--${effect}`);
  } else if (imgPreviewElement.className === '') {
    imgPreviewElement.classList.add(`effects__preview--${effect}`);
  }

  switch (effect) {
    case 'none':
      sliderElement.setAttribute('disabled', true);
      changeEffect(sliderElement, 0, 100, 10);
      imgPreviewElement.style.filter = 'none';
      imgPreviewElement.className = '';
      break;
    case 'marvin':
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 0, 100, 1, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect]}%)`;
      break;
    case 'phobos':
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 0, 300, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100}px)`;
      break;
    case 'heat':
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 100, 300, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100})`;
      break;
    default:
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 0, 100, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100})`;
  }
}

function handleHashtagValidate (value) {
  if (value === '') {
    return true;
  }
  const hashtags = value?.toLowerCase().trim().split(' ');
  if (hashtags.filter((item, index) => hashtags.indexOf(item) !== index).length > 0) {
    const hastag = hashtags.filter((item, index) => hashtags.indexOf(item) !== index)[0];
    setHastagsErrorMessage(`Хэш-тег ${hastag} использован дважды`);
    return false;
  }

  for (const hashtag of hashtags) {
    if (!/^#/.test(hashtag)) {
      setHastagsErrorMessage('Хэш-тег должен начинаться символом #');
      return false;
    }

    if (!/^#./.test(hashtag)) {
      setHastagsErrorMessage('Хеш-тег не может состоять только из одной решётки');
      return false;
    }

    if (!/^#[0-9A-ZА-ЯЁ]+$/i.test(hashtag)) {
      setHastagsErrorMessage('В хэш-теге используются не только буквы и числа');
      return false;
    }

    if (hashtag.length > 20) {
      setHastagsErrorMessage('Максимальная длина хэш-тега 20 символов');
      return false;
    }
  }

  if (hashtags.length > 5) {
    setHastagsErrorMessage('Не больше 5 хеш-тегов');
    return false;
  }
  setHastagsErrorMessage('');
  return true;
}

function handleDescriptionValidate (value) {
  return value.length <= 140;
}

function handleFormSubmit (evt, validate) {
  evt.preventDefault();
  if (validate()) {
    loadingElement.render();
    sendData(errorFormDataElement, new FormData(evt.target))
      .then((response) => {
        if (response) {
          closePopup();
        }
      });
  }
}

export function handleUploadFileChange () {
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  openPopup(uploadPopupElement);

  const scaleValueElement = document.querySelector('.scale__control--value');
  scaleValueElement.value = `${(scaleValue)}%`;
  uploadPopupElement.querySelector('.scale').addEventListener('click', handleScaleClick);

  const sliderElement = document.querySelector('.effect-level__slider');
  createSliderElement(sliderElement);

  const effectsElement = document.querySelector('.effects__list');
  effectsElement.addEventListener('change', (evt) => handleImgEffectChange(evt, sliderElement));

  const orderForm = document.querySelector('.img-upload__form');
  const pristine = createValidator(orderForm);

  orderForm.querySelector('.text__hashtags').addEventListener('change', pristine.validate);
  orderForm.querySelector('.text__description').addEventListener('change', pristine.validate);

  orderForm.addEventListener('submit', (evt) => handleFormSubmit(evt, pristine.validate));

  uploadPopupElement.querySelector('#upload-cancel').addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', handleClosePopupKeydown);
}

document.querySelector('#upload-file').addEventListener('change', handleUploadFileChange);
