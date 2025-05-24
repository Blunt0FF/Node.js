// Задание 1 — Абстрактный класс Animal
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}

class Cat extends Animal {
  makeSound(): string {
    return "Meow";
  }
}

const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach(animal => console.log(animal.makeSound()));
// Bark
// Meow

// Задание 2 — Абстрактный класс ColoredShape
abstract class Shape {
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract color: string;
}

class ColoredCircle extends ColoredShape {
  radius: number;
  color: string;

  constructor(radius: number, color: string) {
    super();
    this.radius = radius;
    this.color = color;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class ColoredRectangle extends ColoredShape {
  width: number;
  height: number;
  color: string;

  constructor(width: number, height: number, color: string) {
    super();
    this.width = width;
    this.height = height;
    this.color = color;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

const shapes: ColoredShape[] = [
  new ColoredCircle(3, "red"),
  new ColoredRectangle(4, 5, "blue"),
];

shapes.forEach(shape =>
  console.log(`Color: ${shape.color}, Area: ${shape.calculateArea()}`)
);
// Color: red, Area: 28.274333882308138
// Color: blue, Area: 20

// Задание 3 — Абстрактный класс Appliance
abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing machine is now ON");
  }

  turnOff(): void {
    console.log("Washing machine is now OFF");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator is now ON");
  }

  turnOff(): void {
    console.log("Refrigerator is now OFF");
  }
}

const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];
appliances.forEach(appliance => {
  appliance.turnOn();
  appliance.turnOff();
});
// Washing machine is now ON
// Washing machine is now OFF
// Refrigerator is now ON
// Refrigerator is now OFF

// Задание 4 — Абстрактный класс Account
abstract class Account {
  protected balance: number = 0;
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
}

class SavingsAccount extends Account {
  deposit(amount: number): void {
    this.balance += amount;
    this.balance *= 1.02; // 2% interest
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

class CheckingAccount extends Account {
  private fee: number = 1;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount + this.fee) {
      this.balance -= (amount + this.fee);
    }
  }

  getBalance(): number {
    return this.balance;
  }
}

const savings = new SavingsAccount();
savings.deposit(1000);
savings.withdraw(200);
console.log("Savings Balance:", savings.getBalance()); // Savings Balance: 816

const checking = new CheckingAccount();
checking.deposit(500);
checking.withdraw(100);
console.log("Checking Balance:", checking.getBalance()); // Checking Balance: 399

// Задание 5 — Абстрактный класс Media
abstract class Media {
  abstract play(): void;
}

class AudioMedia extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

const mediaList: Media[] = [new AudioMedia(), new Video()];
mediaList.forEach(media => media.play());
// Playing audio
// Playing video