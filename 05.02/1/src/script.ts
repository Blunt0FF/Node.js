// void - возвращаемое значение явно не определено
function sayMyName(name: string): string {
    return name;
}

const message = sayMyName("Jerry Berry Man");
console.log(message);

const greet = (name: string): string => {
    return name;
};

console.log(greet("Herry Jerry Lemon"));

//ts позволяет заранее указывать типы данных
const myName: string = "Yury";
const age: number = 27;
const myAddress: string = "My address";
const isProgrammer: boolean = true;
const isHungry: boolean = true;

const multiply = (a: number, b: number, c: number) => {
    return a * b * c;
};

console.log(multiply(4, 3, 2));

const obj: { name: string; lastName: string } = {
    name: "Yury",
    lastName: "Arakelov",
};

//interface - используем для описания объектов, с целью обезопасить типизацию
interface IAboutMe {
    name: string;
    lastName: string;
    age: number;
    isProgrammer: boolean;
    greetings: (phrase: string) => string;
}
const infoAboutMe: IAboutMe = {
    name: "Herry",
    lastName: "Priston",
    age: 98,
    isProgrammer: false,
    greetings: (phrase: string) => {
        return phrase;
    },
};

interface IData {
    a: number
    b: number
    display: string
    input?: string
}

function displayData(data: IData) {
    return {
        param1: data.display,
        param2: data.a * data.b,
        param3: data.input
    }
}

const result = displayData({ a: 5, b: 10, display: 'display param', input: 'input param' })
console.log(result)

// Определите интерфейс для объекта с данными пользователя:
//    Имя: `name` (строка)
//    Возраст: `age` (число)
//    Email: `email` (строка)

// Создайте объект, соответствующий этому интерфейсу:

// Создайте переменную `user`, которая будет содержать данные пользователя.

// Напишите функцию, которая принимает объект этого интерфейса в качестве параметра:

// Функция должна принимать объект `User` и выводить данные пользователя в консоль.
// Запустите код, чтобы убедиться, что данные пользователя выводятся правильно.


interface IUser {
    name: string;
    age: number;
    email: string;
}
const user: IUser = {
    name: "Yury",
    age: 47,
    email: "123229@gmail.com",
};
function about(userObj: IUser):void {
    console.log(`Her name is ${userObj.name}, she is ${userObj.age} years old, her email is ${userObj.email}`);
    
}