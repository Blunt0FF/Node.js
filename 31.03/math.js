// Определите функции в модуле. В файле `mathModule.js` создайте две функции:
// `add(a, b)` - функция для сложения двух чисел.
// `subtract(a, b)` - функция для вычитания одного числа из другого.

// Экспортируйте функции. Экспортируйте обе функции с помощью объекта `module.exports`.

// Создайте основной файл проекта. Создайте новый файл с именем `app.js`.

// Импортируйте ваш модуль. В начале файла `app.js` импортируйте ваш модуль `mathModule`.

// Используйте функции модуля. В файле `app.js` используйте импортированные функции `add` и `subtract`, передайте им любые числа и выведите результаты в консоль.

// Запустите ваш скрипт. В терминале перейдите в директорию с файлом `app.js` и выполните команду `node app.js` для запуска скрипта.

function add(a, b) {
    return console.log("sum: ", a + b);
    
}


function subtract(a, b) {
    return console.log("sum: ", a - b);
}



module.exports = {
    add,
    subtract
}


