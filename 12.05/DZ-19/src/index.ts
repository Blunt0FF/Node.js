// Задание 1
const sumEvenNumbers = (numbers: number[]): number =>
  numbers.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);

console.log("Sum of even numbers:", sumEvenNumbers([1, 2, 3, 4, 5, 6]));

// Задание 2
interface StringToBooleanFunction {
  (str: string): boolean;
}

const isEmptyString: StringToBooleanFunction = (str) => str.trim().length === 0;

console.log("Is empty:", isEmptyString(""));         // true
console.log("Is empty:", isEmptyString("hello"));    // false

// Задание 3
type CompareStrings = (a: string, b: string) => boolean;

const areStringsEqual: CompareStrings = (a, b) => a === b;

console.log("Strings equal:", areStringsEqual("abc", "abc")); // true
console.log("Strings equal:", areStringsEqual("abc", "def")); // false

// Задание 4
function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log("Last element:", getLastElement([1, 2, 3]));
console.log("Last element:", getLastElement(["a", "b", "c"]));

// Задание 5
function makeTriple<T>(a: T, b: T, c: T): T[] {
  return [a, b, c];
}

console.log("Triple:", makeTriple(1, 2, 3));
console.log("Triple:", makeTriple("x", "y", "z"));