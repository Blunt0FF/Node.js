const moment = require('moment');

const now = moment();

console.log('Формат DD-MM-YYYY:', now.format('DD-MM-YYYY'));
console.log('Формат MMM Do YY:', now.format('MMM Do YY'));
console.log('День недели (dddd):', now.format('dddd'));