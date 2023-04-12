import { sendData } from './api.js';
import { errorFormDataElement, loadingElement } from './alerts.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;
let scaleValue = DEFAULT_SCALE;

const effectSchema = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const fileTypes = [
  'image/bmp',
  'image/jpeg',
  'image/png',
];

const effectState = {};


const orderForm = document.querySelector('.img-upload__form');

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

  scaleValue = DEFAULT_SCALE;
  resetImgElement();
  clearEffectState();
  resetUploadForm();
};

const closePopup = () => {
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  uploadPopupElement.classList.add('hidden');
  document.removeEventListener('keydown', onClosePopupKeydown);
  uploadPopupElement.querySelector('#upload-cancel').removeEventListener('click', onClosePopupClick);
  document.body.classList.remove('modal-open');
  orderForm.removeEventListener('submit', onFormSubmit);
  resetForm();
};

const formErrorMessage = {};
const setHastagsErrorMessage = (message) => {
  formErrorMessage['hastag'] = message;
};
const getHastagsErrorMessage = () => formErrorMessage.hastag;

const createValidator = () => {
  const pristine = new Pristine(orderForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'form__error'
  }, false);

  pristine.addValidator(
    orderForm.querySelector('.text__hashtags'),
    onHashtagValidate,
    getHastagsErrorMessage
  );

  pristine.addValidator(
    orderForm.querySelector('.text__description'),
    onDescriptionValidate,
    'Комментарий длиннее 140 символов'
  );

  return pristine;
};

const pristineValidator = createValidator(orderForm);

const validImgType = (file) => fileTypes.includes(file?.type);

const displaySliderElement = (sliderElement, isVisible) => {
  if (isVisible) {
    sliderElement.closest('.effect-level').classList.remove('hidden');
  } else if (!isVisible) {
    sliderElement.closest('.effect-level').classList.add('hidden');
  }
};

function onClosePopupClick () {
  closePopup();
}

function onClosePopupKeydown ({key}) {
  const activeElementAttribute = document.activeElement?.getAttribute('name');
  if (key === 'Escape'
      && activeElementAttribute !== 'hashtags'
      && activeElementAttribute !== 'description'
      && !document.querySelector('.error')) {
    closePopup();
  }
}

function onScaleClick ({target}) {
  const scaleValueElement = target.closest('.scale').querySelector('.scale__control--value');
  const incrementScaleElement = target.closest('.scale__control--bigger');
  const decrementScaleElement = target.closest('.scale__control--smaller');
  const imgPreviewElement = target.closest('.img-upload__preview-container').querySelector('.img-upload__preview img');

  if (incrementScaleElement && scaleValue < MAX_SCALE) {
    scaleValue += MIN_SCALE;
  }

  if (decrementScaleElement && scaleValue > MIN_SCALE) {
    scaleValue -= MIN_SCALE;
  }

  scaleValueElement.value = `${(scaleValue)}%`;
  imgPreviewElement.style.transform = `scale(${scaleValue / 100})`;
}

function onImgEffectChange ({target}, sliderElement) {
  const imgPreviewElement = target.closest('.img-upload__wrapper').querySelector('.img-upload__preview img');
  const effect = target.id.split('-')?.[1] ?? '';

  if (imgPreviewElement.className !== '') {
    imgPreviewElement.classList.replace(imgPreviewElement.className, `effects__preview--${effect}`);
  } else if (imgPreviewElement.className === '') {
    imgPreviewElement.classList.add(`effects__preview--${effect}`);
  }

  switch (effect) {
    case 'none':
      displaySliderElement(sliderElement, false);
      changeEffect(sliderElement, 0, 100, 10);
      imgPreviewElement.style.filter = 'none';
      imgPreviewElement.className = '';
      break;
    case 'marvin':
      displaySliderElement(sliderElement, true);
      changeEffect(sliderElement, 0, 100, 1, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect]}%)`;
      break;
    case 'phobos':
      displaySliderElement(sliderElement, true);
      changeEffect(sliderElement, 0, 300, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100}px)`;
      break;
    case 'heat':
      displaySliderElement(sliderElement, true);
      changeEffect(sliderElement, 100, 300, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100})`;
      break;
    default:
      displaySliderElement(sliderElement, true);
      changeEffect(sliderElement, 0, 100, 10, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100})`;
  }
}

function onHashtagValidate (value) {
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

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      setHastagsErrorMessage('Максимальная длина хэш-тега 20 символов');
      return false;
    }
  }

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    setHastagsErrorMessage('Не больше 5 хеш-тегов');
    return false;
  }
  setHastagsErrorMessage('');
  return true;
}

function onDescriptionValidate (value) {
  return value.length <= MAX_DESCRIPTION_LENGTH;
}

function onFormSubmit (evt) {
  evt.preventDefault();
  if (pristineValidator.validate()) {
    loadingElement.render();
    sendData(errorFormDataElement, new FormData(evt.target))
      .then((response) => {
        if (response) {
          closePopup();
        }
      });
  }
}

export function onUploadFileChange ({target}) {
  const file = target.files?.[0];

  if (!validImgType(file)) {
    resetUploadForm();
    return;
  }

  const uploadImgElement = document.querySelector('.img-upload__overlay img');
  uploadImgElement.src = URL.createObjectURL(file);

  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  openPopup(uploadPopupElement);

  const scaleValueElement = document.querySelector('.scale__control--value');
  scaleValueElement.value = `${(scaleValue)}%`;
  uploadPopupElement.querySelector('.scale').addEventListener('click', onScaleClick);

  const sliderElement = document.querySelector('.effect-level__slider');
  createSliderElement(sliderElement);

  const effectsElement = document.querySelector('.effects__list');
  effectsElement.addEventListener('change', (evt) => onImgEffectChange(evt, sliderElement));
  displaySliderElement(sliderElement, false);

  orderForm.querySelector('.text__hashtags').addEventListener('change', pristineValidator.validate);
  orderForm.querySelector('.text__description').addEventListener('change', pristineValidator.validate);

  orderForm.addEventListener('submit', onFormSubmit);

  uploadPopupElement.querySelector('#upload-cancel').addEventListener('click', onClosePopupClick);
  document.body.addEventListener('keydown', onClosePopupKeydown);
}
