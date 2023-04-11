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

const load = async (messageError, route = Route.GET_DATA, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});
    if (response.ok) {
      loadingElement.remove();
      if (response.ok) {
        if (!/data/.test(response.url)) {
          successElement.render();
        }
        return response.json();
      }
      messageError.render();
    } else if (!response.ok) {
      loadingElement.remove();
      messageError.render();
    }
  } catch (e) {
    loadingElement.remove();
    messageError.render();
  }
};

const getData = (messageError) => load(messageError);

const sendData = (messageError, body) => load(messageError, Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
