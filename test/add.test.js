const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar('2020-05-20 18:01:01');

console.log('原日期时间 : ', cal.toDatetime());
cal.add(1, CalendarTypes.DAY); 	// 2020-05-21 18:01:01
console.log('增加 1 天 : ', cal.toDatetime());
cal.add(3, CalendarTypes.WEEK); // 2020-05-21 18:01:01
console.log('增加 3 周 : ', cal.toDatetime());
cal.add(-2, CalendarTypes.MONTH); // 2020-05-21 18:01:01
console.log('减少 2 月 : ', cal.toDatetime());
cal.add(+11, CalendarTypes.HOURS); // 2020-05-21 18:01:01
console.log('增加 11 小时 : ', cal.toDatetime());