// Задание 1
type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Alice",
  permissions: ["read", "write"],
  email: "alice@example.com"
};

console.log("AdminUser:", adminUser);

// Задание 2
type Engine = {
  type: string;
  horsepower: number;
};

type Car = {
  make: string;
  model: string;
  engine: Engine;
  year?: number;
};

const car: Car = {
  make: "Toyota",
  model: "Camry",
  engine: {
    type: "V6",
    horsepower: 301
  },
  year: 2020
};

function displayCarInfo(car: Car): void {
  console.log(`Make: ${car.make}, Model: ${car.model}, Engine: ${car.engine.type} (${car.engine.horsepower} HP)`);
  if (car.year) {
    console.log(`Year: ${car.year}`);
  }
}

displayCarInfo(car);

// Задание 3
interface Product {
  name: string;
  price: number;
}

interface DiscountCalculator {
  (product: Product, discount: number): number;
}

const calculateDiscount: DiscountCalculator = (product, discount) => {
  return product.price - (product.price * discount);
};

console.log("Discounted Price:", calculateDiscount({ name: "Laptop", price: 1000 }, 0.2));

// Задание 4
interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "John", salary: 3000 },
  { name: "Jane", salary: 3500 },
  { name: "Bob", salary: 2800 }
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map(emp => emp.salary);
}

console.log("Salaries:", getSalaries(employees));

// Задание 5
interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "Tom",
  lastName: "Holland",
  grade: 90
};

function displayStudentInfo(student: Student): void {
  console.log(`${student.firstName} ${student.lastName}, Grade: ${student.grade}`);
}

displayStudentInfo(student);

// Задание 6
interface StringConcatenator {
  (str1: string, str2: string): string;
}

const concatStrings: StringConcatenator = (str1, str2) => str1 + str2;

console.log("Concatenated:", concatStrings("Hello, ", "World!"));