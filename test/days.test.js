const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar('2020-06-04 16:42:05');

console.log(`[${cal.toDate()}] 在当前季度中是第几天: `, cal.getDayOfQuarter());
console.log(`[${cal.toDate()}] 在当前年份中是第几天: `, cal.getDayOfYear());