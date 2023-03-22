/**
 * Сгенериует случайное число от min до max
 *
 * @param  {number} max - Максимальное число
 * @param  {number} min - Минимальное число
 * @return {number}
 */

export const getNumber = (max, min) =>
  Math.round(Math.random() * (max - min) + min);
