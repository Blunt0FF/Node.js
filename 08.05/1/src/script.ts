let result1: string | number;
result1 = 10;
result1 = 'hello';
//error
// result1 = false
// console.log(result1);

function bound(param: string | number): string | number {
    if (typeof param === 'string' && param.length > 10) {
        return param + ' Here it is';
    }
    if (typeof param === 'number') {
        return param + 1000;
    }
    return 'param doesnt have required length';
}

console.log(bound('heh'));

// type str = string
// const value: str = 'hello'
// type Person = {
//     name: string
// }

// type MoreInfo = {
//     age: number,
//     lastName: string
// }

// type UnitedInfo = Person & MoreInfo

// const obj: UnitedInfo = {
//     age: 99,
//     name: 'name',
//     lastName: 'jujujuju'
// }

// Создайте переменную, которая может быть либо строкой, либо числом. Затем напишите функцию, которая обрабатывает и выводит длину строки или умножает число на 2.

let result2: string | number = 28;

function sum(param: string | number): string | number {
    if (typeof param === "string") {
        return param.length;
    } else if (typeof param === "number") {
        return param * 2;
    }
    return param;
}

console.log(sum(result2));

// Напишите пример пересечения типов. Создайте два типа: Person и Employee, затем создайте объект, который объединяет свойства этих двух типов.

type PersonX = {
    name: string,
    age: number
};

type EmployeeX = {
    lastName: string,
    city: string
};

type Human = EmployeeX & PersonX;

const objX: Human = {
    name: "Boris",
    age: 28,
    lastName: "Jon",
    city: "Düss"
};

console.log(objX);

type Address = {
    city: string
    street: string
    zip: number
};

type User = {
    name: string,
    age: number,
    address: Address
};

interface IAdditionalParams {
    moreDetails: string
}

interface IAddress {
    city: string
    street: string
    zip: number
}

interface IUser extends IAdditionalParams {
    name: string
    age: string
    address: IAddress
}

interface IUser2 {
    name: string
    age: string
    //?
    address?: IAddress
}

const infoAboutUser: IUser2 = {
    name: 'HHH',
    age: '77'
};

console.log(infoAboutUser?.address?.city);

type NewUser = {
    readonly id: number,
    name: string,
};

const newObj: NewUser = {
    id: 1,
    name: 'Yorgen'
};

// будет ошибка. нельзя переназначить значение к ридонли свойству
// newObj.id = 2;
newObj.name = 'new name';

const arr: string[] = ['hello', 'hellsa', 'world', 'earth'];

const userArr: NewUser[] = [
    {
        id: 1,
        name: 'Yorgen',
    },
    {
        id: 2,
        name: 'Yorgen2'
    },
    {
        id: 3,
        name: 'Yorgen3'
    }
];

const tuples: [string, number, boolean, string] = ['hello', 88, false, 'kekek'];

// Создайте объект "User" с вложенными объектами, например, адрес с полями улица и город. Напишите функцию, которая выводит полную информацию о пользователе.

type Address2 = {
    city: string,
    street: string
};

type User2 = {
    name: string,
    age?: number,
    address: Address2
};

const myAddress: User2 = {
    name: 'ghays',
    address: {
        city: "odessa",
        street: 'chaikovctaya 4'
    }
};

function ghyasUser(user: User2): void {
    console.log(user);
}

ghyasUser(myAddress);

interface IProduct {
    name: string,
    price: number,
    readonly id: number
    description?: string
}

const productArr: IProduct[] = [
    {
        id: 1, name: 'apple', price: 20
    },
    {
        id: 2, name: 'banana', price: 30, description: 'this is banana'
    }
];

function displayProduct(product: IProduct[]): void {
    product.forEach((product) => {
        console.log(`name: ${product.name}, price:${product.price}, ${product.description ? product.description : 'no description'}`);
    });
}

displayProduct(productArr);

// Определите интерфейс для объекта "Product", который имеет поля название (строка), цена (число) и категория (строка). Напишите функцию, принимающую объект этого типа и выводящую его свойства.

// Измените интерфейс так, чтобы поле категории было опциональным.

interface IProduct1 {
    name: string
    price: number
    category?: string
}

function printProduct(product: IProduct1): string {
    return `Name: ${product.name};\n\nPrice: ${product.price};\n\nCategory: ${product.category}`;
}

console.log(printProduct({ name: "Phone", price: 1000 }));

interface IDescription {
    title: string
    description: string
}

interface IAdditionalInfo {
    // [key: string]: any
    fullName: string
    handler: (param: string | number) => void
}

interface IFullInfo extends IAdditionalInfo {
    username: string
    name: string
    isAuth: boolean
    fullInfo: IDescription | null
}

// Создайте два интерфейса: "Person" с полями имя и возраст, и "Employee" с полем должность. Расширьте интерфейс "Employee" от "Person" и создайте объект этого типа.

// Напишите функцию, которая принимает объект `Employee` и выводит его имя и должность.

interface Person2 {
    name: string;
    age: number;
}

interface Employee2 extends Person2 {
    position: string;
}

const employee: Employee2 = {
    name: "Иван",
    age: 30,
    position: "Разработчик"
};

function printEmployeeInfo(emp: Employee2): void {
    console.log(`Имя: ${emp.name}, Должность: ${emp.position}`);
}

printEmployeeInfo(employee);

interface IFunction {
    (a: number, b: number): void
}

export interface IFunction2 {
    (a: number, b: number): void
}

