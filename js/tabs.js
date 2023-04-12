import { handlePictureClick } from './img-popup.js';
import { renderPictures } from './pictures.js';
import { debounce } from './utils.js';

const filterSchema = {
  'По умолчанию': 'default',
  'Случайные': 'random',
  'Обсуждаемые': 'pop',
};

const updateActiveTabClass = (tabsMenuElement, tabButtonElement) => {
  tabsMenuElement
    .querySelector('.img-filters__button.img-filters__button--active')
    .classList
    .remove('img-filters__button--active');
  tabButtonElement.classList.add('img-filters__button--active');
};

const removePictures = () => {
  const picturesElements = document.querySelectorAll('.pictures .picture');

  for (const picture of picturesElements) {
    picture.remove();
  }
};

const getFilterPictures = (filter, pictures) => {
  switch(filter) {
    case 'random':
      return pictures.slice().sort(() => Math.random() - 0.5).slice(0,10);
    case 'pop':
      return pictures.slice().sort((a,b) => b.comments.length - a.comments.length);
    default:
      return pictures;
  }
};

function handleTabsClick ({target}, pictures) {
  const tabsMenuElement = target.closest('.img-filters');
  const tabButtonElement = target.closest('.img-filters__button:not(.img-filters__button--active)');

  if (!tabButtonElement) {
    return;
  }

  const filter = filterSchema[tabButtonElement.textContent];
  const filterPictures = getFilterPictures(filter, pictures);
  updateActiveTabClass(tabsMenuElement, tabButtonElement);
  removePictures();
  renderPictures(filterPictures);
}

export const initTabs = (pictures) => {
  const tabsMenuElement = document.querySelector('.img-filters');
  tabsMenuElement.classList.remove('img-filters--inactive');
  renderPictures(pictures, (evt) => handlePictureClick(evt, pictures));
  tabsMenuElement.addEventListener('click', debounce((evt) => handleTabsClick(evt, pictures)));
};
