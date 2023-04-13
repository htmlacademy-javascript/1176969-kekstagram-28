import { MAX_COMMENTS } from './const.js';

const popupElement = document.querySelector('.big-picture');
const commentContainerElement = popupElement.querySelector('.social__comments');

const updatePopup = ({url, likes, comments, description} = {}) => {
  popupElement.querySelector('.big-picture__img > img').src = url ?? '';
  popupElement.querySelector('.big-picture__img > img').alt = description ?? '';
  popupElement.querySelector('.likes-count').textContent = likes ?? '';
  popupElement.querySelector('.comments-count').textContent = comments?.length ?? '';
  popupElement.querySelector('.social__caption').textContent = description ?? '';
};

const clearComments = () => {
  while (commentContainerElement.lastElementChild) {
    commentContainerElement.removeChild(commentContainerElement.lastElementChild);
  }
};

const updateCommentsCount = (count) => {
  const countElement = document.querySelector('.comments-count__open');
  countElement.textContent = count;
};

const getCommentElement = ({id, avatar, name, message}) => {
  const avatarSize = '35';
  const commentWrapperElement = document.createElement('li');
  const commentAvatarElement = document.createElement('img');
  const commentDescriptionElement = document.createElement('p');

  commentWrapperElement.className = 'social__comment';
  commentWrapperElement.dataset.commentId = id;
  commentAvatarElement.className = 'social__picture';
  commentAvatarElement.src = avatar;
  commentAvatarElement.alt = name;
  commentAvatarElement.width = avatarSize;
  commentAvatarElement.height = avatarSize;
  commentDescriptionElement.className = 'social__text';
  commentDescriptionElement.textContent = message;

  commentWrapperElement.appendChild(commentAvatarElement);
  commentWrapperElement.appendChild(commentDescriptionElement);

  return commentWrapperElement;
};

const renderComments = ({comments}) => {
  const loadMoreButton = popupElement.querySelector('.comments-loader').cloneNode(true);
  popupElement.querySelector('.comments-loader').replaceWith(loadMoreButton);

  const commentFragment = new DocumentFragment();
  let index = 0;
  for (let i = index; i < MAX_COMMENTS && i < comments.length; i++) {
    commentFragment.appendChild(getCommentElement(comments[i]));
    index += 1;
  }
  commentContainerElement.appendChild(commentFragment);
  updateCommentsCount(index);

  if (MAX_COMMENTS >= comments.length) {
    loadMoreButton.classList.add('hidden');
    return;
  }

  loadMoreButton.classList.remove('hidden');
  loadMoreButton.addEventListener('click', () => {
    for (let i = index; i < index + MAX_COMMENTS && i < comments.length; i++) {
      commentFragment.appendChild(getCommentElement(comments[i]));
    }
    index += index + MAX_COMMENTS >= comments.length ? comments.length - index : MAX_COMMENTS;
    commentContainerElement.appendChild(commentFragment);
    updateCommentsCount(index);

    if (index >= comments.length) {
      loadMoreButton.classList.add('hidden');
    }
  });
};

const openPopup = () => {
  popupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePopup = () => {
  popupElement.classList.add('hidden');
  document.removeEventListener('keydown', onClosePopupKeydown);
  popupElement.querySelector('.big-picture__cancel').removeEventListener('click', onClosePopupClick);
  document.body.classList.remove('modal-open');
  updatePopup();
};

function onClosePopupClick () {
  closePopup();
}

function onClosePopupKeydown ({key}) {
  if (key === 'Escape') {
    closePopup();
  }
}

export function onPictureClick ({target}, pictures) {
  if (target?.closest('.picture')) {
    const picture = pictures.find((item) => item.id === Number(target.closest('.picture').dataset.pictureId));

    updatePopup(picture);
    clearComments();
    renderComments(picture);
    openPopup();

    popupElement.querySelector('.big-picture__cancel').addEventListener('click', onClosePopupClick);
    document.body.addEventListener('keydown', onClosePopupKeydown);
  }
}
