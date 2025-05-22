// Создайте новый файл TypeScript, например, `promiseExample.ts`.
// Напишите промис, который разрешается или отклоняется через 2 секунды, используя `setTimeout`.
// Обработайте результат с помощью `then`, `catch`, и `finally`.


const delayPromise = new Promise<string>((resolve,reject)=> {
setTimeout(() => {
    const success = Math.random() > 0.5
    if (success){
        resolve('operation completed successfully')
    }else {
        reject('error')
    }
}, 1000);
})
delayPromise
.then((result) => console.log(result))
.catch((error) => console.log(error))
.finally(()=> console.log('works anyways'))

async function fn1(str: string): Promise<string> {
  //промис видит что значени с задержкой, но выполняет сразу возвращая undefined потому что фунция fn1 не предназначена сразу для возвращения промисса
  return new Promise<string>((res, rej) => {
        const randomizer = Math.random() > 0.5

    setTimeout(() => {
      if (randomizer) {
        res(str);
      } else {
        rej("hello");
      }
    }, 2000);
  });
}

// fn1('hello world')
//     .then(res => console.log(res))

// console.log(fn1('hello'))

async function res() {
  try {
const result = await fn1("hello from async function");
  console.log(result);
  } catch(e) {

    console.log(e);
    
  }
}

// console.log(res());
res();
// .then((res) => {
//   console.log(res);
// });



// Написать функцию, которая использует `Promise.all` для параллельного выполнения двух или более асинхронных операций.

// Создайте новый файл TypeScript, например, `parallelExecution.ts`.

// Напишите несколько функций, которые возвращают промисы (например, симулирующие асинхронные операции).

// Используйте `Promise.all`, чтобы выполнить эти функции параллельно и обработать результаты.

// Обработайте ошибку, если хотя бы один из промисов завершился с ошибкой.

function asyncFn1(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Result from asyncFn1");
    }, 1000);
  });
}

function asyncFn2(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
    }, 1500);
  });
}

function asyncFn3(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("success");
    }, 2000);
  });
}

async function executeAsyncFunctions() {
  try {
    const results = await Promise.all([
      asyncFn1(),
      asyncFn2(),
      asyncFn3(),
    ]);
    console.log("All results:", results);
  } catch (error) {
    console.error("Error in one of the promises:", error);
  }
}
executeAsyncFunctions();

// Создать функцию, которая имитирует вызов к внешнему API с возможностью возникновения ошибки (например, случайный отказ через `reject`).

// Создайте новый файл TypeScript, например, `errorHandlingExample.ts`.

// Напишите функцию, которая возвращает промис и случайным образом разрешается или отклоняется.

// В асинхронной функции используйте `try/catch` для обработки ошибок.

// Добавьте блок `finally`, который выводит сообщение о завершении операции.

function fakeApiCall(): Promise<string> {
  return new Promise((res, rej) => {
    const rand = Math.floor(Math.random() * 10) % 2 === 0
    console.log(rand)
    setTimeout(() => {
      if (rand) {
        res('successfully fetch data from API -_-')
      } else {
        rej('error fetch data from API ')
      }
    }, 1500)
  })
}
async function getData() {
  try {
    console.log(await fakeApiCall())
  } catch (error) {
    console.log(error)
  } finally {
    console.log('finally')
  }
}
getData()

// Асинхронный квадрат числа
// Напиши функцию squareAsync, которая принимает число и возвращает Promise, который через 500 мс возвращает квадрат этого числа.

function squareAsync(num: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve (Math.pow(num, 2))
    }, 500);
  });
}
squareAsync(5)
.then((result) => {
  console.log('Квадрат числа:', result);
})


function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Прошло ${ms / 1000} секунд(ы)`);
      resolve();
    }, ms);
  });
}

delay(3000)

// Есть две функции loadUser и loadPosts, каждая возвращает Promise<string> с разной задержкой.
// Используй Promise.all для параллельного вызова и выведи оба результата.
// 1 функция - первый вызов с задержкой в секунду
// 2 функция - второй вызов с задержкой в 2 секунды
// 3 функция - вызываем через promise.all() обе функции

function loadUser(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Пользователь загружен");
    }, 1000); // 1 секунда
  });
}

function loadPosts(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Посты загружены");
    }, 2000); 
  });
}

async function loadAllData() {
  try {
    const [user, posts] = await Promise.all([loadUser(), loadPosts()]);
    console.log(user); 
    console.log(posts); 
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}

loadAllData();

// Обработка ошибки в асинхронной функции
// Напишите асинхронную функцию, которая пытается получить данные из API (используйте фейковый URL).
// Если запрос завершается ошибкой, обработайте её с помощью блока `try/catch` и выведите сообщение об ошибке.

async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Данные получены:", data);
  } catch (error) {
    console.error("Произошла ошибка при получении данных:", error);
  }
}

fetchData();


function fetchDataCatch() {
  fetch('https://jsonplaceholder.typicode.com/todos/2')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Данные получены:", data);
    })
    .catch(error => {
      console.error("Произошла ошибка при получении данных:", error);
    });
}

fetchDataCatch();


// Задание 3
// Последовательное выполнение асинхронных операций
// Создайте три асинхронные функции, которые возвращают промисы, разрешающиеся через разное время.
// Напишите функцию, которая вызывает эти функции последовательно, ожидая завершения каждой с использованием `await`.

function task1(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task 1 completed in 1 sec")
        }, 1000)
    })
}
function task2(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task 2 completed in 2 sec")
        }, 2000)
    })
}
function task3(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task 2 completed in 3 sec")
        }, 3000)
    })
}
async function runTasks() {
    try {
        const result1 = await task1()
        console.log(result1);
        const result2 = await task2()
        console.log(result2);
        const result3 = await task3()
        console.log(result3); 
    } catch(error) {
        console.error(error);
    }
}
runTasks()

// Задание 4
// Параллельная и последовательная загрузка данных
// Создайте две функции, которые имитируют загрузку данных с серверов (например, `fetchData1` и `fetchData2`).
// Выполните их параллельно с использованием `Promise.all`, затем выполните последовательно с использованием `await` и сравните время выполнения.
// Функция 1
// Функция 2
// Функция что использует промисс алл
// Функция последовательной подгрузки по одном

function fetchData1(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные из функции 1");
        }, 2000); // 2 секунды
    });
}
function fetchData2(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные из функции 2");
        }, 3000); // 3 секунды
    });
}
async function fetchDataParallel() {
    try {
        const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
        console.log("Параллельная загрузка завершена:");
        console.log(data1);
        console.log(data2);
    } catch (error) {
        console.error("Ошибка при параллельной загрузке:", error);
    }
}
async function fetchDataSequential() {
    try {
        const data1 = await fetchData1();
        console.log("Последовательная загрузка завершена:");
        console.log(data1);
        const data2 = await fetchData2();
        console.log(data2);
    } catch (error) {
        console.error("Ошибка при последовательной загрузке:", error);
    }
}
fetchDataParallel();
fetchDataSequential();