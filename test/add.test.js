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

/**
 * v 1.1.0 改进
 * 问题: A的日份大于目标B的日份时, 变更月份时将可能产生跳月的问题
 * 已修复
 */
const c1 = new Calendar('2020-03-31 18:01:01');
c1.add(1, CalendarTypes.MONTH);
console.log('3月31日 增加 1 月 : ', c1.toDate());

const c2 = new Calendar('2020-03-31 18:01:01');
c2.add(-1, CalendarTypes.MONTH);
console.log('3月31日 减少 1 月 : ', c2.toDate());

const c3 = new Calendar('2020-03-31 18:01:01');
c3.add(-4, CalendarTypes.MONTH);
console.log('3月31日 减少 4 月 : ', c3.toDate());

const c4 = new Calendar('2020-03-31 18:01:01');
c4.add(3, CalendarTypes.MONTH);
console.log('3月31日 增加 3 月 : ', c4.toDate());

const c5 = new Calendar('2020-02-29 18:01:01');
c5.add(1, CalendarTypes.MONTH);
console.log('2月29日 增加 1 月 : ', c5.toDate());

const c6 = new Calendar('2020-02-29 18:01:01');
c6.add(-1, CalendarTypes.MONTH);
console.log('2月29日 减少 1 月 : ', c6.toDate());

const c7 = new Calendar('2020-07-31 18:01:01');
c7.add(1, CalendarTypes.MONTH);
console.log('7月31日 增加 1 月 : ', c7.toDate());