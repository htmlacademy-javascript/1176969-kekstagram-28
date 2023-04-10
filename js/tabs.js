import { renderPictures } from './pictures.js';

export const initTabs = (pictures) => {
  const tabsMenuElement = document.querySelector('.img-filters');
  tabsMenuElement.classList.remove('img-filters--inactive');

  renderPictures(pictures);
};
