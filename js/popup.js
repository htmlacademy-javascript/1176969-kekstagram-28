import { pictures } from './pictures.js';

const commentTeplate = ({id, avatar, name, message}) => (`<li class="social__comment" data-comment-id="${id}">
  <img
    class="social__picture"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
  <p class="social__text">${message}</p>
</li>`);

const updatePopup = (popupElement, {url, likes, comments, description} = {}) => {
  popupElement.querySelector('.big-picture__img > img').src = url ?? '';
  popupElement.querySelector('.big-picture__img > img').alt = description ?? '';
  popupElement.querySelector('.likes-count').textContent = likes ?? '';
  popupElement.querySelector('.comments-count').textContent = comments?.length ?? '';
  popupElement.querySelector('.social__caption').textContent = description ?? '';
};

const clearComments = (popupElement) => {
  const commentContainerElement = popupElement.querySelector('.social__comments');
  while (commentContainerElement.lastElementChild) {
    commentContainerElement.removeChild(commentContainerElement.lastElementChild);
  }
};

const renderComments = (popupElement, {comments}) => {
  const commentContainerElement = popupElement.querySelector('.social__comments');
  for (const comment of comments) {
    commentContainerElement.insertAdjacentHTML('beforeend', commentTeplate(comment));
  }
};

const openPopup = (popupElement) => {
  popupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePopup = () => {
  const popupElement = document.querySelector('.big-picture');
  popupElement.classList.add('hidden');
  document.removeEventListener('keydown', handleClosePopupKeydown);
  popupElement.querySelector('.big-picture__cancel').removeEventListener('click', handleClosePopupClick);
  document.body.classList.remove('modal-open');
  updatePopup(popupElement);
};

function handleClosePopupClick () {
  closePopup();
}

function handleClosePopupKeydown ({key}) {
  if (key === 'Escape') {
    closePopup();
  }
}

export const handlePictureClick = ({target}) => {
  if (target?.closest('.picture')) {
    const picture = pictures.find((item) => item.id === Number(target.closest('.picture').dataset.pictureId));
    const popupElement = document.querySelector('.big-picture');

    updatePopup(popupElement, picture);
    clearComments(popupElement);
    renderComments(popupElement, picture);

    // popupElement.querySelector('.social__comment-count').classList.add('hidden');
    // popupElement.querySelector('.comments-loader').classList.add('hidden');

    openPopup(popupElement);

    popupElement.querySelector('.big-picture__cancel').addEventListener('click', handleClosePopupClick);
    document.addEventListener('keydown', handleClosePopupKeydown);
  }
};


