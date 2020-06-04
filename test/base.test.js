const c = require('../src/calendar');

const Calendar = c.default;

// today
const now = new Calendar();

console.log('Year: ', now.getFullYear());     // return 2020
console.log('Quarter: ', now.getQuarter());   // return 1
console.log('Month: ', now.getMonth());       // return 5
console.log('Date: ', now.getDate());         // return 4
console.log('Hours: ', now.getHours());       // return 16
console.log('Minutes: ', now.getMinutes());   // return 42
console.log('Seconds: ', now.getSeconds());   // return 5

console.log('toDate: ', now.toDate());        // return '2020-06-04'
console.log('toDatetime: ', now.toDatetime());// return '2020-06-04 16:42:05'
console.log('toTime: ', now.toTime());        // return '16:42:05'
