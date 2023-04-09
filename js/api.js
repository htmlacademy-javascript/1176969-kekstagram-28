const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const load = (onMessageError) => fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => response.json())
  .catch(onMessageError);

export const getData = (onMessageError) => load(onMessageError);

// отправка данных
// https://28.javascript.pages.academy/kekstagram
