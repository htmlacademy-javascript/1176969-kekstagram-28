import './api.js';
import './pictures.js';
import './functions.js';
import './from.js';
import { getData } from './api.js';
import { errorLoadDataElement } from './alerts.js';
import { initTabs } from './tabs.js';


getData(errorLoadDataElement)
  .then((pictures) => initTabs(pictures));
