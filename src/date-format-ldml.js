/*
 * Date Format LDML 1.0.0
 * The library is based on Steven Levithan's Date Format library
 * http://stevenlevithan.com/assets/misc/date.format.js.
 *
 * It follows Unicode locale data markup language standard syntax
 * http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
 * although not all format tokens are supported.
 *
 * It can optionally provide some extra info about what
 * tokens were actually used during formatting.
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
    var token = /d{1,2}|e{1,4}|E{1,4}|M{1,4}|y{1,4}|QQQ|w{1,2}|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

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

    var categories = {
        days: "days",
        months: "months",
        years: "years",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds",
        milliseconds: "milliseconds",
    };

    var ordinalDateTable = {
        0: 0, 1: 31, 2: 59, 3: 90, 4: 120, 5: 151, 6: 181, 7: 212, 8: 243, 9: 273, 10: 304, 11: 334,
    };

    var ordinalDateLeapTable = {
        0: 0, 1: 31, 2: 60, 3: 91, 4: 121, 5: 152, 6: 182, 7: 213, 8: 244, 9: 274, 10: 305, 11: 335,
    };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc, tokensUsed) {
        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

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
            d:    buildToken(d, categories.days),
            dd:   buildToken(pad(d), categories.days),
            E:    buildToken(i18n.dayNames[E], categories.days),
            EE:   buildToken(i18n.dayNames[E], categories.days),
            EEE:  buildToken(i18n.dayNames[E], categories.days),
            eee:  buildToken(i18n.dayNames[E], categories.days),
            EEEE: buildToken(i18n.dayNames[E + 7], categories.days),
            eeee: buildToken(i18n.dayNames[E + 7], categories.days),
            M:    buildToken(M + 1, categories.months),
            MM:   buildToken(pad(M + 1), categories.months),
            MMM:  buildToken(i18n.monthNames[M], categories.months),
            MMMM: buildToken(i18n.monthNames[M + 12], categories.months),
            y:    buildToken(y, categories.years),
            yy:   buildToken(String(y).slice(2), categories.years),
            yyy:  buildToken(String(y).slice(1), categories.years),
            yyyy: buildToken(y, categories.years),
            QQQ:  buildToken(i18n.quarter + (Math.floor(M / 3) + 1), categories.months),
            //https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_of_a_given_date
            w:    buildToken(Math.floor((d + getOrdinalDateOffset(y, M) - (E || 7) + 10) / 7), categories.days),
            h:    buildToken(H % 12 || 12, categories.hours),
            hh:   buildToken(pad(H % 12 || 12), categories.hours),
            H:    buildToken(H, categories.hours),
            HH:   buildToken(pad(H), categories.hours),
            m:    buildToken(m, categories.minutes),
            mm:   buildToken(pad(m), categories.minutes),
            s:    buildToken(s, categories.seconds),
            ss:   buildToken(pad(s), categories.seconds),
            l:    buildToken(pad(L, 3), categories.milliseconds),
            L:    buildToken(pad(L > 99 ? Math.round(L / 10) : L), categories.milliseconds),
            t:    buildToken(H < 12 ? "a"  : "p", categories.hours),
            tt:   buildToken(H < 12 ? "am" : "pm", categories.hours),
            T:    buildToken(H < 12 ? "A"  : "P", categories.hours),
            TT:   buildToken(H < 12 ? "AM" : "PM", categories.hours),
            Z:    buildToken(
                      utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                      categories.minutes),
            o:    buildToken(
                      (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                      categories.minutes),
            S:    buildToken(
                      ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
                      categories.days),
        };

        return mask.replace(token, function ($0) {
            if ($0 in tokens) {
                if (typeof tokensUsed !== "undefined") {
                    tokensUsed[tokens[$0].category] = true;
                }

                return tokens[$0].value;
            } else {
                return $0.slice(1, $0.length - 1);
            }
        });
    };


    function isLeapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }


    function getOrdinalDateOffset(fullYear, zeroBasedMonth) {
        return isLeapYear(fullYear) ?
            ordinalDateLeapTable[zeroBasedMonth] :
            ordinalDateTable[zeroBasedMonth];
    }


    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = "0" + val;
        };

        return val;
    };

    function buildToken(value, category) {
        return {
            value: value,
            category: category
        };
    };
});
