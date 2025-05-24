// Задание 1 — Классы Animal и Dog
class Animal {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  sound(): void {
    console.log("The animal makes a sound");
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name, "Dog");
    this.breed = breed;
  }

  sound(): void {
    console.log("The dog barks");
  }
}

const genericAnimal = new Animal("Creature", "Unknown");
genericAnimal.sound(); // The animal makes a sound

const dog = new Dog("Buddy", "Labrador");
dog.sound(); // The dog barks

// Задание 2 — Статическое свойство Library
class Library {
  static totalBooks: number = 0;

  addBook(): void {
    Library.totalBooks++;
  }
}

const lib1 = new Library();
const lib2 = new Library();

lib1.addBook();
lib1.addBook();
lib2.addBook();

console.log("Total books in all libraries:", Library.totalBooks); // 3

// Задание 3 — Классы Vehicle и Motorcycle
class Vehicle {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  type: string;

  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}

const bike = new Motorcycle("Yamaha", "MT-07", "Sport");
console.log("Motorcycle:", bike); 
