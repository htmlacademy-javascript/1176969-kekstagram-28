import './utils.js';
import './api.js';
import './functions.js';
import './pictures.js';
import './img-form.js';
import { getData } from './api.js';
import { errorLoadDataElement } from './alerts.js';
import { initTabs } from './tabs.js';
import { handleUploadFileChange } from './img-form.js';


getData(errorLoadDataElement)
  .then((pictures) => pictures && initTabs(pictures));

document.querySelector('#upload-file').addEventListener('change', handleUploadFileChange);
