const defaultScale = 10;
const maxScale = 15;
const minScale = 5;
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

const createSliderElement = (sliderElement) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  sliderElement.setAttribute('disabled', true);
  sliderElement.noUiSlider.on('update', () => {
    const effect = document.querySelector('.effects__item .effects__radio:checked')?.id?.split('-')?.[1] ?? '';
    const imgPreviewElement = document.querySelector('.img-upload__wrapper .img-upload__preview img');
    switch (effect) {
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
  });
};

const changeEffect = (sliderElement, min, max, step, effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    step
  });
  effectState[effect] = effectState[effect] ?? max;
  sliderElement.noUiSlider.set(effectState[effect]);
};

const closePopup = () => {
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  uploadPopupElement.classList.add('hidden');
  document.removeEventListener('keydown', handleClosePopupKeydown);
  uploadPopupElement.querySelector('#upload-cancel').removeEventListener('click', handleClosePopupClick);
  document.body.classList.remove('modal-open');
  const sliderElement = document.querySelector('.effect-level__slider');
  sliderElement.noUiSlider.destroy();
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
  const decrementScaleElement = target.closest('.scale__control--smaller');
  const incrementScaleElement = target.closest('.scale__control--bigger');
  const imgPreviewElement = target.closest('.img-upload__preview-container').querySelector('.img-upload__preview img');

  if (incrementScaleElement && scaleValue < maxScale) {
    scaleValue += 0.5;
  }

  if (decrementScaleElement && scaleValue > minScale) {
    scaleValue -= 0.5;
  }

  scaleValueElement.value = `${(scaleValue - minScale) * 10}%`;
  imgPreviewElement.style.transform = `scale(${scaleValue / 10})`;
}

function handleImgEffectChange ({target}, sliderElement) {
  const imgPreviewElement = target.closest('.img-upload__wrapper').querySelector('.img-upload__preview img');
  const effect = target.id.split('-')?.[1] ?? '';
  switch (effect) {
    case 'none':
      sliderElement.setAttribute('disabled', true);
      changeEffect(sliderElement, 0, 100, 1);
      imgPreviewElement.style.filter = 'none';
      break;
    case 'phobos':
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 0, 300, 3, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100}px)`;
      break;
    case 'heat':
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 100, 300, 2, effect);
      imgPreviewElement.style.filter = `${effectSchema[effect]}(${effectState[effect] / 100})`;
      break;
    default:
      sliderElement.removeAttribute('disabled');
      changeEffect(sliderElement, 0, 100, 1, effect);
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


export function handleUploadFileChange () {
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  openPopup(uploadPopupElement);

  const scaleValueElement = document.querySelector('.scale__control--value');
  scaleValueElement.value = `${(scaleValue - minScale) * 10}%`;
  uploadPopupElement.querySelector('.scale').addEventListener('click', handleScaleClick);

  const sliderElement = document.querySelector('.effect-level__slider');
  createSliderElement(sliderElement);

  const effectsElement = document.querySelector('.effects__list');
  effectsElement.addEventListener('change', (evt) => handleImgEffectChange(evt, sliderElement));

  const orderForm = document.querySelector('.img-upload__form');
  const pristine = createValidator(orderForm);

  orderForm.querySelector('.text__hashtags').addEventListener('change', pristine.validate);
  orderForm.querySelector('.text__description').addEventListener('change', pristine.validate);

  uploadPopupElement.querySelector('#upload-cancel').addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', handleClosePopupKeydown);
}

document.querySelector('#upload-file').addEventListener('change', handleUploadFileChange);
