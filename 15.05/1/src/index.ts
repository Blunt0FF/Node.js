// Создайте абстрактный класс `Employee`, который будет представлять сотрудника. В этом классе определите абстрактный метод `calculateSalary()`. Этот метод должен возвращать зарплату сотрудника, но не должен иметь реализации в самом `Employee`.

// Создайте два класса, которые будут наследовать `Employee`:

// `FullTimeEmployee` — для сотрудников на полной ставке.
// `PartTimeEmployee` — для сотрудников, работающих неполный рабочий день.

// В каждом из этих классов реализуйте метод `calculateSalary()` по-своему:

// В `FullTimeEmployee` зарплата может рассчитываться как фиксированная сумма.
// В `PartTimeEmployee` зарплата может зависеть от количества отработанных часов и почасовой ставки.

abstract class Employee{
  name: string;
  constructor(name: string){
    this.name = name
  }
  abstract calculateSalary(): number
}
class FullTimeEmployee extends Employee{
  private fixedSalary: number
  constructor(name: string, fixedSalary: number){
    super(name);
    this.fixedSalary = fixedSalary
  }
  calculateSalary(): number {
    return this.fixedSalary
  }
}
class PartTimeEmployee extends Employee{
  private partTimeSalary: number;
  private time: number;
  constructor(name: string, time: number, partTimeSalary: number){
    super(name);
    this.time = time
    this.partTimeSalary = partTimeSalary
  }
  calculateSalary(): number {
    return this.time * this.partTimeSalary
  }
}
const empl1 = new FullTimeEmployee('Alice', 1000);
const empl2 = new PartTimeEmployee('Tati', 20, 25)
console.log(empl1)
console.log(empl2)
console.log(empl2.calculateSalary())
console.log(empl1.calculateSalary())

// Создайте абстрактный класс `Vehicle`, в котором будет абстрактный метод `move()`.

// Реализуйте два класса — `Car` и `Plane`, которые будут наследовать `Vehicle` и по-разному реализовывать метод `move()`:
// `Car` должен выводить сообщение "Машина едет по дороге".
// `Plane` должен выводить сообщение "Самолёт летит по воздуху".

// Создайте массив типа `Vehicle[]`, включающий в себя объекты классов `Car` и `Plane`.

// Реализуйте цикл, который проходит по массиву и вызывает метод `move()` для каждого элемента, выводя соответствующее сообщение.

abstract class Vehicle {
    abstract move(): void;
}

class Car extends Vehicle {
    move(): void {
        console.log("Машина едет по дороге");
    }
}

class Plane extends Vehicle {
    move(): void {
        console.log("Самолёт летит по воздуху");
    }
}

const vehicles: Vehicle[] = [new Car(), new Plane()];

for (const vehicle of vehicles) {
    vehicle.move();
}

// Создайте абстрактный класс `Shape`, который будет представлять фигуру. В этом классе объявите:

// Абстрактное поле `name` типа `string`, которое будет задавать имя фигуры.
// Абстрактный метод `calculateArea()`, который будет возвращать площадь фигуры (тип `number`).

// Реализуйте два класса — `Circle` и `Rectangle`, которые будут наследовать `Shape`:

// `Circle` должен иметь поле `radius` и реализовывать метод `calculateArea()` для вычисления площади круга.
// `Rectangle` должен иметь поля `width` и `height` и реализовывать метод `calculateArea()` для вычисления площади прямоугольника.

// В каждом классе задайте значение поля `name` в соответствии с типом фигуры (`"Circle"` и `"Rectangle"` соответственно).

abstract class Shape{
  abstract name: string;
  abstract calculateArea():number
}
class Circle extends Shape{
  name: string = "Circle"
  radius: number
  constructor(radius: number){
    super()
    this.radius = radius
  }
  calculateArea(){
    return Math.PI * Math.pow(this.radius, 2)
  }  
}
class Rectangle extends Shape{
  name: string = "Rectangle";
  width: number;
  height: number;
  constructor(width: number, height: number){
    super();
    this.width = width;
    this.height = height
  }
  calculateArea(){
    return this.width * this.height 
  }
}
const circle = new Circle(20)
const rectangle = new Rectangle(20, 30)
console.log(circle.calculateArea())
console.log(rectangle.calculateArea())

// Создайте абстрактный класс `Person` с абстрактным методом `getDetails()`.

// Создайте абстрактный класс `Employee` (наследник `Person`), который добавляет абстрактное поле `salary`.

// Создайте класс `Manager`, который наследует `Employee` и реализует оба абстрактных метода.

abstract class Person {
    name:string 
    abstract getDetails():void
    constructor(name:string) {
        this.name = name
    }
}
abstract class Employee1 extends Person{
    abstract salary: number

}

class Manager1 extends Employee1 {
    salary:number
    constructor(name:string, salary:number){
        super(name)
        this.salary = salary
    }
    getDetails():void{
        console.log("Я зарабатываю много денях");
        
    }
}

const vasya = new Manager1('Vasya', 2000)

vasya.getDetails()



// Создайте абстрактный класс AcademicPerson, который содержит:
// поле fullName: string
// абстрактный метод getRole(): string
// абстрактный метод getInfo(): string
// Создайте два класса, наследующих AcademicPerson:
//  Student:
// имеет дополнительное поле grade: number
// метод getRole() возвращает "Student"
// метод getInfo() возвращает строку вида:"Студент Иван Петров, средняя оценка: 8.5"
// Teacher:
// имеет поле subject: string
// метод getRole() возвращает "Teacher"
// метод getInfo() возвращает строку:"Преподаватель Мария Иванова, предмет: Математика"


abstract class AcademicPerson {
  fullName: string;

  constructor(fullName: string) {
    this.fullName = fullName;
  }

  abstract getRole(): string;

  abstract getInfo(): string;
}


class Student extends AcademicPerson {
  grade: number;

  constructor(fullName: string, grade: number) {
    super(fullName);
    this.grade = grade;
  }

  getRole(): string {
    return "Student";
  }

  getInfo(): string {
    return `Студент ${this.fullName}, средняя оценка: ${this.grade}`;
  }
}

class Teacher extends AcademicPerson {
  subject: string;

  constructor(fullName: string, subject: string) {
    super(fullName);
    this.subject = subject;
  }

  getRole(): string {
    return "Teacher";
  }

  getInfo(): string {
    return `Преподаватель ${this.fullName}, предмет: ${this.subject}`;
  }
}


const student1 = new Student("Иван Петров", 8.5);
console.log(student1.getInfo()); // Вывод: Студент Иван Петров, средняя оценка: 8.5

const teacher1 = new Teacher("Мария Иванова", "Математика");
console.log(teacher1.getInfo()); // Вывод: Преподаватель Мария Иванова, предмет: Математика
