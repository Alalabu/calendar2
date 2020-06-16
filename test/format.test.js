const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const cal = new Calendar('2020-5-20');

// 1. 格式化日期/时间
console.log('------------------- 01 格式化日期/时间 --------------------');
console.log('默认格式化 [yyyy-MM-dd hh:mm:ss]: ', cal.toFormat());
console.log('日期格式 [yyyy-MM-dd]: ', cal.toFormat('yyyy-MM-dd'));
console.log('年月格式 [yyyy-MM]: ', cal.toFormat('yyyy-MM'));
console.log('月日格式 [MM-dd]: ', cal.toFormat('MM-dd'));
console.log('时间格式 [hh:mm:ss]: ', cal.toFormat('hh:mm:ss'));
console.log('时分格式 [hh:mm]: ', cal.toFormat('hh:mm'));
console.log('分秒格式 [mm:ss]: ', cal.toFormat('mm:ss'));
console.log('毫秒格式 [mm:ss.SSS]: ', cal.toFormat('mm:ss.SSS'));

// 2. 自定义格式化标识
console.log('------------------- 02 自定义格式化标识 --------------------');
console.log('日期格式 [yyyy年MM月dd日]: ', cal.toFormat('yyyy年MM月dd日'));
console.log('年月格式 [yyyy年MM月]: ', cal.toFormat('yyyy年MM月'));
console.log('月日格式 [MM月dd日]: ', cal.toFormat('MM月dd日'));
console.log('时间格式 [hh时mm分ss秒]: ', cal.toFormat('hh时mm分ss秒'));
console.log('时分格式 [hh时mm分]: ', cal.toFormat('hh时mm分'));
console.log('分秒格式 [mm分ss秒]: ', cal.toFormat('mm分ss秒'));

// 3. 时间取值范围中的格式化
console.log('------------------- 03 日期取值范围中的格式化 --------------------');
// console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR)); 	// 
// console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR, {format_str: 'yyyy-MM'})); 	// 
// console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR, {format_str: 'yyyy-MM-dd hh:mm'})); 	// 
// console.log(`[${cal.toDate()}] 中 年份 起止日期: `, cal.toBothDate(CalendarTypes.YEAR, {format_str: 'MM-dd hh:mm:ss.SSS'})); 	// 

// console.log(`[${cal.toDate()}] 中 季度 起止日期:`, cal.toBothDate(CalendarTypes.QUARTER)); 		//
// console.log(`[${cal.toDate()}] 中 季度 起止日期: `, cal.toBothDate(CalendarTypes.QUARTER, {format_str: 'yyyy-MM'})); 	// 
// console.log(`[${cal.toDate()}] 中 季度 起止日期: `, cal.toBothDate(CalendarTypes.QUARTER, {format_str: 'yyyy年MM月dd日'}));
// console.log(`[${cal.toDate()}] 中 季度 起止日期: `, cal.toBothDate(CalendarTypes.QUARTER, {format_str: 'yyyy-MM-dd hh:mm'})); 	// 
// console.log(`[${cal.toDate()}] 中 季度 起止日期: `, cal.toBothDate(CalendarTypes.QUARTER, {format_str: 'MM-dd hh:mm:ss.SSS'})); 	//

// console.log(`[${cal.toDate()}] 中 月份 起止日期:`, cal.toBothDate(CalendarTypes.MONTH)); 		//
// console.log(`[${cal.toDate()}] 中 月份 起止日期: `, cal.toBothDate(CalendarTypes.MONTH, {format_str: 'MM-dd'})); 	// 
// console.log(`[${cal.toDate()}] 中 月份 起止日期: `, cal.toBothDate(CalendarTypes.MONTH, {format_str: 'yyyy-MM-dd hh:mm'})); 	// 
// console.log(`[${cal.toDate()}] 中 月份 起止日期: `, cal.toBothDate(CalendarTypes.MONTH, {format_str: 'MM-dd hh:mm:ss.SSS'})); 	//

// console.log(`[${cal.toDate()}] 中 周 起止日期:`, cal.toBothDate(CalendarTypes.WEEK)); //
// console.log(`[${cal.toDate()}] 中 周 起止日期: `, cal.toBothDate(CalendarTypes.WEEK, {format_str: 'MM-dd'})); 	// 
// console.log(`[${cal.toDate()}] 中 周 起止日期: `, cal.toBothDate(CalendarTypes.WEEK, {format_str: 'yyyy-MM-dd hh:mm'})); 	// 
// console.log(`[${cal.toDate()}] 中 周 起止日期: `, cal.toBothDate(CalendarTypes.WEEK, {first_weekday: 1, format_str: 'yyyy年MM月dd日'}));
// console.log(`[${cal.toDate()}] 中 周 起止日期: `, cal.toBothDate(CalendarTypes.WEEK, {format_str: 'MM-dd hh:mm:ss.SSS'})); 	//
// console.log(`[${cal.toDate()}] 中 周 起止日期: `, cal.toBothDate(CalendarTypes.WEEK, {
//   first_weekday: 1,
//   format_str: 'yyyy年MM月dd日 hh:mm:ss'
// }));

// console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期:`, cal.toBothDate(CalendarTypes.WEEKOFMONTH)); // 
// console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期:`, cal.toBothDate(CalendarTypes.WEEKOFMONTH, {format_str: 'yyyy/MM/dd'}));
// console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期: `, cal.toBothDate(CalendarTypes.WEEKOFMONTH, {format_str: 'yyyy年MM月dd日'})); 	// 
// console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期: `, cal.toBothDate(CalendarTypes.WEEKOFMONTH, {format_str: 'yyyy-MM-dd hh:mm:ss'})); 	// 
// console.log(`[${cal.toDate()}] 中 月份中所有周列表的 起止日期: `, cal.toBothDate(CalendarTypes.WEEKOFMONTH, {
//   first_weekday: 1,
//   format_str: 'yyyy-MM-dd hh:mm:ss',
// }));