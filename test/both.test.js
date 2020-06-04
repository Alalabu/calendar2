const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar('2020-05-20');

console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR)); 	// 返回: true
console.log(`[${cal.toDate()}] 中 季度 起止日期:`, cal.toBothDate(CalendarTypes.QUARTER)); 		// 返回: true
console.log(`[${cal.toDate()}] 中 月份 起止日期:`, cal.toBothDate(CalendarTypes.MONTH)); 		// 返回: true
console.log(`[${cal.toDate()}] 中 周 起止日期:`, cal.toBothDate(CalendarTypes.WEEK)); // 返回: false
console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期:`, cal.toBothDate(CalendarTypes.WEEKOFMONTH)); // 返回: false