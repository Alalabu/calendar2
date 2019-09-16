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

- **`日期(时间)等值对比`**：

方法 | 参数类型 | 返回值 | 描述
---  | --- | ---- | --------
equalsDate(otherDate) | string、Date、Calendar | bool | 以当前的Calendar对象，对比一个日期，如果一致则返回 `true`，反之返回 `false`。
equalsDateTime(otherDate) | string、Date、Calendar | bool | 以当前的Calendar对象，对比一个日期（包含时间），如果一致则返回 `true`，反之返回 `false`。

- **`日期范围计算`**：

方法 | 参数类型 | 返回值 | 描述
---  | --- | ---- | --------
toBothDate(types) | CalendarTypes | object | 查询当前时间所处范围的上限和下限，`types` 可选值有：`YEAR`、`QUARTER`、`MONTH`、`WEEK`。

> **范围计算说明**
> 1. 返回值对象包含两个属性：`beginDay` 和 `endDay`，他们被称之为是**简单时间标识（simple date identify）**。
> 2. `beginDay` 和 `endDay` 的属性结构为:  
> -- year [number]：年份  
> -- month [number] : 月份  
> -- day [number] : 日份(当月中的第几天)  
> -- text [string] : 日期的 `yyyy-mm-dd` 格式化字符串  
> 3. 例如当前的时间为：`2019-12-30`  
> -- **当 `types=YEAR` 时：**  
``` js
{ 
  beginDay: { year: 2019, month: 0, day: 1, text: '2019-1-1' },
  endDay: { year: 2019, month: 11, day: 31, text: '2019-12-31' } 
}
``` 
> -- **当 `types=QUARTER` 时：**  
``` js
{ 
  beginDay: { year: 2019, month: 9, day: 1, text: '2019-10-1' },
  endDay: { year: 2019, month: 11, day: 31, text: '2019-12-31' }
}
``` 
> -- **当 `types=MONTH` 时：**  
``` js
{ 
  beginDay: { year: 2019, month: 11, day: 1, text: '2019-12-1' },
  endDay: { year: 2019, month: 11, day: 31, text: '2019-12-31' }
}
``` 
> -- **当 `types=WEEK` 时：**  
``` js
{ 
  beginDay: { year: 2019, month: 11, day: 29, text: '2019-12-29' },
  endDay: { year: 2020, month: 0, day: 4, text: '2020-1-4' }
}
``` 
> -- **当 `types=WEEKOFMONTH` 时，返回结果为本月所有周范围数据：**  
``` js
{ weeks:
   [ { begin: '2019-12-01',
       end: '2019-12-07',
       isCurrentWeek: false,
       raw: '12/1  ~  12/7',
       beginDate: 1,
       endDate: 7 },
     { begin: '2019-12-08',
       end: '2019-12-14',
       isCurrentWeek: false,
       raw: '12/8  ~  12/14',
       beginDate: 8,
       endDate: 14 },
     { begin: '2019-12-15',
       end: '2019-12-21',
       isCurrentWeek: false,
       raw: '12/15  ~  12/21',
       beginDate: 15,
       endDate: 21 },
     { begin: '2019-12-22',
       end: '2019-12-28',
       isCurrentWeek: false,
       raw: '12/22  ~  12/28',
       beginDate: 22,
       endDate: 28 },
     { begin: '2019-12-29',
       end: '2020-01-04',
       isCurrentWeek: false,
       raw: '12/29  ~  1/4',
       beginDate: 29,
       endDate: 4 } ],
  beginDay: { year: 2019, month: 11, day: 29, text: '2019-12-29' },
  endDay: { year: 2020, month: 0, day: 4, text: '2020-1-4' } }
``` 

- **`日期(时间)加减计算`**：

方法 | 参数类型 | 返回值 | 描述
---  | --- | ---- | --------
add(value,types) | (number, CalendarTypes) | bool | 在当前日期值基础上进行 **±** 运算：`value`：可选值是一个正（负）整数，`types` 可选值有：`YEAR`、`MONTH`、`WEEK`、`HOURS`、`MINUTES`、`SECONDS`。


## calendar2 配置

### 依赖
- moment：`^2.24.0`

### 1. 安装

```bash
$ npm i calendar2 --save
```

### 2. 引用

```js
const {Calendar, CalendarTypes} = require('calendar2');

const cal1 = new Calendar(); // 当前时间
const cal2 = new Calendar(new Date('2019-08-09')); // 构造传入一个Date对象
const cal3 = new Calendar('2019-08-09'); // 构造传入一个日期字符串
```

### 3. 更新日志

> **v1.0.1**（2019-9-16）：添加新的范围选取类型 `CalendarTypes.WEEKOFMONTH`，表示选取当月所有的周范围列表。返回对象包含一个 `weeks` 属性，从前至后描述所有的周取值范围对象。详见**日期取值范围**中的描述。


## 提问交流

请到 [calendar2 issues](https://github.com/Alalabu/calendar2/issues) 异步交流。
