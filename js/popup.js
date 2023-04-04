import { pictures } from './pictures.js';


const popupElement = document.querySelector('.big-picture');

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

    popupElement.classList.remove('hidden');
  }
};


