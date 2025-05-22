// Создайте функцию, которая не возвращает значения (`void`) и выполняет простую задачу:

// Напишите функцию, которая принимает строку и выводит её в консоль. Убедитесь, что функция не возвращает никакого значения.

// Напишите пример функции, которая использует тип `never`:

// Создайте функцию, которая выбрасывает исключение (ошибку) с переданным сообщением.

// Объявите объект с несколькими свойствами разных типов данных и напишите функцию, которая принимает этот объект в качестве параметра:

// Создайте объект `book`, который содержит свойства `title` (строка), `author` (строка), и `pages` (число).
// Напишите функцию `describeBook`, которая принимает объект `book` и возвращает строку с описанием книги.

// Создайте массив с явно указанным типом элементов

// Объявите массив строк `fruits`, содержащий названия нескольких фруктов.

// Создайте кортеж, который содержит строку и число, и напишите функцию, которая принимает этот кортеж как параметр и выводит его элементы в консоль:

// Создайте кортеж `person`, который содержит имя человека (строка) и его возраст (число).
// Напишите функцию `displayPerson`, которая принимает этот кортеж и выводит имя и возраст в консоль.

type Book = {
    title: string;
    author: string;
    pages: number;
};

const book: Book = {
    title: "1984",
    author: "George Orwell",
    pages: 328
};

function describeBook(book: Book): string {
    return `Книга "${book.title}", автор: ${book.author}, страниц: ${book.pages}`;
}

console.log(describeBook(book));

const fruits: string[] = ["apple", "banana", "orange", "kiwi"];

console.log(fruits);

type Person = [string, number];

const person: Person = ["Alice", 30];

function displayPerson(person: Person): void {
    const [name, age] = person;
    console.log(`Имя: ${name}, возраст: ${age}`);
}

displayPerson(person);

// Типизация массива с числами

// Создайте массив чисел `scores`, представляющий результаты тестов студентов. Напишите функцию `averageScore`, которая принимает этот массив и возвращает средний балл.

// Используем метод редьюс, средний бал высчитывается по формуле сумма на длинну массива

const scores: number[] = [14, 88, 96, 28, 17];

function averageScore(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
}

console.log(averageScore(scores));

// Создайте кортеж `personInfo`, который содержит имя (строка) и возраст (число).
// Затем напишите функцию `printPersonInfo`, которая принимает этот кортеж как параметр и выводит его элементы в консоль.

type PersonInfo = [string, number];
const personInfo: PersonInfo = ["Kirill", 28];

function printPersonInfo(info: PersonInfo): void {
    const [name, age] = info;
    console.log(`Имя: ${name}`);
    console.log(`Возраст: ${age}`);
}

printPersonInfo(personInfo);

// Массив объектов

// Создайте массив объектов `products`, где каждый объект описывает товар и содержит следующие свойства: `name` (строка), `price` (число), и `inStock` (булево значение). Напишите функцию `listAvailableProducts`, которая принимает этот массив и выводит названия товаров, которые есть в наличии.

interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

const products: Product[] = [
    { name: "Laptop", price: 1200, inStock: true },
    { name: "Smartphone", price: 800, inStock: false },
    { name: "Headphones", price: 150, inStock: true },
    { name: "Monitor", price: 300, inStock: false }
];

function listAvailableProducts(products: Product[]): void {
    products
        .filter(product => product.inStock)
        .forEach(product => console.log(product.name));
}

listAvailableProducts(products);

// Обработка неизвестного типа

// Создайте переменную `data` типа `unknown`, которая может принимать значения разных типов.
// Напишите функцию `processData`, которая принимает эту переменную и проверяет ее тип.
// Если это строка, функция должна вернуть её длину.
// Если это число, функция должна вернуть его квадрат. В любом другом случае функция должна вернуть `null`.

let data: unknown;

function processData(input: unknown): number | null {
    if (typeof input === "string") {
        return input.length;
    } else if (typeof input === "number") {
        return input * input;
    } else {
        return null;
    }
}

// Примеры использования
data = "Hello";
console.log(processData(data)); // 5

data = 7;
console.log(processData(data)); // 49

data = true;
console.log(processData(data)); // null


// Функция с типом `void` и `never`

// Напишите функцию `logMessage`, которая принимает строку `message` и выводит её в консоль, не возвращая никакого значения (используйте тип `void`).
// Затем напишите функцию `throwError`, которая принимает строку `errorMessage`, выбрасывает исключение с этим сообщением и имеет тип `never`.
// Never используется когда функция пробрасывает throw new error


function logMessage(message: string): void {
    console.log(message);
}


function throwError(errorMessage: string): never {
    throw new Error(errorMessage);
}


logMessage("Программа запущена");

// throwError("Что-то пошло не так")

// Создать массив объектов, функция должна вернуть массив строк, полученных чисто из значений объектов
// Использовать статистическое свойство объекта Object.values

interface Item {
    id: number;
    name: string;
  }

const items = [
    { id: 1, name: "Something" },
    { id: 2, name: "Another one" },
    { id: 3, name: "Box" }
  ];
  

  function extractValuesAsStrings(arr: object[]): string[] {
    return arr.flatMap(obj =>
      Object.values(obj).map(value => String(value))
    );
  }

  const result = extractValuesAsStrings(items);
  console.log(result); 