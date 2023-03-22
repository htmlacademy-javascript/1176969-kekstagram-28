const checkStringLength = (string, lengthSize = 20) =>
  string?.length <= lengthSize;

/*
// Cтрока короче 20 символов
console.log(checkStringLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkStringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkStringLength('проверяемая строка', 10)); // false
*/

const isPalindromeString = (string) => {
  const letters = string?.replace(/\s/g, '').toLowerCase().split('') ?? [];
  return letters.join('') === letters.reverse().join('');
};

/*
// Строка является палиндромом
console.log(isPolindromeString('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPolindromeString('ДовОд')); // true
// Это не палиндром
console.log(isPolindromeString('Кекс'));  // false
// Это палиндром
console.log(isPolindromeString('Лёша на полке клопа нашёл ')); // true
*/

const extractDigits = (primitive) =>
  parseInt(String(primitive).replace(/[^0-9]/g, ''), 10);

/*
console.log(extractDigits('2023 год')); // 2023
console.log(extractDigits('ECMAScript 2022')); // 2022
console.log(extractDigits('1 кефир, 0.5 батона')); // 105
console.log(extractDigits('агент 007')); // 7
console.log(extractDigits('а я томат')); // NaN
console.log(extractDigits(2023)); // 2023
console.log(extractDigits(-1)); // 1
console.log(extractDigits(1.5)); // 15
console.log(extractDigits()); // NaN
*/

const generateString = (string = '', minLength, plusString) => {
  if (string.length >= minLength) {
    return string;
  }

  for (let i = 0; i <= minLength; i++) {
    if (string.length >= minLength) {
      break;
    }
    if (string.length + plusString.length <= minLength) {
      string = plusString + string;
    } else if (string.length + plusString.length > minLength) {
      string = plusString.slice(0, minLength - string.length) + string;
    }
  }

  return string;
};

/*
// Добавочный символ использован один раз
console.log(generateString('1', 2, '0')); // '01'

// Добавочный символ использован три раза
console.log(generateString('1', 4, '0')); // '0001'

// Добавочные символы обрезаны с конца
console.log(generateString('q', 4, 'werty')); // 'werq'

// Добавочные символы использованы полтора раза
console.log(generateString('q', 4, 'we')); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
console.log(generateString('qwerty', 4, '0')); // 'qwerty'
 */
