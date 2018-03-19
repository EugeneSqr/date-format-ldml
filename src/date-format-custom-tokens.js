/*
 * Date Format Custom Tokens 1.0.0
 * The library is based on Steven Levithan's Date Format library
 * http://stevenlevithan.com/assets/misc/date.format.js.
 * It allows to override date tokens and get extra info about what
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
    var token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

    var defaultMask = "ddd MMM dd yyyy HH:mm:ss";
    // Internationalization strings
    var i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
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
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = mask || defaultMask;

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get";
        var d = date[_ + "Date"]();
        var D = date[_ + "Day"]();
        var M = date[_ + "Month"]();
        var y = date[_ + "FullYear"]();
        var H = date[_ + "Hours"]();
        var m = date[_ + "Minutes"]();
        var s = date[_ + "Seconds"]();
        var L = date[_ + "Milliseconds"]();
        var o = utc ? 0 : date.getTimezoneOffset();
        var flags = {
            d:    d,
            dd:   pad(d),
            ddd:  i18n.dayNames[D],
            dddd: i18n.dayNames[D + 7],
            M:    M + 1,
            MM:   pad(M + 1),
            MMM:  i18n.monthNames[M],
            MMMM: i18n.monthNames[M + 12],
            yy:   String(y).slice(2),
            yyyy: y,
            h:    H % 12 || 12,
            hh:   pad(H % 12 || 12),
            H:    H,
            HH:   pad(H),
            m:    m,
            mm:   pad(m),
            s:    s,
            ss:   pad(s),
            l:    pad(L, 3),
            L:    pad(L > 99 ? Math.round(L / 10) : L),
            t:    H < 12 ? "a"  : "p",
            tt:   H < 12 ? "am" : "pm",
            T:    H < 12 ? "A"  : "P",
            TT:   H < 12 ? "AM" : "PM",
            Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };

    function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = "0" + val;
        };

        return val;
    };
});
