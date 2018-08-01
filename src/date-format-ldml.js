/*
 * Date Format LDML 2.2.0
 * The library is based on Steven Levithan's Date Format library
 * http://stevenlevithan.com/assets/misc/date.format.js.
 *
 * It follows Unicode locale data markup language standard syntax
 * http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
 * although not all format tokens are supported.
 *
 * MIT license
 */

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.dateFormat = factory();
    }
})(this, function() {
    var token = /d{1,2}|e{1,4}|E{1,4}|M{1,4}|y{1,4}|QQQ|w{1,2}|D{1,3}|a|ZZZZ|Z|([Hhms])\1?|[LlS]|"[^"]*"|'[^']*'/g;
    var defaultMask = "E MMM dd yyyy HH:mm:ss";
    // Internationalization strings
    var i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        quarter: "Q",
    };
    var ordinalDateTable = {
        0: 0, 1: 31, 2: 59, 3: 90, 4: 120, 5: 151, 6: 181, 7: 212, 8: 243, 9: 273, 10: 304, 11: 334,
    };
    var ordinalDateLeapTable = {
        0: 0, 1: 31, 2: 60, 3: 91, 4: 121, 5: 152, 6: 182, 7: 213, 8: 244, 9: 274, 10: 305, 11: 335,
    };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) {
            throw SyntaxError("invalid date");
        }

        mask = mask || defaultMask;

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get";
        var d = date[_ + "Date"]();
        var E = date[_ + "Day"]();
        var M = date[_ + "Month"]();
        var y = date[_ + "FullYear"]();
        var H = date[_ + "Hours"]();
        var m = date[_ + "Minutes"]();
        var s = date[_ + "Seconds"]();
        var L = date[_ + "Milliseconds"]();
        var o = utc ? 0 : date.getTimezoneOffset();
        var tokens = {
            d:    d,
            dd:   pad(d),
            D:    getDayOfYear(),
            DD:   pad(getDayOfYear()),
            DDD:  pad(getDayOfYear(), 3),
            E:    i18n.dayNames[E],
            EE:   i18n.dayNames[E],
            EEE:  i18n.dayNames[E],
            EEEE: i18n.dayNames[E + 7],
            e:    getDayOfWeek(),
            ee:   pad(getDayOfWeek()),
            eee:  i18n.dayNames[E],
            eeee: i18n.dayNames[E + 7],
            M:    M + 1,
            MM:   pad(M + 1),
            MMM:  i18n.monthNames[M],
            MMMM: i18n.monthNames[M + 12],
            y:    y,
            yy:   String(y).slice(2),
            yyy:  String(y).slice(1),
            yyyy: y,
            QQQ:  i18n.quarter + (Math.floor(M / 3) + 1),
            w:    getWeekOfYear(),
            ww:   pad(getWeekOfYear()),
            h:    get12Hours(),
            hh:   pad(get12Hours()),
            H:    H,
            HH:   pad(H),
            m:    m,
            mm:   pad(m),
            s:    s,
            ss:   pad(s),
            l:    pad(L, 3),
            L:    pad(getCentiseconds()),
            a:    getPeriod(),
            Z:    getTimeZoneOffset(),
            ZZZZ: getLongTimeZoneOffset(),
            S:    getOrdinalSuffix(),
        };

        return mask.replace(token, function ($0) {
            return $0 in tokens ?
                tokens[$0] :
                $0.slice(1, $0.length - 1);
        });

        function getDayOfWeek() {
            return E || 7;
        }

        function get12Hours() {
            return H % 12 || 12;
        }

        // +03:00
        function getTimeZoneOffset() {
            return (o > 0 ? "-" : "+") +
                pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
        }

        // GMT+3:00
        function getLongTimeZoneOffset() {
            var offset = getTimeZoneOffset();
            return "GMT" + offset.substring(0, 1) +
                parseInt(offset.substring(1, 3)) + ":" +
                offset.substring(3);
        }

        function getOrdinalSuffix() {
            return ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10];
        }

        function getWeekOfYear() {
            //https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_of_a_given_date
            var dayOfYear = getDayOfYear(d, y, M);
            return Math.floor((dayOfYear - (getDayOfWeek()) + 10) / 7);
        }

        function getDayOfYear() {
            var isLeapYear = ((y % 4 == 0) && (y % 100 != 0)) ||
                (y % 400 == 0);
            return d + (isLeapYear ?
                ordinalDateLeapTable[M] :
                ordinalDateTable[M]);
        }

        function getPeriod() {
            return H < 12 ? "AM" : "PM";
        }


        function getCentiseconds() {
            return L > 99 ? Math.round(L / 10) : L;
        }
    };

    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = "0" + val;
        }

        return val;
    }
});
