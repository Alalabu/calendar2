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

`calendar2` 主要负责对于日期(时间)进行简单的计算操作。计算包括 **日期(时间)等值对比**、**日期范围计算**、**日期(时间)加减计算**等。calendar2 中包含两个主要对象 `Calendar` 和 `CalendarTypes`。

1. **Calendar**：Calendar是一个日期包装类，继承自 `Date`。通过 `new Calendar()` 可以创建一个可以进行计算的日期对象。
2. **CalendarTypes**：是一个枚举，属性包括 `YEAR`、`QUARTER`、`MONTH`、`WEEK`、`DAY`、`HOURS`、`MINUTES`、`SECONDS`。

### 依赖
- moment：`^2.24.0`

## 安装
> npm install calendar2 --save

## 构造函数
> new Calendar(); // 当前时间
> new Calendar( Date ); // 构造 `Date` 对象所表示的日期
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
> **`QUARTER`** : 季度
> **`MONTH`** : 月
> **`WEEK`** : 周
> **`WEEKOFMONTH`** : 表示选取当月所有的周范围列表，仅在函数 `toBothDate()` 调用时有效。
> **`DAY`** : 天
> **`HOURS`** : 小时
> **`MINUTES`** : 分
> **`SECONDS`** : 秒

#### 示例
```js
const {Calendar, CalendarTypes} = require('calendar2');

const cal = new Calendar(); // 当前时间

cal.add(-2, CalendarTypes.WEEK); // 表示在当前日期的基础上，减去两周时间
```

## 基础函数部分

### getFullYear()
> 获取当前日期中的年份, 同 `Date.prototype.getFullYear()`。

### getQuarter()
> 获取当前日期所表示的季度, 以 `0` 作为起始表示第一季度，以此类推。若解析错误则返回 null。

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

### getTime()
> 获取当前日期中的时间部分，返回字符串格式为 `HH:mm:ss`。


## 特殊函数部分

### equalsDate(otherDate)
> 由于 `object != object`, 因此函数简化了日期对比方式。
> 对比一个日期，如果一致则返回 `true`，反之返回 `false`。
> **仅对比日期部分**
> 
> `参数` : string | Date | Calendar
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

### equalsDateTime(otherDate)
> 由于 `object != object`, 因此函数简化了日期对比方式。
> 对比一个日期和时间，如果一致则返回 `true`，反之返回 `false`。
> **对比 日期 + 时间 部分**
> 
> `参数` : string | Date | Calendar
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

### toBothDate(types)
> 查询 **当前日期** 所处范围的 `开始日期` 和 `结束日期` ，`types` 可选值有：`CalendarTypes.YEAR`、`CalendarTypes.QUARTER`、`CalendarTypes.MONTH`、`CalendarTypes.WEEK`、`CalendarTypes.WEEKOFMONTH`。
> 
> `参数` : CalendarTypes
> `返回值` : object

#### 示例
```js
const cal = new Calendar('2020-05-20');

/**
 * 获取当前日期所在年份的 起止日期
 * 返回值: {
 *     beginDay: { year: 2020, month: 0, day: 1, text: '2020-1-1' }, 
 *     endDay: { year: 2020, month: 11, day: 31, text: '2020-12-31' }
 * }
 */
cal.toBothDate(CalendarTypes.YEAR);


/**
 * 获取当前日期所在季度的 起止日期
 * 返回值: {
 *     beginDay: { year: 2020, month: 3, day: 1, text: '2020-4-1' }, 
 *     endDay: { year: 2020, month: 5, day: 30, text: '2020-6-30' }  
 * }
 */
cal.toBothDate(CalendarTypes.QUARTER);


/**
 * 获取当前日期所在月份的 起止日期
 * 返回值: {
 *     beginDay: { year: 2020, month: 4, day: 1, text: '2020-5-1' }, 
 *     endDay: { year: 2020, month: 4, day: 31, text: '2020-5-31' } 
 * }
 */
cal.toBothDate(CalendarTypes.MONTH);


/**
 * 获取当前日期所在 周 的 起止日期
 * 返回值: {
 *     beginDay: { year: 2020, month: 4, day: 17, text: '2020-5-17' }, 
 *     endDay: { year: 2020, month: 4, day: 23, text: '2020-5-23' }
 * }
 */
cal.toBothDate(CalendarTypes.WEEK);


/**
 * 获取当前日期所在 周 的 起止日期, 包含当前月所包含的所有周列表
 * 返回值: {
 *     beginDay: { year: 2020, month: 4, day: 17, text: '2020-5-17' }, 
 *     endDay: { year: 2020, month: 4, day: 23, text: '2020-5-23' },
 *     weeks: [ {
 *         begin: '2020-04-26',		// 完整的开始日期
 *         end: '2020-05-02',		// 完整的结束日期
 *         isCurrentWeek: false,	// 是否是当前日期所在的周
 *         raw: '4/26  ~  5/2',		// 简单字符串表示
 *         beginDate: 26,			// 开始日期的日份
 *         endDate: 2				// 结束日期的日份
 *       },
 *       ...
 *       {
 *         begin: '2020-05-31',
 *         end: '2020-06-06',
 *         isCurrentWeek: false,
 *         raw: '5/31  ~  6/6',
 *         beginDate: 31,
 *         endDate: 6
 *       }
 *     ],
 * }
 */
cal.toBothDate(CalendarTypes.WEEKOFMONTH);
```

### add(value, types)
> 在当前日期值基础上进行 **±** 运算
> 函数并不会返回一个新值，**而是对原有 `Calendar` 对象进行日期变更。**
> 
> `参数` : 
> - **value** [number] 一个正（负）整数，表示日期变更量
> - **types** [CalendarTypes] 可选值有：`YEAR`、`MONTH`、`WEEK`、`DAY`、`HOURS`、`MINUTES`、`SECONDS`。
> 
> `返回值` : 无

#### 示例
```js
const cal = new Calendar('2020-05-20 18:01:01');

cal.add(1, CalendarTypes.DAY); // 增加 1 天 :  2020-05-21 18:01:01
cal.add(3, CalendarTypes.WEEK); // 增加 3 周 :  2020-06-11 18:01:01
cal.add(-2, CalendarTypes.MONTH); // 减少 2 月 :  2020-04-11 18:01:01
cal.add(+11, CalendarTypes.HOURS); // 增加 11 小时 :  2020-04-12 05:01:01
```

## 更新日志

> **v1.0.4**（2020-6-4）：
> * 添加函数 `calendar.getQuarter()`，表示当前日期的季度索引，从 `0` 作为起始表示第一季度，以此类推。若解析错误则返回 `null`。
> * 添加函数 `calendar.toTime()`，表示当前日期的时间部分字符串，格式为 `hh:mm:ss`。

> **v1.0.3**（2019-9-16）：添加新的范围选取类型 `CalendarTypes.WEEKOFMONTH`，表示选取当月所有的周范围列表。返回对象包含一个 `weeks` 属性，从前至后描述所有的周取值范围对象。详见**日期取值范围**中的描述。


## 提问交流

请到 [calendar2 issues](https://github.com/Alalabu/calendar2/issues) 异步交流。
