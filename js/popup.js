import { pictures } from './pictures.js';

const closePopup = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', handleClosePopupKeydown);
  document.querySelector('.big-picture__cancel').removeEventListener('click', handleClosePopupClick);
  document.body.classList.remove('modal-open');
};

function handleClosePopupClick () {
  closePopup();
}

function handleClosePopupKeydown ({key}) {
  if (key === 'Escape') {
    closePopup();
  }
}

const commentTeplate = ({id, avatar, name, message}) => (`<li class="social__comment" data-comment-id="${id}">
  <img
    class="social__picture"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
  <p class="social__text">${message}</p>
</li>`);

export const handlePictureClick = ({target}) => {
  if (target?.closest('.picture')) {
    const picture = pictures.find((item) => item.id === Number(target.closest('.picture').dataset.pictureId));

    const popupElement = document.querySelector('.big-picture');
    popupElement.querySelector('.big-picture__img > img').src = picture.url;
    popupElement.querySelector('.likes-count').textContent = picture.likes;
    popupElement.querySelector('.comments-count').textContent = picture.comments.length;
    popupElement.querySelector('.social__caption').textContent = picture.description;

    const commentContainerElement = popupElement.querySelector('.social__comments');
    while (commentContainerElement.lastElementChild) {
      commentContainerElement.removeChild(commentContainerElement.lastElementChild);
    }

    for (const comment of picture.comments) {
      commentContainerElement.insertAdjacentHTML('beforeend', commentTeplate(comment));
    }

    popupElement.querySelector('.social__comment-count').classList.add('hidden');
    popupElement.querySelector('.comments-loader').classList.add('hidden');

    popupElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    popupElement.querySelector('.big-picture__cancel').addEventListener('click', handleClosePopupClick);
    document.addEventListener('keydown', handleClosePopupKeydown);
  }
};


