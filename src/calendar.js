"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const assert = require('assert');
const dateFormat = require('date-format');
const defaultDateFormat = 'yyyy-MM-dd'; // 默认的日期格式
const defaultDatetimeFormat = 'yyyy-MM-dd hh:mm:ss'; // 默认的日期时间格式
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
// 获取当前月份有多少天
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
    /** ***********************************************************
     * 静态函数区域
     */

    /**
     * 获取某范围内的所有日期单位, 范围确定方式:
     * 1. 通过 `begin` 和 `end` 确定日期范围。优先级靠前（参数都满足的情况下优先使用方案1范围）
     * 2. 通过 `seed` 作为当前的种子日期, 以 `incr` 作为种子增量, 范围为 seed ~ (seed + incr) 之间;
     * 
     * 以此两种方式, 遍历返回区间内所有的日期单位
     * @param {Object} option 配置
     * @param {String|Date} option.begin 起始日期
     * @param {String|Date} option.end 结束日期
     * @param {Number} option.incr 日期增量
     * @param {String|Date} option.seed 日期种子
     * @param {CalendarTypes} option.particle 粒度类型, 支持 DAY、MONTH、YEAR
     * @param {String} option.format 格式化方式
     * @param {String} option.order 排序方式, 可选值: [ASC, DESC]
     */
    static getDateUnits({
        begin, end, incr, seed, particle = CalendarTypes.DAY,
        format, order = 'ASC',
    }) {
        try {
            // 1.粒度验证, 仅支持 DAY、MONTH、YEAR
            if (particle !== CalendarTypes.DAY && particle !== CalendarTypes.MONTH && particle !== CalendarTypes.YEAR) {
                throw `particle must between [DAY, MONTH, YEAR], but this particle is ${particle}`;
            }
            if (order !== 'ASC' && order !== 'DESC') {
                throw `order must between [ACS, DESC], but order is ${order}.`;
            }
            // 为 format 做默认赋值
            if (!format) {
                switch (particle) {
                    case CalendarTypes.DAY: format = defaultDateFormat; break;
                    case CalendarTypes.MONTH: format = 'yyyy-MM'; break;
                    case CalendarTypes.YEAR: format = 'yyyy'; break;
                }
            }
            let bd, ed, begin_date, end_date;
            // 2. 确定日期起至范围
            if (begin && end) {
                bd = new Calendar(begin);
                ed = new Calendar(end);
                if (bd > ed) { // 当 开始时间 > 结束时间时 (八成写反了,给他调正)
                    const tmp = bd; bd = ed; ed = tmp;
                }
            } else if (incr && Number.isInteger(incr)) {
                // seed 种子类型判断
                if (!seed) {
                    seed = new Date(); // 默认今日
                } else if(typeof seed === 'string'){
                    seed = new Date(seed); // 默认今日
                } else if(!(seed instanceof Date)) {
                    throw `seed is not a Date: ${seed}`;
                }
                // 确定范围
                if (incr >= 0) {
                    bd = new Calendar(seed);
                    ed = new Calendar(seed);
                    ed.add(incr, particle);
                } else {
                    ed = new Calendar(seed);
                    bd = new Calendar(seed);
                    bd.add(incr, particle);
                }
            } else {
                throw `parameters are missing: ${JSON.stringify({begin, end, incr, seed})}`;
            }
            // 记录待返回的范围始末
            begin_date = dateFormat(format, bd);
            end_date = dateFormat(format, ed);
            // 3. 为对比准确, 设定无用日期皆为该时间单位的第一位
            bd.setHours(0, 0, 0, 0); 
            ed.setHours(0, 0, 0, 0);
            if (particle === CalendarTypes.MONTH) {
                bd.setDate(1);
                ed.setDate(1);
            } else if (particle === CalendarTypes.YEAR) {
                bd.setDate(1);
                ed.setDate(1);
                bd.setMonth(0);
                ed.setMonth(0);
            }
            // 4. 根据粒度返回范围内的日期单位
            const dates = [];
            const tmpDay = (order === 'ASC') ? new Calendar(bd) : new Calendar(ed); // 获取范围里的第一天
            const step = (order === 'ASC') ? 1 : -1; // 递增 或 递减 步长
            while(1) {
                if (order === 'ASC' && tmpDay > ed) {
                    // console.log('退出: 当前 tmpDay: ',tmpDay.toDate());
                    // console.log('退出: 当前 ed: ',ed.toDate());
                    break; // 日期遍历完毕, 退出
                }
                if (order === 'DESC' && tmpDay < bd) {
                    // console.log('退出: 当前 tmpDay: ',tmpDay.toDate());
                    // console.log('退出: 当前 bd: ',bd.toDate());
                    break; // 日期遍历完毕, 退出
                }
                if (particle === CalendarTypes.DAY) {
                    dates.push({
                        year: tmpDay.getFullYear(), month: tmpDay.getMonth(), day: tmpDay.getDate(), 
                        txt: dateFormat(format, tmpDay),
                    });
                } else if (particle === CalendarTypes.MONTH) {
                    dates.push({
                        year: tmpDay.getFullYear(), month: tmpDay.getMonth(), txt: dateFormat(format, tmpDay),
                    });
                } else if (particle === CalendarTypes.YEAR) {
                    dates.push({
                        year: tmpDay.getFullYear(), txt: dateFormat(format, tmpDay),
                    });
                }
                // 递增
                // console.log('tmpDay 更新前: ', tmpDay.toDate(), step, particle);
                tmpDay.add(step, particle);
                // console.log('tmpDay 更新后: ', tmpDay.toDate(), step, particle);
            }
            // 返回数据
            // return dates;
            return {begin_date, end_date, dates};
        } catch (error) {
            throw error;
        }
    }

    /** ***********************************************************
     * 实例函数区域
     */
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
                const dayValue = 1; // 先设置为 1 日
                const originMonthDay = this.getDate(); // 原日期的天数
                this.setMonth(this.getMonth() + value, dayValue); // 改变月份
                const newMonthDay = getDayCountByMonth(this.getMonth(), this.getFullYear()); // 新的月份的最大天数
                if (originMonthDay > newMonthDay) {
                    this.setDate(newMonthDay); // 最大日期
                } else {
                    this.setDate(originMonthDay); // 原日期
                }
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
    // 获取当前日期在当前年份中是第几天
    getDayOfYear() {
        const year = super.getFullYear();
        const isLeapYear = ( (year%4==0 && year%100!=0) || year%400 == 0);
        const month = super.getMonth();

        let monthNo = 1;
        const months = month > 0 ? Array(month).fill(0).map(() => monthNo++) : [];
        let days_count = 0; // 总天数
        // 计算之前月份所累积的天数
        for (const m of months) {
            if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
                days_count += 31;
            } else if (m == 4 || m == 6 || m == 9 || m == 11) {
                days_count += 30;
            } else if (m == 2) {
                days_count += (isLeapYear ? 29 : 28);
            }
        }
        // 加当日本月第几天
        days_count += this.getDate();
        return days_count;
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
    // 获取当前日期在当前季度中是第几天
    getDayOfQuarter() {
        const year = super.getFullYear();
        const isLeapYear = ( (year%4==0 && year%100!=0) || year%400 == 0);
        const month = super.getMonth();
        const quarter = this.getQuarter();
        const months = [];
        // 获取当前季度之前月份数组
        for (let i = quarter * 3 + 1; i <= month; i++) {
            months.push(i);
        }
        let days_count = 0; // 总天数
        // 计算之前月份所累积的天数
        for (const m of months) {
            if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
                days_count += 31;
            } else if (m == 4 || m == 6 || m == 9 || m == 11) {
                days_count += 30;
            } else if (m == 2) {
                days_count += (isLeapYear ? 29 : 28);
            }
        }
        // 加当日本月第几天
        days_count += this.getDate();
        return days_count;
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
    toDatetime() {
        return moment(this).format('YYYY-MM-DD HH:mm:ss');
    }
    toTime() {
        return moment(this).format('HH:mm:ss');
    }
    /**
     * 根据格式化标识控制输出
     */
    toFormat(format_str = defaultDatetimeFormat) {
        return dateFormat(format_str, this);
    }
    
    /**
     * 一个时间所属范围(年、季、月、周)中的第一天和最后一天
     * @param {CalendarTypes} type 选取范围的粒度枚举
     * @param {Object} options
     *  - option.first_weekday {Integer} 当前周日期范围中，本周开始的第一天是星期几。默认为 0，代表星期日，取值范围为：[0~6]
     *  - option.defaultDateFormat {String} 表示当前范围文本的格式化方式, 默认为 "yyyy-MM-dd"。当 type = WEEKOFMONTH 时，日期格式化还会影响返回对象中的 weeks 数组
     */
    toBothDate(type = CalendarTypes.YEAR, { first_weekday = 0, format_str = defaultDateFormat } = {}) {
        // 当前时间对象
        const date = this;
        // 断言
        // assert(Number.isInteger(first_weekday) && first_weekday >= 0 && first_weekday <= 6, 'option.first_weekday is not in the valid range: [0 - 6].');
        if (!Number.isInteger(first_weekday) || first_weekday < 0 && first_weekday > 6) {
            throw 'option.first_weekday is not in the valid range: [0 - 6].';
        }
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
        bothDate.today = dateFormat(format_str, date); // 添加当前日的格式化
        // 月份核实
        if (type === CalendarTypes.YEAR) {
            beginDay.month = 0;
            beginDay.day = 1;
            endDay.month = 11;
            endDay.day = 31;
            bothDate.dayOfYear = date.getDayOfYear();
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
            bothDate.dayOfQuarter = date.getDayOfQuarter(); // 返回一个指定的日期对象为当前季度中的的第几天。
        }
        else if (type === CalendarTypes.MONTH) {
            const y = date.getFullYear();
            const m = date.getMonth();
            beginDay.month = m;
            beginDay.day = 1;
            endDay.month = m;
            endDay.day = getDayCountByMonth(m, y);
            bothDate.dayOfMonth = date.getDate(); // 返回一个指定的日期对象为一个月中的哪一日（从1--31）。
        }
        else if (type === CalendarTypes.WEEK) {
            const increment = (first_weekday === 0) ? 0 : (7 - first_weekday);
            let weekday = date.getDay() + increment; // 根据本地时间返回指定日期对象的星期中的第几天（0-6）。'
            if ( weekday >= 7 ) weekday = weekday % 7;

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
            bothDate.todayIndex = weekday;
        }
        else if (type === CalendarTypes.WEEKOFMONTH) {
            const increment = (first_weekday === 0) ? 0 : (7 - first_weekday);
            let weekday = date.getDay() + increment; // 根据本地时间返回指定日期对象的星期中的第几天（0-6）。'
            if ( weekday >= 7 ) weekday = weekday % 7;
            const first = new Calendar(date);
            // first.setHours(0, 0, 0);
            first.add(0 - weekday, CalendarTypes.DAY);
            const last = new Calendar(date);
            // last.setHours(23, 59, 59);
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
            const stepDate = new Calendar(date.toDatetime());// date; //new Calendar(); // 步长日
            const dayOfMonth = stepDate.getDate(); // 获取当前日子是本月的第几天
            stepDate.setDate(1);// 步长日, 从本月1日开始计算
            const stepYear = stepDate.getFullYear(); // 步长年份
            const stepMonth = stepDate.getMonth(); // 步长月份
            const weeks = [];
            bothDate.todayIndex = -1; // 当前日期在 weeks 中若不存在, 则该值为 -1
            let i = 0;
            while(stepDate.getMonth() === stepMonth){
                // 0. 定义周范围的日期对象
                const onceWeek = {begin: null, end: null, isCurrentWeek: false, raw: null};
                // 1. 查询当前日期是本周的第几天
                let dayOfWeek = stepDate.getDay() + increment;
                if ( dayOfWeek >= 7 ) dayOfWeek = dayOfWeek % 7;
                // 2. 如果不是 第一天(0),则向前 找补 n 天; 如果是, 则取今天为第一天
                if(dayOfWeek !== firstIndex) {
                    stepDate.add( 0 - dayOfWeek, CalendarTypes.DAY);
                }
                // 3. 设置这一周的第一天
                onceWeek.begin = stepDate.toDate();
                stepDate.setHours(0, 0, 0); // 日期范围中的时间段, 重置
                onceWeek.begin_format = dateFormat(format_str, stepDate);
                onceWeek.beginDate = stepDate.getDate(); // 开始的日份
                onceWeek.beginOfMonth = `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                onceWeek.raw = `${stepDate.getMonth() + 1}/${stepDate.getDate()}  ~  `; // 设置简单的展示方式
                const weekMonthBegin = stepDate.getMonth(); // 本周开始日期的月份
                const weekYearBegin = stepDate.getFullYear(); // 本周开始的年份
                // 4. 以当前日期为基准加 6 天, 寻找本周末尾时间
                stepDate.add( lastIndex, CalendarTypes.DAY);
                // 5. 设置这一周的最后一天
                onceWeek.end = stepDate.toDate();
                stepDate.setHours(23, 59, 59); // 日期范围中的时间段, 重置
                onceWeek.end_format = dateFormat(format_str, stepDate);
                onceWeek.endDate = stepDate.getDate(); // 结束的日份
                onceWeek.endOfMonth = `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                onceWeek.raw += `${stepDate.getMonth() + 1}/${stepDate.getDate()}`;
                const weekMonthEnd = stepDate.getMonth(); // 本周结束日期的月份
                const weekYearEnd = stepDate.getFullYear(); // 本周开始的年份
                onceWeek.title = onceWeek.raw;
                // 6. 判断是否是本周
                if (stepMonth > weekMonthBegin && dayOfMonth <= onceWeek.endDate) {
                    // 本周开始月份为上月, 但 对比日 小于等于本周结束日期时, 此周为 对比日 所在的周
                    onceWeek.isCurrentWeek = true;
                    bothDate.todayIndex = i; // 当前日期所在 weeks 数组的索引位置
                }
                else if (stepMonth < weekMonthEnd && dayOfMonth >= onceWeek.beginDate) {
                    // 本周结束月份为下月, 但 对比日 大于等于本周开始日期时, 此周为 对比日 所在的周
                    onceWeek.isCurrentWeek = true;
                    bothDate.todayIndex = i; // 当前日期所在 weeks 数组的索引位置
                }
                else if ( (stepYear === weekYearBegin && stepYear !== weekYearEnd && dayOfMonth >= onceWeek.beginDate) || 
                    (stepYear !== weekYearBegin && stepYear === weekYearEnd && dayOfMonth <= onceWeek.endDate)
                ){//weekYearEnd
                    // 当前日期所在的年份 与本周开始年份相同, 但与本周结束年份不同
                    // 或者 当前日期所在的年份 与本周开始年份不同, 但与本周结束年份相同 时
                    onceWeek.isCurrentWeek = true;
                    bothDate.todayIndex = i; // 当前日期所在 weeks 数组的索引位置
                }
                else if (stepMonth === weekMonthBegin && stepMonth === weekMonthEnd && dayOfMonth >= onceWeek.beginDate && dayOfMonth <= onceWeek.endDate){
                    // 日期都在本月内对比方式
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

        // 是否为 text 文本日期中的字段补齐 0
        // if (compleZero) {
        //     beginDay.text = [beginDay.year, (beginDay.month + 1), beginDay.day].map( d => `${d}`[1] ? d : `0${d}`).join('-');
        //     endDay.text = [endDay.year, (endDay.month + 1), endDay.day].map( d => `${d}`[1] ? d : `0${d}`).join('-');
        // } else {
        //     beginDay.text = [beginDay.year, (beginDay.month + 1), beginDay.day].join('-');
        //     endDay.text = [endDay.year, (endDay.month + 1), endDay.day].join('-');
        // }

        // 格式化文本 defaultDateFormat
        const beginDaytext = [beginDay.year, (beginDay.month + 1), beginDay.day].join('-').concat(' 00:00:00');
        const endDaytext = [endDay.year, (endDay.month + 1), endDay.day].join('-').concat(' 23:59:59');

        beginDay.text = dateFormat(format_str, new Date(beginDaytext));
        endDay.text = dateFormat(format_str, new Date(endDaytext));

        // 设置返回结果
        // bothDate.today = dateFormat(format_str, date);
        bothDate.beginDay = beginDay;
        bothDate.endDay = endDay;
        return bothDate;
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