import { loadingElement, successElement } from './alerts.js';

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (messageError, route = Route.GET_DATA, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => {
    loadingElement.remove();
    if (response.ok) {
      if (!/data/.test(response.url)) {
        successElement.render();
      }
      return response.json();
    }

    messageError.render();
  })
  .catch(messageError.render);

const getData = (messageError) => load(messageError);

const sendData = (messageError, body) => load(messageError, Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
