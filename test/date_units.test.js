const c = require('../src/calendar');
const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

const option = {
  // begin: '2020-06-29 16:42:05',
  // end: '2020-07-4 8:02:37', 

  begin: '2020-11',
  end: '2021-02-21',

  // begin: '2020-07-31 16:42:05',
  // end: '2021-06-4 8:02:37', 

  // incr: -30, 
  // seed: '2020-05-01 16:42:05', 
  

  // format: 'yyyy年MM月dd日',
  // format: 'yyyy年MM月',
  // format: 'yyyy年',
  // order: 'ASC',
  order: 'ASC',
  // particle: CalendarTypes.DAY,
  particle: CalendarTypes.MONTH,
  // particle: CalendarTypes.YEAR,
};

let count = 0;
console.log(`${++count}. 范围: `, Calendar.getDateUnits(option));