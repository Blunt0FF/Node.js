// Напишите скрипт, который включает использование `setTimeout` и `Promise`.
// Запустите скрипт и проанализируйте порядок выполнения выводимых сообщений.
// Синхронные операции (`Start` и `End`) выполняются первыми.
// Промисы перед `setTimeout`.
// `setTimeout` выполняется последним, так как его коллбэк добавляется в очередь задач.

console.log('start');
setTimeout(()=> {
    console.log('setTimeout');
}, 0)

Promise.resolve()
.then(() => {
    console.log('Promise');
})

console.log('end');

// start
// end
// Promise
// setTimeout