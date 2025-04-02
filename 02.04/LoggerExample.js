const EventEmitter = require('events');
const logger = new EventEmitter();

logger.on('info', (message) => {
    console.log('info: ', message);
})

logger.on('warning', (message) => {
    console.warn('warning: ', message);
})


logger.on('error', (message) => {
    console.error('error: ', message);
})

logger.emit('info', 'Some info')
logger.emit('warning', 'Some warning')
logger.emit('error', 'Some error')
