
// 1. Функция, которая принимает два числа и возвращает их сумму.
function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(3, 7));

// 2. Функция с опциональным параметром, возвращающая длину строки или сообщение.
function getStringLength(str?: string): string | number {
  if (!str) {
    return "Строка не передана или пуста";
  }
  return str.length;
}
console.log(getStringLength("fvdf"));

// 3. Стрелочная функция: умножение всех элементов массива на 2.
const multiplyByTwo = (arr: number[]): number[] => {
  return arr.map((item) => item * 2);
};
console.log(multiplyByTwo([1, 3, 5]));

// 4. Альтернатива с reduce:
const multiplyByTwoReduce = (arr: number[]): number[] => {
  return arr.reduce((acc: number[], item: number) => {
    acc.push(item * 2);
    return acc;
  }, []);
};
console.log(multiplyByTwoReduce([1, 3, 5]));

console.log("______________________________");

// 5. Сумма чисел после фильтрации строк.
const sumFiltered = (arr: (number | string)[]): number => {
  return arr
    .filter((item): item is number => typeof item === "number")
    .reduce((acc, num) => acc + num, 0);
};
console.log(sumFiltered([3, 5, "abc", 77]));

console.log("______________________________");

// 6. Обобщённая функция identity
 
// T, G - обобщенный тип (generic) смысл которого принять любой тип данных в момент вызова функции
function identity<T, G>(value: T, num: G): T | G {
  return typeof value === "string" ? value : num;
}
const identityResult = identity<string, number>("hello world", 10);
console.log(identityResult);

// 7. Обобщённая функция, возвращающая первый элемент массива.
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
console.log(getFirstElement([100, 200, 300]));
console.log(getFirstElement(["a", "b", "c"]));

// 8. Обобщённая функция, возвращающая массив из двух элементов.
function makeArray<T>(a: T, b: T): T[] {
  return [a, b];
}
console.log(makeArray(1, 2));
console.log(makeArray("hello", "world"));

// 9. Кортежи и объекты — обновление склада.
type ProductInfo = [string, number, number];
function updateStock(inventory: Record<string, number>, productInfo: ProductInfo): Record<string, number> {
  const [name, , quantity] = productInfo;
  inventory[name] = (inventory[name] || 0) + quantity;
  return inventory;
}
const stock = { apple: 10, banana: 5 };
const updatedStock = updateStock(stock, ["apple", 20, 15]);
console.log(updatedStock);

// 10. Функция с параметром по умолчанию
function multiplyWithDefault(a: number, b: number = 10): number {
  return a > b ? a * b : a;
}
console.log(multiplyWithDefault(5));

// 11. Стрелочная функция: умножение или деление
const multiplyOrDivide = (a: number, b: number): number => {
  return a > b ? a * b : a / b;
};
console.log(multiplyOrDivide(6, 3));
console.log(multiplyOrDivide(2, 4));

// 12. Обобщённая функция, возвращающая значение свойства объекта.
function getPropertyValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const exampleObj = { id: 1, name: "Test" };
console.log(getPropertyValue(exampleObj, "name"));

// 13. Обобщённая функция с ограничением: возвращение массива id
interface ItemWithId {
  id: number;
}
function getIds<T extends ItemWithId>(items: T[]): number[] {
  return items.map(item => item.id);
}
const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
console.log(getIds(items));

// 14. Обобщённая функция, возвращающая строковое поле
interface IObj {
  id: number;
  str: string;
  data: number;
}
function extractStrField<T extends IObj>(arr: T[]): string[] {
  return arr.map(item => item.str);
}
const users: IObj[] = [
  { id: 1, str: "Alex", data: 100 },
  { id: 2, str: "Alex1", data: 200 }
];
console.log(extractStrField(users));