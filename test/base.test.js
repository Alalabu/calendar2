const c = require('../src/calendar');

const Calendar = c.default;

// today
const now = new Calendar();

console.log('Year: ', now.getFullYear());
console.log('Quarter: ', now.getQuarter());
console.log('Month: ', now.getMonth());
console.log('Date: ', now.getDate());
console.log('Hours: ', now.getHours());
console.log('Minutes: ', now.getMinutes());
console.log('Seconds: ', now.getSeconds());

console.log('toDate: ', now.toDate());
console.log('toDatetime: ', now.toDatetime());
console.log('toTime: ', now.toTime());
