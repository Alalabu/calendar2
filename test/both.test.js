const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar();
// const cal = new Calendar('2020-03-1');
// const cal = new Calendar('2020-05-20');
// const cal = new Calendar('2020-06-4');
// const cal = new Calendar('2020-06-30');
// const cal = new Calendar('2020-10-31');

console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR, { compleZero : true })); 	// 
console.log(`[${cal.toDate()}] 中 季度 起止日期:`, cal.toBothDate(CalendarTypes.QUARTER, { compleZero : true })); 		// 
console.log(`[${cal.toDate()}] 中 月份 起止日期:`, cal.toBothDate(CalendarTypes.MONTH, { compleZero : true })); 		// 
console.log(`[${cal.toDate()}] 中 周 起止日期:`, cal.toBothDate(CalendarTypes.WEEK, { compleZero : true })); // 
console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期:`, cal.toBothDate(CalendarTypes.WEEKOFMONTH, { compleZero : true })); // 
