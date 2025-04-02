// Откройте ваш редактор кода и создайте новую директорию для проекта, например, `dateModuleProject`.

// Внутри директории проекта создайте файл с именем `dateModule.js`.

// В файле `dateModule.js` создайте две функции:
// `getCurrentDate` - функция для получения текущей даты в формате `YYYY-MM-DD`.
// `getCurrentTime` - функция для получения текущего времени в формате `HH:MM:SS`.

// Экспортируйте обе функции с помощью объекта `module.exports`.

// Создайте новый файл с именем `app.js`.

// В начале файла `app.js` импортируйте ваш модуль `dateModule`.

// В файле `app.js` используйте импортированные функции `getCurrentDate` и `getCurrentTime`, чтобы вывести 
//        текущую дату и время в консоль.

// 8.    В терминале перейдите в директорию проекта и выполните команду `node app.js` для запуска скрипта.

// 9.    Убедитесь, что в консоли отображается текущая дата и время в указанных форматах.

function getCurrentDate () {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth()+1).padStart(2,0)
    const date = String(currentDate.getDate()).padStart(2,0)
    return `${year} ${month} ${date} `
}

function getCurrentTime (){
    const currentTime = new Date()
    return currentTime.toLocaleTimeString()
}

console.log(getCurrentDate());
console.log(getCurrentTime());
