// Задание 1 — Обработка цепочки промисов с async/await
function delayResult(value: string, delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

async function runSequentially() {
  console.log("Задание 1:");
  const result1 = await delayResult("First", 1000);
  console.log(result1);

  const result2 = await delayResult("Second", 1500);
  console.log(result2);

  const result3 = await delayResult("Third", 500);
  console.log(result3);
  console.log("\n");
}

// Задание 2 — Асинхронная обработка массива
function asyncToUpper(str: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(str.toUpperCase()), 1000);
  });
}

async function processStrings(arr: string[]) {
  console.log("Задание 2:");
  const results = await Promise.all(arr.map(asyncToUpper));
  console.log(results);
  console.log("\n");
}

// Задание 3 — Обработка ошибки в параллельных промисах
function successfulTask(): Promise<string> {
  return Promise.resolve("Success");
}

function failingTask(): Promise<string> {
  return Promise.reject("Something went wrong");
}

async function runParallel() {
  console.log("Задание 3:");
  try {
    const results = await Promise.all([
      successfulTask(),
      failingTask(), // намеренная ошибка
      successfulTask(),
    ]);
    console.log(results);
  } catch (error) {
    console.error("Error caught:", error);
  }
  console.log("\n");
}

// Задание 4 — Асинхронная функция с динамическим временем
function delayWithValue(value: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), value);
  });
}

async function runWithDelays(values: number[]) {
  console.log("Задание 4:");
  const promises = values.map(delayWithValue);
  const results = await Promise.all(promises);
  console.log(results);
}

// Запуск всех заданий
async function runAll() {
  await runSequentially();
  await processStrings(["apple", "banana", "cherry"]);
  await runParallel();
  await runWithDelays([1000, 500, 1500]);
}

runAll();