// Задание 1

// Класс `Car` и его наследник `ElectricCar`

// Создайте класс `Car`, который будет содержать свойства `make` (марка автомобиля) и `year` (год выпуска).

// Добавьте метод `start()`, который выводит в консоль сообщение `"The car is starting"`.

// Затем создайте класс-наследник `ElectricCar`, который добавит новое свойство `batteryLevel` (уровень заряда батареи).

// Переопределите метод `start()`, чтобы он выводил сообщение `"The electric car is starting"`.

class Car {
    mark: string;
    year: number;

    constructor(mark: string, year: number) {
        this.mark = mark;
        this.year = year;
    }

    start(): void {
        console.log(`The car is starting`);
    }
}

class ElectricCar extends Car {
    constructor(mark: string, year: number, public batteryLevel: number) {
        super(mark, year);
    }

    start(): void {
        console.log(`The electric car is starting`);
    }
}


const my_car = new Car("Toyota", 2023);
my_car.start(); // Выведет: The car is starting

const my_electric_car = new ElectricCar("Tesla", 2024, 95);
my_electric_car.start(); // Выведет: The electric car is starting


// Задание 2

// Статический метод для создания объектов

// Создайте класс `Product`, который имеет свойства `name` (название продукта) и `price` (цена продукта).

// Добавьте статический метод `createDiscountedProduct`, который принимает название продукта, цену и процент скидки, а затем возвращает новый объект `Product` с учетом скидки.

// Задание 2

class Product {
    constructor(public name: string, public price: number) {
        this.name = name;
        this.price = price;
    }

    static createDiscountedProduct(name: string, price: number, discount: number): Product {
        const discountedPrice = price * (1 - discount / 100);
        return new Product(name, discountedPrice);
    }
}

const myProduct = new Product("Laptop", 1200);
const discountedProduct = Product.createDiscountedProduct("Mouse", 25, 0.1);

console.log(`Original price: ${myProduct.price}`);
console.log(`Discounted price: ${discountedProduct.price}`);

// Задание 3

// Модификаторы доступа в классе `BankAccount`

// Создайте класс `BankAccount`, который содержит защищенное свойство `balance` (баланс).

// Реализуйте метод `deposit()`, который увеличивает баланс, и метод `withdraw()`, который уменьшает баланс.

// В классе `BankAccount` должен быть публичный метод `getBalance()`, который возвращает текущий баланс.

// Создайте объект и проверьте работу методов.

class BankAccount {
    protected balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        } else {
            console.log("Deposit amount must be positive.");
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log("Invalid withdraw amount.");
        }
    }

    getBalance(): number {
        return this.balance;
    }
}


const myAccount = new BankAccount(1000);
myAccount.deposit(500);
console.log(`Balance after deposit: ${myAccount.getBalance()}`); // Выведет: Balance after deposit: 1500
myAccount.withdraw(300);
console.log(`Balance after withdrawal: ${myAccount.getBalance()}`); // Выведет: Balance after withdrawal: 1200
myAccount.withdraw(2000); // Выведет: Invalid withdraw amount.


// Задание 4

// Наследование и работа со статическим свойством

// Создайте класс `Employee` с полями `name` (имя) и `position` (должность).

// Добавьте статическое свойство `employeeCount`, которое увеличивается при создании нового сотрудника.

// Затем создайте класс `Manager`, который наследуется от `Employee` и добавляет новое свойство `department` (отдел).

class Employee {
  name: string;
  position: string;
  static employeeCount: number = 0; // Статическое свойство

  constructor(name: string, position: string) {
    this.name = name;
    this.position = position;
    Employee.employeeCount++;
  }

}

class Manager extends Employee {
  department: string;

  constructor(name: string, position: string, department: string) {
    super(name, position); 
    this.department = department;
  }
}



const employee1 = new Employee("Alice", "Developer");
const employee2 = new Employee("Bob", "Designer");

console.log("Количество сотрудников:", Employee.employeeCount); // Вывод: 2

const manager1 = new Manager("Charlie", "Manager", "Marketing");
console.log(manager1.name, manager1.position, manager1.department); // Вывод: Charlie Manager Marketing
console.log("Количество сотрудников:", Employee.employeeCount); // Вывод: 3


// Задание 5

// Переопределение метода `describe` в классе `Book`

// Создайте класс `Book`, который содержит свойства `title` (название книги) и `author` (автор).

// Добавьте метод `describe()`, который выводит в консоль информацию о книге.

// Затем создайте класс `EBook`, который наследуется от `Book` и добавляет новое свойство `fileSize` (размер файла).

// Переопределите метод `describe()`, чтобы добавить информацию о размере файла.

class Book {
    title: string;
    author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }

    describe(): void {
        console.log(`Title: ${this.title}, Author: ${this.author}`);
    }
}

class EBook extends Book {
    fileSize: number;

    constructor(title: string, author: string, fileSize: number) {
        super(title, author);
        this.fileSize = fileSize;
    }

    describe(): void {
        super.describe();
        console.log(`File Size: ${this.fileSize}MB`);
    }
}

const book = new Book("1984", "George Orwell");
book.describe(); // Выведет: Title: 1984, Author: George Orwell

const ebook = new EBook("Brave New World", "Aldous Huxley", 2);
ebook.describe(); 
// Выведет:
// Title: Brave New World, Author: Aldous Huxley
// File Size: 2MB

