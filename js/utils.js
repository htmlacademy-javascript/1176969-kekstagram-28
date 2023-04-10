import { DEBOUNCE_TIMEOUT } from './const.js';

/**
 * Сгенериует случайное число от min до max
 *
 * @param  {number} max - Максимальное число
 * @param  {number} min - Минимальное число
 * @return {number}
 */

export const getNumber = (max, min) =>
  Math.round(Math.random() * (max - min) + min);

export const debounce = (callback, timeoutDelay = DEBOUNCE_TIMEOUT) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
