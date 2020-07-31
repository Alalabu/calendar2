# calendar2

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/calendar2.svg?style=flat-square
[npm-url]: https://npmjs.org/package/calendar2
[travis-image]: https://img.shields.io/travis/eggjs/calendar2.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/calendar2
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/calendar2.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/calendar2?branch=master
[david-image]: https://img.shields.io/david/eggjs/calendar2.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/calendar2
[snyk-image]: https://snyk.io/test/npm/calendar2/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/calendar2
[download-image]: https://img.shields.io/npm/dm/calendar2.svg?style=flat-square
[download-url]: https://npmjs.org/package/calendar2

<!--
Description here.
-->

## 使用场景

`calendar2` 主要负责对于日期(时间)进行简单的计算操作。计算包括 **日期(时间)等值对比**、**日期范围计算**、**日期(时间)加减计算**、**罗列日期范围数组**等。calendar2 中包含两个主要对象 `Calendar` 和 `CalendarTypes`。

1. **Calendar**：Calendar是一个日期包装类，继承自 `Date`。通过 `new Calendar()` 可以创建一个可以进行计算的日期对象。
2. **CalendarTypes**：是一个枚举，属性包括 `YEAR`、`QUARTER`、`MONTH`、`WEEK`、`DAY`、`HOURS`、`MINUTES`、`SECONDS`。

### 依赖
- moment：`^2.24.0`
- date-format: `^3.0.0`

## 安装
> npm install calendar2 --save

## 构造函数
> new Calendar(); // 当前时间
> 
> new Calendar( Date ); // 构造 `Date` 对象所表示的日期
> 
> new Calendar( datestring ); // 构造 `datestring` 字符串所表示的日期

#### 示例
```js
const {Calendar, CalendarTypes} = require('calendar2');

const cal1 = new Calendar(); // 当前时间
const cal2 = new Calendar(new Date('2019-08-09')); // 构造传入一个Date对象
const cal3 = new Calendar('2019-08-09'); // 构造传入一个日期字符串
```
## 枚举
> **`YEAR`** : 年
> 
> **`QUARTER`** : 季度
> 
> **`MONTH`** : 月
> 
> **`WEEK`** : 周
> 
> **`WEEKOFMONTH`** : 表示包含选取当月所有的周范围列表，仅在函数 `toBothDate()` 调用时有效。
> 
> **`DAY`** : 天
> 
> **`HOURS`** : 小时
> 
> **`MINUTES`** : 分
> 
> **`SECONDS`** : 秒

#### 示例
```js
const {Calendar, CalendarTypes} = require('calendar2');

const cal = new Calendar(); // 当前时间

cal.add(-2, CalendarTypes.WEEK); // 表示在当前日期的基础上，减去两周时间
```

# 基础函数部分

### getFullYear()
> 获取当前日期中的年份, 同 `Date.prototype.getFullYear()`。

### getDayOfYear()
> 用于获取当前日期，是本年度中的第几天，返回一个 `Number` 格式的天数统计数字。

### getQuarter()
> 获取当前日期所在的季度索引, 以 `0` 作为起始表示第一季度，以此类推。若解析错误则返回 null。

### getDayOfQuarter()
> 用于获取当前日期，是本季度中的第几天，返回一个 `Number` 格式的天数统计数字。

### getMonth()
> 获取当前日期中的月份, 同 `Date.prototype.getMonth()`。

### getDate()
> 获取当前日期中的日期, 同 `Date.prototype.getDate()`。

### getHours()
> 获取当前日期中的小时, 同 `Date.prototype.getHours()`。

### getMinutes()
> 获取当前日期中的分, 同 `Date.prototype.getMinutes()`。

### getSeconds()
> 获取当前日期中的秒, 同 `Date.prototype.getSeconds()`。

### toDate()
> 获取当前日期中的日期部分，返回字符串格式为 `yyyy-MM-dd`。

### toDatetime()
> 获取当前日期中的完整日期和时间部分，返回字符串格式为 `yyyy-MM-dd HH:mm:ss`。

### toTime()
> 获取当前日期中的时间部分，返回字符串格式为 `HH:mm:ss`。

