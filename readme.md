# Overview
This is a date formatting library based on [Steven Levithan's Date Format 1.2.3](http://blog.stevenlevithan.com/archives/date-time-format), that attempts to stay closer to Unicode locale data markup language standard.
# Installation and usage
Use npm to get the library and reference it on your HTML page
```
npm install date-format-ldml
```
The library is AMD and Commonjs aware, but it can be used without them:
```javascript
var datetime = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
console.log(dateFormat(datetime, "yyyy MM dd HH:mm:ss - L"));
```
> 2018 03 01 14:20:31 - 12
# Masks
Initial masks were changed to stay closer to the [unicode standard](http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns). Here is the table of all supported characters:

| Mask     | Description                                                                                                                                                                     |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| d        | Day of the month as digits; no leading zero for single-digit days                                                                                                               |
| dd       | Day of the month as digits; leading zero for single-digit days                                                                                                                  |
| D        | Day of the year as digits; no leading zero for single-digit days                                                                                                                |
| DD       | Day of the year as digits; leading zero for single-digit days                                                                                                                   |
| DDD      | Day of the year as digits; two leading zeroes for two-digit days                                                                                                                |
| E        | Day of the week as a three-letter abbreviation                                                                                                                                  |
| EE       | Day of the week as a three-letter abbreviation                                                                                                                                  |
| EEE      | Day of the week as a three-letter abbreviation                                                                                                                                  |
| EEEE     | Day of the week as its full name                                                                                                                                                |
| e        | Day of the week as digits; no leading zero for single-digit days. Monday is 1, Sunday is 7                                                                                      |
| ee       | Day of the week as digits; leading zero for single-digit days. Monday is 01, Sunday is 07                                                                                       |
| eee      | Day of the week as a three-letter abbreviation                                                                                                                                  |
| eeee     | Day of the week as its full name                                                                                                                                                |
| M        | Month as digits; no leading zero for single-digit months                                                                                                                        |
| MM       | Month as digits; leading zero for single-digit months                                                                                                                           |
| MMM      | Month as a three-letter abbreviation                                                                                                                                            |
| MMMM     | Month as its full name                                                                                                                                                          |
| y        | Year represented by four digits                                                                                                                                                 |
| yy       | Year as last two digits; leading zero for years less than 10                                                                                                                    |
| yyy      | Year as last three digits; two leading zeroes for years less than 10                                                                                                            |
| yyyy     | Year represented by four digits                                                                                                                                                 |
| QQQ      | Quarter. Q1, Q2, Q3, Q4                                                                                                                                                         |
| w        | Week of year as digits according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_of_a_given_date); no leading zero for single-digit weeks |
| ww       | Week of year as digits according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_of_a_given_date); leading zero for single-digit weeks    |
| h        | Hours; no leading zero for single-digit hours (12-hour clock)                                                                                                                   |
| hh       | Hours; leading zero for single-digit hours (12-hour clock)                                                                                                                      |
| H        | Hours; no leading zero for single-digit hours (24-hour clock)                                                                                                                   |
| HH       | Hours; leading zero for single-digit hours (24-hour clock)                                                                                                                      |
| m        | Minutes; no leading zero for single-digit minutes                                                                                                                               |
| mm       | Minutes; leading zero for single-digit minutes                                                                                                                                  |
| s        | Seconds; no leading zero for single-digit seconds                                                                                                                               |
| ss       | Seconds; leading zero for single-digit seconds                                                                                                                                  |
| l or L   | Milliseconds. l gives 3 digits. L gives 2 digits                                                                                                                                |
| a        | AM or PM                                                                                                                                                                        |
| Z        | GMT/UTC timezone offset, e.g. -0500 or +0230                                                                                                                                    |
| ZZZZ     | US timezone abbreviation, e.g. EST or MDT. With non-US time zones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500                                        |
| S        | The date's ordinal suffix (st, nd, rd, or th). Works well with d                                                                                                                |
| '…'or"…" | Literal character sequence. Surrounding quotes are removed                                                                                                                      |
| UTC:     | Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed                    |
