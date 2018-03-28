# Overview
This is a date formatting library based on [Steven Levithan's Date Format 1.2.3](http://blog.stevenlevithan.com/archives/date-time-format), that follows Unicode locale data markup language standard.
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
