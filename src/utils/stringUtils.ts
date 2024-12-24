

/**
 * Converts the first character of a string to uppercase and returns the modified string.
 * @param str - The input string.
 * @returns The modified string with the first character capitalized.
 */
export function toCapitalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to camelCase.
 * 
 * @param str - The string to convert.
 * @returns The camelCase version of the input string.
 */
export function toCamelCase(str: string): string {

  let result;
  //check if the string contains any lowercase letters
  const match = RegExp(/[a-z]/).exec(str);

  if (match) {
    // When str contains lowercase letters, it can be converted to camelCase
    if (match.index === 0) {
      // it means that the first letter is lowercase. It's already camelCase
      result = str;
    } else if (match.index === 1) {
      // it means that the second letter is lowercase
      // so we need to convert the first letter to lowercase as well
      const firstCharLower = str.charAt(0).toLowerCase();
      result = firstCharLower + str.slice(1);
    } else {
      // it means that the first letters are uppercase
      let index = match.index - 1;
      const firstPart = str.slice(0, index);
      const rest = str.slice(index);
      result = firstPart.toLowerCase() + rest;
    }
  } else {
    // if no lowercase letters, return the string as lowercase
    result = str.toLowerCase();
  }

  return result;
}

/**
 * Formats a camelCase string into a readable format.
 * 
 * @param str - The camelCase string to format.
 * @returns The formatted string.
 */
export const formatCamelCaseToReadable = (str: string): string => {
  // Split the string into words based on camelCase
  const words = str.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word and join them with spaces
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


/**
 * Checks if a given value is a number.
 * 
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a number or not.
 */
export function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

/**
 * Converts a string to title case.
 * 
 * @param str - The string to convert.
 * @returns The converted string in title case.
 */
export function toTitleCase(str: string) {
  return str
    .replace('-', ' ')
    .replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
}



/**
 * Generates a random string of the specified size.
 * The string will contain a combination of numbers, symbols, uppercase letters, and lowercase letters.
 *
 * @param size - The size of the random string to generate.
 * @returns The randomly generated string.
 */
export function generateRandomString(size: number) {
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+=-';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';

  let result = '';
  result += numbers[Math.floor(Math.random() * numbers.length)];
  result += symbols[Math.floor(Math.random() * symbols.length)];
  result += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  result += lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];

  const allChars = numbers + symbols + upperCaseLetters + lowerCaseLetters;
  for (let i = 4; i < size; i++) {
    result += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle result to ensure requirements are not always at the start of the string
  result = result.split('').sort(() => 0.5 - Math.random()).join('');

  return result;
}
