export const checkStringLength = (string, lengthSize = 20) =>
  string?.length <= lengthSize;


export const isPalindromeString = (string) => {
  const letters = string?.replace(/\s/g, '').toLowerCase().split('') ?? [];
  return letters.join('') === letters.reverse().join('');
};

export const extractDigits = (primitive) =>
  parseInt(String(primitive).replace(/[^0-9]/g, ''), 10);

export const generateString = (string = '', minLength, plusString) => {
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
