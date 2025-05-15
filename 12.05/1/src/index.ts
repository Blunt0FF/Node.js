// Создайте функцию, которая принимает два числа и возвращает их сумму.
function sum (a: number, b:number): number {
    return a + b
}
console.log(sum(3,7));


// Реализуйте функцию с опциональным параметром, которая принимает строку и возвращает ее длину или сообщение о пустой строке.
function getStringLength(str?: string): string | number {
    if (!str) {
      return "Строка не передана или пуста";
    }
    return str.length;
}
console.log(getStringLength("goooooooooooooooo"));
  
// Напишите стрелочную функцию, которая принимает массив чисел и возвращает массив, где все элементы умножены на 2.
const fnArr = (arr: number[]): number[] => {
    return arr.map((item) => item * 2);
}
const arr = [1, 3, 5];
console.log(fnArr(arr));

const fnArr1 = (arr: number[]): number[] => {
    return arr.reduce((acc: number[], item: number) => {
        acc.push(item * 2);
        return acc;
    }, []);
}
const arr1 = [1, 3, 5];
console.log(fnArr1(arr1));

console.log("______________________________");

// Напишите стрелочную функцию, которая принимает массив чисел и возвращает число - сумму всех элементов массива, сначала надо отфильтровать массив, тк будет передан массив чисел и строк
const fn4 = (arr: [number, number, string, number]): number =>
    arr.filter(a => typeof a === 'number').reduce((acc, num) => acc + num, 0)
console.log(fn4([3, 5, 'abc', 77]))

console.log("______________________________");

function identity<T, G>(value: T, num: G): T | G {
    if(typeof value === 'string') {
        return value
    }
    return num
}

const res1 = identity<string, number>('hello world', 10)

function getFirstElem<T>(arr: T[]): T {
    return arr[0]
}

const arrRes1= getFirstElem<number>([4, 3, 2, 5, 1, 9])
const arrRes2= getFirstElem<string>(['hello first string', 'asdas', 'asdasd'])
console.log(arrRes2);

console.log("______________________________");
//   Напишите обобщенную функцию, которая принимает массив любого типа и возвращает первый элемент этого массива.
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}
console.log(getFirstElement([100, 200, 300]));
console.log(getFirstElement(["a", "b", "c"]));

// Создайте обобщенную функцию, которая принимает два аргумента одного типа и возвращает массив из этих двух элементов.
function makeArray<T>(a: T, b: T): T[] {
    return [a, b];
}
console.log(makeArray(1, 2));
console.log(makeArray("hello", "world"));

// Задание 4
// Работа с кортежами и объектами
// Создайте кортеж `productInfo`, который содержит:  
// название товара (строка)  
// его цену (число)  
// количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект `inventory` (где ключ — это название товара, а значение — количество на складе) и кортеж `productInfo`, обновляет количество товара в объекте `inventory` и возвращает обновленный объект.
type ProductInfo = [string, number, number];

function updateStock(inventory: Record<string, number>, productInfo: ProductInfo): Record<string, number> {
    const [name, , quantity] = productInfo;
    inventory[name] = (inventory[name] || 0) + quantity;
    return inventory;
}

const stock = { apple: 10, banana: 5 };
const updated = updateStock(stock, ["apple", 20, 15]);
console.log(updated);

function fn1(a: number, b: number): number{
    return a + b
}
console.log(fn1(2, 5))

function fn2(param?: string): string | number{
    if(param && typeof param === "string"){
        return param.length
    } 
    return "No param"
}
console.log(fn2(''))

const fnArr2 = (arr: number[]): number[] =>{
    return arr.map((item) => item * 2)
}
const arr2 = [1, 3, 5]
console.log(fnArr2(arr2))

//   Напишите стрелочную функцию, которая принимает массив чисел и возвращает число - сумму всех элементов массива, сначала надо отфильтровать массив, тк будет передан массив чисел и строк
const sumFiltered = (arr: (number | string)[]): number => {
    return arr
      .filter((item): item is number => typeof item === 'number')
      .reduce((acc, num) => acc + num, 0);
};
console.log(sumFiltered([1, 'a', 2, 3, 'b', 4]));

// Напишите обобщенную функцию, которая принимает массив любого типа и возвращает первый элемент этого массива.
function firstGeneric<T>(arr: T[]): T {
    return arr[0];
}
console.log(firstGeneric([10, 20, 30]));

// Создайте обобщенную функцию, которая принимает два аргумента одного типа и возвращает массив из этих двух элементов.
function combine<T>(x: T, y: T): T[] {
    return [x, y];
}
console.log(combine('a', 'b'));

//   Напишите обобщенную функцию, которая принимает массив любого типа и возвращает первый элемент этого массива.
function fnFirstElm<T>(arr: T[]): T {
    return arr[0]
}

console.log(fnFirstElm<number>([10, 20, 30]));

// Создайте обобщенную функцию, которая принимает два аргумента одного типа и возвращает массив из этих двух элементов.
function fnMakePair<T>(a: T, b: T): T[] {
    return [a, b]
}

console.log(fnMakePair<number>(1, 2));

// Напишите обобщенную функцию, которая принимает объект и строку — имя свойства этого объекта. Функция должна возвращать значение этого свойства.

// Создайте обобщенную функцию с ограничением по типу, которая принимает массив объектов с полем `id` и возвращает массив значений `id`.

function getFirstElem1<T>(arr: T[]): T {
    return arr[0];
  }
  
  const arrRes3 = getFirstElem1<number>([4, 3, 2, 5, 1, 9]);
  const arrRes4 = getFirstElem1<string>(["hello first string", "asdas", "asdasd"]);
  console.log(arrRes2);
  
  function generateObj<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  
  interface obj {
    id: number;
    str: string;
    data: number;
  }
  
  function fn5<T extends obj>(arr: T[]): string[] {
    return arr.map((item) => item.str);
  }
  
  console.log(fn5<obj>([{ id: 1, str: "hello", data: 2323 }, { id: 2, str: "hello2", data: 232343 }]));


//   Напишите обобщенную функцию, которая принимает объект и строку — имя свойства этого объекта. Функция должна возвращать значение этого свойства.

// Создайте обобщенную функцию с ограничением по типу, которая принимает массив объектов с полем `id` и возвращает массив значений `id`.

