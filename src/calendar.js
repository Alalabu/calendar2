"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
var CalendarTypes;
(function (CalendarTypes) {
    CalendarTypes["DAY"] = "DAY";
    CalendarTypes["MONTH"] = "MONTH";
    CalendarTypes["YEAR"] = "YEAR";
    CalendarTypes["WEEK"] = "WEEK";
    CalendarTypes["WEEKOFMONTH"] = "WEEKOFMONTH"; // 当前月的所有周范围
    CalendarTypes["QUARTER"] = "QUARTER";
    CalendarTypes["HOURS"] = "HOURS";
    CalendarTypes["MINUTES"] = "MINUTES";
    CalendarTypes["SECONDS"] = "SECONDS";
})(CalendarTypes = exports.CalendarTypes || (exports.CalendarTypes = {}));
;
const getDayCountByMonth = (month, year) => {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 1:
            if (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)) {
                return 29;
            }
            return 28;
        default:
            return -1;
    }
};
/**
 * 日历相关的对象
 */
class Calendar extends Date {
    constructor(datestring) {
        if (datestring == null) {
            super();
        }
        else {
            super(datestring);
        }
        this.add = this.add.bind(this);
        this.toDate = this.toDate.bind(this);
        this.toDatetime = this.toDatetime.bind(this);
        this.valueOf = this.valueOf.bind(this);
    }
    /**
     * 更改时间差
     * @param value 时间变动的差值, 正值代表加时间, 负值代表减时间
     * @param type 修改时间项, 暂时支持 年/月/日/时/分/秒
     */
    add(value, type) {
        switch (type) {
            case CalendarTypes.YEAR:
                this.setFullYear(this.getFullYear() + value);
                break;
            case CalendarTypes.MONTH:
                this.setMonth(this.getMonth() + value);
                break;
            case CalendarTypes.WEEK:
                this.setDate(this.getDate() + (value * 7));
                break;
            case CalendarTypes.DAY:
                this.setDate(this.getDate() + value);
                break;
            case CalendarTypes.HOURS:
                this.setHours(this.getHours() + value);
                break;
            case CalendarTypes.MINUTES:
                this.setMinutes(this.getMinutes() + value);
                break;
            case CalendarTypes.SECONDS:
                this.setSeconds(this.getSeconds() + value);
                break;
            default: return false;
        }
        return true;
    }
    getFullYear() {
        return super.getFullYear();
    }
    getQuarter() {
        const month = super.getMonth();
        switch (month) {
            case 0:
            case 1:
            case 2:
                return 0;
            case 3:
            case 4:
            case 5:
                return 1;
            case 6:
            case 7:
            case 8:
                return 2;
            case 9:
            case 10:
            case 11:
                return 3;
            default:
                return null;
        }
    }
    getMonth() {
        return super.getMonth();
    }
    getDate() {
        return super.getDate();
    }
    getHours() {
        return super.getHours();
    }
    getMinutes() {
        return super.getMinutes();
    }
    getSeconds() {
        return super.getSeconds();
    }
    toDate() {
        return moment(this).format('YYYY-MM-DD');
    }
    /**
     * 一个时间所属范围(年、季、月、周)中的第一天和最后一天
     */
    toBothDate(type = CalendarTypes.YEAR) {
        // 当前时间对象
        // const date = anthorDate ? new Date(anthorDate) : this;
        const date = this;
        // 年份
        // const d: any = {};
        /**
         * 年份肯定是当年吖
         * 但是
         * 如果查询的时间是按 "周=WEEK" 则
         * 有可能本周的第一天是去年
         * 最后一天是明年
         */
        const beginDay = { year: date.getFullYear() };
        const endDay = { year: date.getFullYear() };
        const bothDate = {}; // 需要返回的范围日期
        // 月份核实
        if (type === CalendarTypes.YEAR) {
            beginDay.month = 0;
            beginDay.day = 1;
            endDay.month = 11;
            endDay.day = 31;
        } else if (type === CalendarTypes.QUARTER) {
            // 按季度确定月份
            // Q1: 0 = [0,1,2]
            // Q2: 3 = [3,4,5]
            // Q3: 6 = [6,7,8]
            // Q4: 9 = [9,10,11]
            const m = date.getMonth();
            if (m < 3) {
                beginDay.month = 0;
                beginDay.day = 1;
                endDay.month = 2;
                endDay.day = 31;
            }
            else if (m >= 3 && m < 6) {
                beginDay.month = 3;
                beginDay.day = 1;
                endDay.month = 5;
                endDay.day = 30;
            }
            else if (m >= 6 && m < 9) {
                beginDay.month = 6;
                beginDay.day = 1;
                endDay.month = 8;
                endDay.day = 30;
            }
            else if (m >= 9 && m < 12) {
                beginDay.month = 9;
                beginDay.day = 1;
                endDay.month = 11;
                endDay.day = 31;
            }
        }
        else if (type === CalendarTypes.MONTH) {
            const y = date.getFullYear();
            const m = date.getMonth();
            beginDay.month = m;
            beginDay.day = 1;
            endDay.month = m;
            endDay.day = getDayCountByMonth(m, y);
        }
        else if (type === CalendarTypes.WEEK) {
            const weekday = date.getDay();
            const first = new Calendar(date);
            first.add(0 - weekday, CalendarTypes.DAY);
            const last = new Calendar(date);
            last.add(6 - weekday, CalendarTypes.DAY);
            // 设置...
            beginDay.year = first.getFullYear();
            beginDay.month = first.getMonth();
            beginDay.day = first.getDate();
            endDay.year = last.getFullYear();
            endDay.month = last.getMonth();
            endDay.day = last.getDate();
        }
        else if (type === CalendarTypes.WEEKOFMONTH) {
            const weekday = date.getDay(); // 根据本地时间返回指定日期对象的星期中的第几天（0-6）。
            const first = new Calendar(date);
            first.add(0 - weekday, CalendarTypes.DAY);
            const last = new Calendar(date);
            last.add(6 - weekday, CalendarTypes.DAY);
            // 设置当前日子所在的周的开始和结束范围...
            beginDay.year = first.getFullYear();
            beginDay.month = first.getMonth();
            beginDay.day = first.getDate();
            endDay.year = last.getFullYear();
            endDay.month = last.getMonth();
            endDay.day = last.getDate();
            // 设置当前月的所有包含的周列表(如包含上个月的日子,也添加)
            const firstIndex = 0, lastIndex = 6;
            const stepDate = new Calendar(date.toDate());// date; //new Calendar(); // 步长日
            // const stepDate = date;// date; //new Calendar(); // 步长日
            const dayOfMonth = stepDate.getDate(); // 获取当前日子是本月的第几天
            stepDate.setDate(1);// 步长日, 从本月1日开始计算
            const stepMonth = stepDate.getMonth(); // 步长月份
            const weeks = [];
            bothDate.todayIndex = -1; // 当前日期在 weeks 中若不存在, 则该值为 -1
            let i = 0;
            while(stepDate.getMonth() === stepMonth){
                // 0. 定义周范围的日期对象
                const onceWeek = {begin: null, end: null, isCurrentWeek: false, raw: null};
                // 1. 查询当前日期是本周的第几天
                const dayOfWeek = stepDate.getDay();
                // 2. 如果不是 第一天(0),则向前 找补 n 天; 如果是, 则取今天为第一天
                if(dayOfWeek !== firstIndex) {
                    stepDate.add( 0 - dayOfWeek, CalendarTypes.DAY);
                }
                // 3. 设置这一周的第一天
                onceWeek.begin = stepDate.toDate();
                onceWeek.beginDate = stepDate.getDate(); // 开始的日份
                onceWeek.beginOfMonth = `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                onceWeek.raw = `${stepDate.getMonth() + 1}/${stepDate.getDate()}  ~  `; // 设置简单的展示方式
                // 4. 以当前日期为基准加 6 天, 寻找本周末尾时间
                stepDate.add( lastIndex, CalendarTypes.DAY);
                // 5. 设置这一周的最后一天
                onceWeek.end = stepDate.toDate();
                onceWeek.endDate = stepDate.getDate(); // 结束的日份
                onceWeek.endOfMonth = `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                onceWeek.raw += `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                onceWeek.title = onceWeek.raw;
                // 6. 判断是否是本周
                if(dayOfMonth >= onceWeek.beginDate && dayOfMonth <= onceWeek.endDate){
                    onceWeek.isCurrentWeek = true;
                    bothDate.todayIndex = i; // 当前日期所在 weeks 数组的索引位置
                }
                // 7. 将周数据填充到周数组中
                weeks.push(onceWeek);
                // 8. 以当前本周结束时间为基准, 增加一天, 作为下一天的初始时间
                stepDate.add( 1, CalendarTypes.DAY);
                // 9. 索引自增
                i++;
            }
            bothDate.weeks = weeks;
        }
        beginDay.text = [beginDay.year, (beginDay.month + 1), beginDay.day].join('-');
        endDay.text = [endDay.year, (endDay.month + 1), endDay.day].join('-');
        // 设置返回结果
        bothDate.beginDay = beginDay;
        bothDate.endDay = endDay;
        return bothDate;
    }
    /**
     * 获取最后一天(默认年)
     */
    // toLastDate() {
    //     return moment(this).format('YYYY-MM-DD');
    // }
    toDatetime() {
        return moment(this).format('YYYY-MM-DD HH:mm:ss');
    }
    toTime() {
        return moment(this).format('HH:mm:ss');
    }
    equalsDate(otherDate) {
        if ((otherDate instanceof Date && !(otherDate instanceof Calendar)) || typeof otherDate === 'string') {
            return (new Calendar(otherDate)).toDate() === this.toDate();
        }else {
            return otherDate.toDate() === this.toDate();
        }
    }
    equalsDateTime(otherDate) {
        if ((otherDate instanceof Date && !(otherDate instanceof Calendar)) || typeof otherDate === 'string') {
            return (new Calendar(otherDate)).toDatetime() === this.toDatetime();
        }
        else {
            return otherDate.toDatetime() === this.toDatetime();
        }
    }
    valueOf() {
        return moment(this).format('YYYY-MM-DD HH:mm:ss');
    }
}
exports.default = Calendar;