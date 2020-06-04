const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar('2020-05-20');

console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR)); 	// 
console.log(`[${cal.toDate()}] 中 季度 起止日期:`, cal.toBothDate(CalendarTypes.QUARTER)); 		// 
console.log(`[${cal.toDate()}] 中 月份 起止日期:`, cal.toBothDate(CalendarTypes.MONTH)); 		// 
console.log(`[${cal.toDate()}] 中 周 起止日期:`, cal.toBothDate(CalendarTypes.WEEK)); // 
console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期:`, cal.toBothDate(CalendarTypes.WEEKOFMONTH)); // 
