const fs = require('fs')

fs.readFile('example.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log('error, no file')
        return
    }
    console.log(data)
})