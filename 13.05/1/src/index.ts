// class User {
//     public name: string;
//     private age: number;
//     protected username: string
//     constructor(name: string, age: number, username: string) {
//         this.name = name
//         this.age = age
//         this.username = username
//     }

//    public greet(specialHi: string) {
//         console.log(`Hello, my name is ${this.name}. ${this.age} And i'm saying: ${specialHi}`)
//     }
//     protected getUsername() {
//         return this.username
//     }
//     //Статистические методы можно вызывать напрямую без создания экземпляра класса
//     // static hello() {
//     //     console.log('helo))')
//     // }
// }

// const Alice = new User('Alice', 25, 'allie')

// Alice.greet('HELLO ))')
// // User.hello()
// class SpecialUser extends User {
//     showUsername() {
//         console.log(this.getUsername())
//     }
// }
// const newAlice = new SpecialUser('new Alice', 30, 'Allie999')
// console.log(Alice);
// newAlice.showUsername()


// Измените класс `User`, добавив приватное свойство `password`, которое будет хранить пароль пользователя.

// Добавьте публичный метод для установки пароля (например, `setPassword(password: string)`), который позволит менять значение этого приватного свойства.

// Создайте публичный метод `checkPassword(password: string)`, который будет проверять корректность введенного пароля и возвращать `true` или `false`.

// class newUser {
//     public name: string;
//     public age: number;
//     protected password: string
//     constructor(name: string, age: number, password: string){
//         this.name = name,
//         this.age = age,
//         this.password = password
//     }
//    protected showPassword(){
//         return this.password
//     }
// }

// const user1 = new newUser('Oleg', 35, 'Oleg1234')

// class Admin extends newUser{
//    showAdminPassword(){
//     console.log(`Password ${this.showPassword()}`)
//    }
// }

// const admin = new Admin('Sveta', 30, 'Sveta1234')
// admin.showAdminPassword()


// Создание класса Admin

// Создайте класс `Admin`, который наследуется от `User`.
// Добавьте в класс `Admin` метод `displayUsers()`, который выводит в консоль список всех пользователей. Для этого создайте статический массив `users` в классе `User`, куда будете добавлять созданных пользователей.

// Переопределение метода greet

// В классе `Admin` переопределите метод `greet()`, чтобы он выводил сообщение о том, что пользователь является администратором.

class User {
    static users: User[] = [];

    public name: string;

    constructor(name: string) {
        this.name = name;

        User.users.push(this);
    }

    greet(): void {
        console.log(`Hello, this is ${this.name}`);
        
    }
}

class Admin extends User {
    constructor(name: string) {
        super(name)
    }

    greet(): void {
        console.log(`Hello, this is admin ${this.name}`);
    }

    displayUsers() {
        User.users.forEach((user) => {
            console.log(`${user.name}`);
            
        })
    }
}

const user1 = new User('Alice')
const user2 = new User('Karina')

const admin1 = new Admin('Bob')
const admin2 = new Admin('Jonas')

user1.greet()
admin1.greet()
admin2.displayUsers()

// Создайте статический метод `createGuestUser`, который будет возвращать нового пользователя с предустановленными значениями имени и возраста. Например, пользователь будет иметь имя "Guest" и возраст 0.

// Создайте статическое свойство `userCount`, которое будет хранить количество созданных объектов класса `User`. Увеличивайте это значение каждый раз, когда создается новый пользователь (то есть в конструкторе класса).






// Класс User:
// приватные поля name и age
// статическое свойство userCount, которое увеличивается при создании нового пользователя
// метод greet(), который выводит Привет, меня зовут <name>, мне <age> лет
// геттеры и сеттеры для name и age (с валидацией: возраст должен быть > 0)
// статический метод createGuest() → возвращает пользователя с именем "Гость" и возрастом 0

// ✅ Класс Admin (наследуется от User):
// переопределяет greet() так, чтобы выводить: Я администратор <name>
// метод showUserStats() — выводит общее число пользователей (User.userCount)


class Animal {
    private _name: string;
    private _age: number;
    static userCount: number = 0;
    constructor(name: string, age: number){
        this._name = name
        this._age = age
        Animal.userCount ++
    }
    greet():void{
        console.log(`Привет, меня зовут ${this._name}, мне ${this._age} лет`);
    }
    get name() {
        return this._name
    }
    get age() {
        return this._age
    }
    set name(value: string) {
        this._name = value
    }
    set age(value: number) {
        if(value > 0) {
            this._age = value
        }
    }
    static createGuestAnimal(): Animal {
        return new Animal('Guest', 0)
    }
}class AdminAnimal extends Animal {
    constructor(name: string, age: number){
        super(name, age)
    }
    greet():void{
        console.log(`Я администратор ${this.name}`);
    }
    showAnimalStats(): number{
        return Animal.userCount
    }
}
const bear = new Animal('Bear', 2)
const fox = new Animal('Fox', 1)
fox.greet()
const rabbit = Animal.createGuestAnimal()
rabbit.greet()
const leo = new AdminAnimal('Leo', 3)
leo.greet()
console.log(leo.showAnimalStats());