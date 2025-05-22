// У тебя есть папка logs/, внутри которой находятся текстовые файлы с логами. Каждый файл — лог одного пользователя. Внутри — список действий, по одному на строку.
// Пример содержимого файла user1.log:
// login
// click
// click
// logout
// login
// click
// logout
// Что надо сделать:
// Прочитать все файлы из папки logs/
// Для каждого файла:
// Прочитать содержимое
// Разделить на строки
// Подсчитать сколько раз встречается каждое действие
// Вывести в консоль статистику по каждому пользователю в виде:
// user1.log:
//   login: 2
//   click: 3
//   logout: 2
// user2.log:
//   ...

const path = require('path')
const fs = require('fs')

const originsPathToLogs = path.join(__dirname, 'logs')


fs.readdir(originsPathToLogs, (err, files) => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log('successfully', files)
    files.forEach(file => {
      const originsPathToFile = path.join(originsPathToLogs, file)
      fs.readFile(originsPathToFile, 'utf-8', (err, data) => {
        if (err) {
          console.log(err.message)
          return
        }
        const content = data
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
        const usersLogsObj = {}
        for (let i = 0; i < content.length; i++) {
          const action = content[i]
          if (usersLogsObj[action]) {
            usersLogsObj[action]++
          } else {
            usersLogsObj[action] = 1
          }
        }
        console.log(file, ':')
        const newObj = Object.entries(usersLogsObj)
        newObj.forEach(item => {
          console.log(`  ${item[0]}: ${item[1]}`)
        })
      })
    })
  })