const c = require('./src/calendar');

const Calendar = c.default;
const CalendarTypes = c.CalendarTypes;

Object.assign(module.exports, {Calendar, CalendarTypes});