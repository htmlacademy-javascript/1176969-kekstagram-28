import './api.js';
import './pictures.js';
import './functions.js';
import './from.js';
import { getData } from './api.js';
import { renderPictures } from './pictures.js';
import { errorLoadDataElement } from './alerts.js';


getData(errorLoadDataElement)
  .then((pictures) => renderPictures(pictures));