### toFormat( format_str )
> 用于返回自定义格式化的日期/时间文本，默认格式为 `yyyy-MM-dd hh:mm:ss`，具体可用格式化方案参考 [https://www.npmjs.com/package/date-format](https://www.npmjs.com/package/date-format "date-format")

#### 示例
```js
const now = new Calendar(); // 2020-06-04 16:42:05

console.log('Year: ', now.getFullYear());     // return 2020
console.log('Day Of Year: ', now.getDayOfYear());     // return 156
console.log('Quarter: ', now.getQuarter());   // return 1
console.log('Day Of Quarter: ', now.getDayOfQuarter());   // return 65
console.log('Month: ', now.getMonth());       // return 5
console.log('Date: ', now.getDate());         // return 4
console.log('Hours: ', now.getHours());       // return 16
console.log('Minutes: ', now.getMinutes());   // return 42
console.log('Seconds: ', now.getSeconds());   // return 5

console.log('toDate: ', now.toDate());        // return '2020-06-04'
console.log('toDatetime: ', now.toDatetime());// return '2020-06-04 16:42:05'
console.log('toTime: ', now.toTime());        // return '16:42:05'
console.log('toFormat: ', now.toFormat('yyyy年MM月dd日 hh:mm:ss'));        // return '2020年06月04日 16:42:05'
```


# 特殊函数部分

## 1. equalsDate(otherDate)
> 由于 `object != object`, 因此函数简化了日期对比方式。
> 
> 对比一个日期，如果一致则返回 `true`，反之返回 `false`。
> 
> **仅对比日期部分**
> 
> `参数` : string | Date | Calendar
> 
> `返回值` : boolean

#### 示例
```js
const datestring = '2020-01-01 16:16:16';
const date = new Date('2020-01-01 08:08:08');
const cal01 = new Calendar('2020-01-01 12:12:12');
const cal02 = new Calendar('2020-01-01 20:20:20');

cal01.equalsDate(datestring); 	// 返回: true
cal01.equalsDate(date); 		// 返回: true
cal01.equalsDate(cal02); 		// 返回: true
cal01.equalsDate('2020-01-02 12:12:12'); // 返回: false
```

## 2. equalsDateTime(otherDate)
> 由于 `object != object`, 因此函数简化了日期对比方式。
> 
> 对比一个日期和时间，如果一致则返回 `true`，反之返回 `false`。
> 
> **对比 日期 + 时间 部分**
> 
> `参数` : string | Date | Calendar
> 
> `返回值` : boolean

#### 示例
```js
const datestring = '2020-01-01 16:16:16';
const date = new Date('2020-01-01 08:08:08');
const cal01 = new Calendar('2020-01-01 12:12:12');
const cal02 = new Calendar('2020-01-01 20:20:20');

cal01.equalsDateTime(datestring); 	// 返回: false
cal01.equalsDateTime(date); 		// 返回: false
cal01.equalsDateTime(cal02); 		// 返回: false
cal01.equalsDateTime('2020-01-01 12:12:12'); // 返回: true
```

## 3. toBothDate(types, option)
> 查询 **当前日期** 所处范围的 `开始日期` 和 `结束日期` 
> 
> -- `types` 可选枚举有：`YEAR`、`QUARTER`、`MONTH`、`WEEK`、`WEEKOFMONTH`。
>
> -- `option.first_weekday`: 配置当前周首个的第一天是星期几，默认为 `0` 代表星期天，可选值范围：[0 ~ 6];
> 
> -- `option.format_str`: 配置当前日期范围返回的文本格式，默认为 `yyyy-MM-dd`;
> 
> `参数` : CalendarTypes
> 
> `返回值` : object

#### 示例
```js
const cal = new Calendar('2020-05-20');

/**
 * 获取当前日期所在年份的 起止日期
 * 返回值: {
 *     today: '2020-05-20',
 *     dayOfYear: 141,
 *     beginDay: { year: 2020, month: 0, day: 1, text: '2020-1-1' }, 
 *     endDay: { year: 2020, month: 11, day: 31, text: '2020-12-31' }
 * }
 */
cal.toBothDate(CalendarTypes.YEAR);


/**
 * 获取当前日期所在季度的 起止日期
 * 返回值: {
 *     today: '2020年05月20日',
 *     dayOfQuarter: 50,
 *     beginDay: { year: 2020, month: 3, day: 1, text: '2020年04月01日' }, 
 *     endDay: { year: 2020, month: 5, day: 30, text: '2020年06月30日' }  
 * }
 */
cal.toBothDate(CalendarTypes.QUARTER, {format_str: 'yyyy年MM月dd日'});


/**
 * 获取当前日期所在月份的 起止日期
 * 返回值: {
 *     today: '2020-05-20 00:00',
 *     dayOfMonth: 20,
 *     beginDay: { year: 2020, month: 4, day: 1, text: '2020-05-01 00:00' }, 
 *     endDay: { year: 2020, month: 4, day: 31, text: '2020-05-31 23:59' } 
 * }
 */
cal.toBothDate(CalendarTypes.MONTH, {format_str: 'yyyy-MM-dd hh:mm'});


/**
 * 获取当前日期所在 周 的 起止日期
 * 周首日默认从 0 (星期天) 开始计算
 * 返回值: {
 *     today: '2020年05月20日',
 *     todayIndex: 3, // 表示当前周的第几天, 索引从 0 开始计算
 *     beginDay: { year: 2020, month: 4, day: 17, text: '2020年05月17日' }, 
 *     endDay: { year: 2020, month: 4, day: 23, text: '2020年05月23日' }
 * }
 */
cal.toBothDate(CalendarTypes.WEEK, {format_str: 'yyyy年MM月dd日'});

/**
 * 获取当前日期所在 周 的 起止日期
 * 周首日默认从 1 (星期一) 开始计算
 * 返回值: {
 *     today: '2020年05月20日',
 *     todayIndex: 2,
 *     beginDay: { year: 2020, month: 4, day: 18, text: '2020年05月18日' },
 *     endDay: { year: 2020, month: 4, day: 24, text: '2020年05月24日' }
 * }
 */
cal.toBothDate(CalendarTypes.WEEK, {first_weekday: 1, format_str: 'yyyy年MM月dd日'});


/**
 * 获取当前日期所在 周 的 起止日期, 包含当前月所包含的所有周列表
 * 周日期的计算是从 星期日 作为第一天, 进行计数
 * 返回值: {
 *     beginDay: { year: 2020, month: 4, day: 17, text: '2020-5-17' }, 
 *     endDay: { year: 2020, month: 4, day: 23, text: '2020-5-23' },
 *     today: '2020-05-20',
 *     todayIndex: 3,				// 当前日期所在weeks中的索引位置, 若无则值为 -1
 *     weeks: [ {
 *         begin: '2020-04-26',		// 完整的开始日期
 *         end: '2020-05-02',		// 完整的结束日期
 *         begin_format: '2020-04-26', // 日期格式化之后的开始时间文本
 *         end_format: '2020-05-02', // 日期格式化之后的结束时间文本
 *         isCurrentWeek: false,	// 是否是当前日期所在的周
 *         raw: '4/26  ~  5/2',		// (待废弃, 勿用)
 *         title: '4/26  ~  5/2',	// 简单字符串表示
 *         beginDate: 26,			// 开始日期的日份
 *         endDate: 2				// 结束日期的日份
 *         beginOfMonth: '4/26',	// 包含月/日的开始日期
 *         endOfMonth: '5/2',		// 包含月/日的结束日期
 *       },
 *       ...
 *       {
 *         begin: '2020-05-31',
 *         end: '2020-06-06',
 *         begin_format: '2020-05-31', // 日期格式化之后的开始时间文本
 *         end_format: '2020-06-06', // 日期格式化之后的结束时间文本
 *         isCurrentWeek: false,
 *         raw: '5/31  ~  6/6',
 *         title: '5/31  ~  6/6',
 *         beginDate: 31,
 *         endDate: 6,
 *         beginOfMonth: '5/31',
 *         endOfMonth: '6/6',
 *       }
 *     ],
 * }
 */
cal.toBothDate(CalendarTypes.WEEKOFMONTH);
```

## 4. add(value, types)
> 在当前日期值基础上进行 **±** 运算
> 
> 函数并不会返回一个新值，**而是对原有 `Calendar` 对象进行日期变更。**
> 
> `参数` : 
> 
> - **value** [number] 一个正（负）整数，表示日期变更量
> 
> - **types** [CalendarTypes] 可选枚举有：`YEAR`、`MONTH`、`WEEK`、`DAY`、`HOURS`、`MINUTES`、`SECONDS`。
> 
> `返回值` : `undefined`

#### 示例
```js
const cal = new Calendar('2020-05-20 18:01:01');

cal.add(1, CalendarTypes.DAY); // 增加 1 天 :  2020-05-21 18:01:01
cal.add(3, CalendarTypes.WEEK); // 增加 3 周 :  2020-06-11 18:01:01
cal.add(-2, CalendarTypes.MONTH); // 减少 2 月 :  2020-04-11 18:01:01
cal.add(+11, CalendarTypes.HOURS); // 增加 11 小时 :  2020-04-12 05:01:01
```
# 静态函数
## 1. getDateUnits(option)
> 获取某范围内的所有日期单位, 范围确定方式:
> 
> 1. 通过 `begin` 和 `end` 确定日期范围。优先级靠前（参数都满足的情况下优先使用方案1范围）
> 
> 2. 通过 `seed` 作为当前的种子日期, 以 `incr` 作为种子增量, 范围为 seed ~ (seed + incr) 之间;
> 
> 
> `参数` : 
> 
> - **option.begin** [String|Date] 起始日期
> 
> - **option.end** [String|Date] 结束日期
> 
> - **option.incr** [Integer] 日期增量
> 
> - **option.seed** [String|Date] 日期种子
> 
> - **option.particle** [CalendarTypes] 粒度，仅支持：`YEAR`、`MONTH`、`DAY`，默认为： `CalendarTypes.DAY`
> 
> - **option.format** [String] 格式化方式，默认为 `yyyy-MM-dd`
> 
> - **option.order** [String] 排序方式, 支持方式: `ASC`(正序)、`DESC`(倒序), 默认为 `ASC`
> 
> `返回值` : `{begin_date, end_date, dates}`


#### 示例1: 通过 `begin` 和 `end` 获取日期范围
```js
// 1-1 日范围筛选
Calendar.getDateUnits({
	begin: '2020-06-29',
	end: '2020-07-4',
});

/**
 * 1-1 返回值: 
 * {
 *   begin_date: '2020-06-29',
 *   end_date: '2020-07-04',
 *   dates: [
 *     { year: 2020, month: 5, day: 29, txt: '2020-06-29' },
 *     { year: 2020, month: 5, day: 30, txt: '2020-06-30' },
 *     { year: 2020, month: 6, day: 1, txt: '2020-07-01' },
 *     { year: 2020, month: 6, day: 2, txt: '2020-07-02' },
 *     { year: 2020, month: 6, day: 3, txt: '2020-07-03' },
 *     { year: 2020, month: 6, day: 4, txt: '2020-07-04' }
 *   ]
 * }
 */



// 1-2 月范围筛选
Calendar.getDateUnits({
	begin: '2020-11', // 范围可以只到月份
	end: '2021-02-21', // 也可以是具体的日期字符串或 Date 对象
	particle: CalendarTypes.MONTH,
});

/**
 * 1-2 返回值: 
 * {
 *   begin_date: '2020-11',
 *   end_date: '2021-02',
 *   dates: [
 *     { year: 2020, month: 10, txt: '2020-11' },
 *     { year: 2020, month: 11, txt: '2020-12' },
 *     { year: 2021, month: 0, txt: '2021-01' },
 *     { year: 2021, month: 1, txt: '2021-02' }
 *   ]
 * }
 */



// 1-3 日范围筛选
Calendar.getDateUnits({
	begin: '2019-06-29',
	end: '2025',
	particle: CalendarTypes.YEAR,
	order: 'DESC', // 倒序排序
	format: 'yyyy年', // 格式化
});

/**
 * 1-3 返回值: 
 * {
 *   begin_date: '2019年',
 *   end_date: '2025年',
 *   dates: [
 *     { year: 2025, txt: '2025年' },
 *     { year: 2024, txt: '2024年' },
 *     { year: 2023, txt: '2023年' },
 *     { year: 2022, txt: '2022年' },
 *     { year: 2021, txt: '2021年' },
 *     { year: 2020, txt: '2020年' },
 *     { year: 2019, txt: '2019年' }
 *   ]
 * }
 */

```

#### 示例2: 通过 `seed` 作为当前的种子日期, 以 `incr` 作为种子增量获取范围:
```js
// 2-1 日期向前增加 5 天 (返回包含 seed 日期的 6 条数据)
Calendar.getDateUnits({
	seed: '2020-06-29',
	incr: 5,
});

/**
 * 2-1 返回值: 
 * {
 *   begin_date: '2020-06-29',
 *   end_date: '2020-07-04',
 *   dates: [
 *     { year: 2020, month: 5, day: 29, txt: '2020-06-29' },
 *     { year: 2020, month: 5, day: 30, txt: '2020-06-30' },
 *     { year: 2020, month: 6, day: 1, txt: '2020-07-01' },
 *     { year: 2020, month: 6, day: 2, txt: '2020-07-02' },
 *     { year: 2020, month: 6, day: 3, txt: '2020-07-03' },
 *     { year: 2020, month: 6, day: 4, txt: '2020-07-04' }
 *   ]
 * }
 */



// 2-2 日期向后减少 5 天 (返回包含 seed 日期的 6 条数据)
Calendar.getDateUnits({
	seed: '2020-06-2',
	incr: -5, // 增量给与负数
});

/**
 * 2-2 返回值: 
 * {
 *   begin_date: '2020-05-28',
 *   end_date: '2020-06-02',
 *   dates: [
 *     { year: 2020, month: 4, day: 28, txt: '2020-05-28' },
 *     { year: 2020, month: 4, day: 29, txt: '2020-05-29' },
 *     { year: 2020, month: 4, day: 30, txt: '2020-05-30' },
 *     { year: 2020, month: 4, day: 31, txt: '2020-05-31' },
 *     { year: 2020, month: 5, day: 1, txt: '2020-06-01' },
 *     { year: 2020, month: 5, day: 2, txt: '2020-06-02' }
 *   ]
 * }
 */
```

## 更新日志
> **v1.1.0**（2020-8-1）：
>
> 1. **添加** 静态函数 `getDateUnits(option)`, 以便获取相应时间范围包含的所有日期数组;
> 
> 2. **修复** `add()` 函数在当前日份 **大于 前进/后退的月中的日份** 时, 会丢失跳转精度的问题;
> 
> **v1.0.91**（2020-7-17）：
> 
> 1. **移除** `assert` 包工具的调用，避免微信小程序等其他环境中产生的包加载异常；
> 
> **v1.0.9**（2020-6-16）： ``
> 
> 1. **移除** `options.compleZero` 配置，所有返回的日期/时间文本，需要补齐 `0` 都会默认补齐；
> 2. **添加** 函数 `getDayOfYear()`，用于获取当前日期，是本年度中的第几天；
> 3. **添加** 函数 `getDayOfQuarter()`，用于获取当前日期，是本季度中的第几天；
> 4. **添加** 函数 `toFormat(format_str)`，用于返回自定义格式化的日期/时间文本，默认格式为 `yyyy-MM-dd hh:mm:ss`，具体可用格式化方案参考 [https://www.npmjs.com/package/date-format](https://www.npmjs.com/package/date-format "date-format")；
> 5. **修改** 函数 `toBothDate(type, option)` 中的 `option` 参数如下: 
> -- `option.first_weekday`: 配置当前周首个的第一天是星期几，默认为 `0` 代表星期天，可选值范围：[0 ~ 6];
> -- `option.format_str`: 配置当前日期范围返回的文本格式，默认为 `yyyy-MM-dd`;
> 6. **修复** 其他已知问题;
> 
> 
> **v1.0.8**（2020-6-9）：
> 
> * 添加可配置参数: `toBothDate(CalendarTypes, options)` 。
> * options.compleZero: 为返回数据中的文本字段 `text` 补全 `0`,即默认情况下返回值为 `{beginDay: { year: 2020, month: 0, day: 1, text: '2020-1-1' }}`，当设置 `options.compleZero = true` 时，返回值为：`{beginDay: { year: 2020, month: 0, day: 1, text: '2020-01-01' }}`。
> 
> **v1.0.7**（2020-6-5）：
> 
> * 修复一个 `toBothDate(CalendarTypes.WEEKOFMONTH)` 过程中监测本周位置的问题。
> 
> **v1.0.6**（2020-6-4）：
> 
> * 修复了一个由 `cal.toBothDate(CalendarTypes.WEEKOFMONTH)`引发的当前日期对象值变化的问题。
> 
> * 为函数 `cal.toBothDate(CalendarTypes.WEEKOFMONTH)` 的返回值添加属性 `todayIndex`, 表示当前日期在 `weeks` 周数组中的索引位置。若不存在，则该值为 `-1`。
> 
> * 为函数 `cal.toBothDate(CalendarTypes.WEEKOFMONTH)` 的 `weeks` 数组对象添加属性：`title`、`beginOfMonth`、`endOfMonth`, 并预计废除属性 `raw`。
> 
> **v1.0.5**（2020-6-4）：
> 
> * 添加函数 `calendar.getQuarter()`，表示当前日期的季度索引，从 `0` 作为起始表示第一季度，以此类推。若解析错误则返回 `null`。
> 
> * 添加函数 `calendar.toTime()`，表示当前日期的时间部分字符串，格式为 `hh:mm:ss`。

> **v1.0.3**（2019-9-16）：添加新的范围选取类型 `CalendarTypes.WEEKOFMONTH`，表示选取当月所有的周范围列表。返回对象包含一个 `weeks` 属性，从前至后描述所有的周取值范围对象。详见**日期取值范围**中的描述。


## 提问交流

请到 [calendar2 issues](https://github.com/Alalabu/calendar2/issues) 异步交流。
