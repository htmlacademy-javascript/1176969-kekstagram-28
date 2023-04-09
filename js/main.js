import './api.js';
import './pictures.js';
import './functions.js';
import './from.js';
import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { showDataErrorMessage } from './errors.js';


getData(showDataErrorMessage)
  .then((pictures) => renderPictures(pictures));
