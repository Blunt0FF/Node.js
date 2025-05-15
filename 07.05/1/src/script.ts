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

function random1(): void {
    console.log("random");
}

function throwError(message: string): never {
    throw new Error(message)
}

random1()

console.log(
    throwError("string"))

// Напишите функцию, которая принимает строку и что-то делает

function random(): void {
    console.log("random");
}

function errorFn(message: string): never {
    throw new Error(message);
}

// This line demonstrates the never type in action
// console.log(errorFn("string")); // Uncomment to see error thrown

const arrNums: number[] = [1, 4, 6, 8, 13];
// arrNums.push('hello'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

function countArr(arr: number[]): number {
    return arr.reduce((prev, curr) => prev + curr, 0);
}

console.log(countArr([1, 3, 45]));



const tuple: [number, number, number, string] = [43, 44, 55, "hello"]
console.log(tuple);


// Объявите объект с несколькими свойствами разных типов данных и напишите функцию, которая принимает этот объект в качестве параметра:

// Создайте объект book, который содержит свойства title (строка), author (строка), и pages (число).
// Напишите функцию describeBook, которая принимает объект book и возвращает строку с описанием книги.

// Создайте массив с явно указанным типом элементов


interface Book {
    title: string;
    author: string;
    pages: number;
}

const myBook: Book = {
    title: "Vibe",
    author: "Kreal",
    pages: 30
};

function describeBook(book: Book): string {
    return The book is '${book.title}' by ${ book.author } and it has ${ book.pages } pages.;
}

console.log(describeBook(myBook));

// Объявите массив строк fruits, содержащий названия нескольких фруктов.

const fruits: string[] = ['Banane', 'Apple']

fruits.forEach(fruit => {
    console.log(fruit);

})
// Создайте кортеж, который содержит строку и число, и напишите функцию, которая принимает этот кортеж как параметр и выводит его элементы в консоль:
const arr: [string, number] = ['hello', 33,]
console.log(arr);

// Создайте кортеж person, который содержит имя человека (строка) и его возраст (число).

const person: [string, number] = ["Boris", 27]
console.log(person);


// Напишите функцию displayPerson, которая принимает этот кортеж и выводит имя и возраст в консоль.

function displayPerson(person: [string, number]): void {
    const [string, number] = person;
    console.log('His name is ${ string } and his is age ${ number }');

}
displayPerson(person)