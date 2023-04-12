import './utils.js';
import './api.js';
import './pictures.js';
import './img-form.js';
import { getData } from './api.js';
import { errorLoadDataElement } from './alerts.js';
import { initTabs } from './tabs.js';
import { onUploadFileChange } from './img-form.js';


getData(errorLoadDataElement)
  .then((pictures) => pictures && initTabs(pictures));

document.querySelector('#upload-file').addEventListener('change', onUploadFileChange);
