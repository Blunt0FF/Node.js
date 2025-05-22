// // Создайте интерфейс `Book`:

// // Определите интерфейс, который описывает книгу. У книги должны быть следующие свойства:
// // `title` (строка) — название книги.
// // `author` (строка) — автор книги.
// // `yearPublished` (число) — год издания.
// // `isAvailable` (булево значение) — доступна ли книга в библиотеке.

// // Напишите функцию `printBookInfo`, которая принимает объект типа `Book` и выводит в консоль всю информацию о книге в следующем формате:

// // Название: <title>
// // Автор: <author>
// // Год издания: <yearPublished>
// // Доступна: <isAvailable
// // Вызов функций:

// // Вызовите функцию `printBookInfo` для каждой книги и выведите книги в консоль.

// // Пример данных:

// //     { title: "1984", author: "George Orwell", yearPublished: 1949, isAvailable: true },
// //     { title: "To Kill a Mockingbird", author: "Harper Lee", yearPublished: 1960, isAvailable: false },
// //     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", yearPublished: 1925, isAvailable: true }

// // interface IBook {
// //     title: string,
// //     author: string,
// //     yearPublished: number,
// //     isAvailable: boolean
// // }

// // const book: IBook = {
// //     title: "Generation P",
// //     author: "V Pelevin",
// //     yearPublished: 2002,
// //     isAvailable: true
// // }


// // const booksList: IBook[] = [{
// //     title: "Generation P",
// //     author: "V Pelevin",
// //     yearPublished: 2002,
// //     isAvailable: true
// // },
// // {
// //     title: "Generation P",
// //     author: "V Pelevin",
// //     yearPublished: 2002,
// //     isAvailable: true
// // },
// // {
// //     title: "Generation P",
// //     author: "V Pelevin",
// //     yearPublished: 2002,
// //     isAvailable: true
// // }]

// // function printBookInfo(books: IBook[]): void {
// //     books.forEach((item:IBook)=> {
// //         console.log(`Title: ${item.title}`);
// //         console.log(`Author: ${item.author}`);
// //         console.log(`yearPublished: ${item.yearPublished}`);

// //     })
// // }

// // printBookInfo(booksList)


// // Задание 2

// // Написание функции с обработкой данных

// // Напишите функцию `division`, которая принимает два числа в качестве параметров и возвращает их частное. Используйте строгую типизацию.

// // Установить TypeScript, создать новый проект и настроить `tsconfig.json`.

// // Установите TypeScript глобально с помощью `npm install -g typescript`.

// // Создайте новый проект инициализацией `npm` с командой `npm init -y`.

// // Установите `typescript` и `ts-node` как зависимости разработки.

// // Настройте `tsconfig.json` с минимально необходимыми параметрами для компиляции.

// // Задание 2

// // Написание функции с обработкой данных

// // Напишите функцию `division`, которая принимает два числа в качестве параметров и возвращает их частное. Используйте строгую типизацию.

// Задание 3

// Интерфейсы для типизации сложных объектов

// Создайте интерфейс `Car`, который описывает автомобиль с полями `make`, `model`, `year`, и `isElectric`.
// Напишите функцию, которая принимает объект типа `Car` и выводит информацию об автомобиле.

function division(a: number, b: number): number {
    return a / b;
}

console.log(division(10, 0));

interface Car {
    brand: string;
    model: string;
    year: number;
    isElectric: boolean;
}

function printCarInfo(car: Car): void {
    console.log(`Марка: ${car.brand}`);
    console.log(`Модель: ${car.model}`);
    console.log(`Год выпуска: ${car.year}`);
    console.log(`Электромобиль: ${car.isElectric ? 'Да' : 'Нет'}`);
}

const myCar: Car = {
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    isElectric: true,
};

printCarInfo(myCar);

// Задание 4

// Работа с массивами и типизацией

// Создайте массив чисел и напишите функцию `calculateSum`, которая принимает массив чисел и возвращает их сумму. Добавьте строгую типизацию.
// Решается через метод reduce

function calculateSum(numbers: number[]): number {
    return numbers.reduce((sum, current) => sum + current, 0);
}

const nums: number[] = [228, 14, 88, 10000];

console.log(`Сумма чисел: ${calculateSum(nums)}`)

// Задание 5

// Проверка типов данных с помощью функций

// Напишите функцию `isAdult`, которая принимает возраст (число) и возвращает `true`, если возраст 18 и больше, и `false` в противном случае. Используйте строгую типизацию.

function isAdult(age: number): boolean {
    return age >= 18;
}

console.log(isAdult(20));
console.log(isAdult(16));

// Задание 6

// Создание и использование интерфейса для описания задачи

// Создайте интерфейс `Task`, который описывает задачу с полями `title`, `description` и `isCompleted`.

// Напишите функцию, которая принимает массив задач и выводит только невыполненные задачи.

// Описание интерфейса задачи
interface Task {
    title: string;
    description: string;
    isCompleted: boolean;
}

// Функция, фильтрующая невыполненные задачи
function showIncompleteTasks(tasks: Task[]): void {
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    incompleteTasks.forEach(task => {
        console.log(`🔹 ${task.title}: ${task.description}`);
    });
}

// Пример массива задач
const tasks: Task[] = [
    { title: "Сделать ДЗ", description: "По TypeScript", isCompleted: false },
    { title: "Помыть посуду", description: "После ужина", isCompleted: true },
    { title: "Пробежка", description: "5 км утром", isCompleted: false },
];

// Вызов функции
showIncompleteTasks(tasks);

//   Задание 7

// Напишите функцию `greet`, которая принимает имя (строка) и возраст (число). 

// Выведите сообщение с приветствием и возрастом.

function greet(name: string, age: number): void {
    console.log(`Привет, ${name}! Тебе ${age} лет.`);
}

// Пример вызова
greet("Кирилл", 228);