const c = require('../src/calendar');

const Calendar = c.default;

const datestring = '2020-01-01 16:16:16';
const date = new Date('2020-01-01 08:08:08');
const cal01 = new Calendar('2020-01-01 12:12:12');
const cal02 = new Calendar('2020-01-01 20:20:20');

// equalsDate 仅对比日期部分
console.log('1. equalsDate 仅对比日期部分: ');
console.log(`${cal01} === ${datestring} ? `, cal01.equalsDate(datestring)); 	// 返回: true
console.log(`${cal01} === ${date} ? `, cal01.equalsDate(date)); 		          // 返回: true
console.log(`${cal01} === ${cal02} ? `, cal01.equalsDate(cal02)); 		        // 返回: true
console.log(`${cal01} === 2020-01-02 12:12:12 ? `, cal01.equalsDate('2020-01-02 12:12:12')); // 返回: false


// equalsDateTime 对比日期 + 时间部分
console.log('2. equalsDateTime 对比日期 + 时间部分: ');
console.log(`${cal01} === ${datestring} ? `, cal01.equalsDateTime(datestring)); 	// 返回: false
console.log(`${cal01} === ${date} ? `, cal01.equalsDateTime(date)); 		          // 返回: false
console.log(`${cal01} === ${cal02} ? `, cal01.equalsDateTime(cal02)); 		        // 返回: false
console.log(`${cal01} === 2020-01-01 12:12:12 ? `, cal01.equalsDateTime('2020-01-01 12:12:12')); // 返回: true