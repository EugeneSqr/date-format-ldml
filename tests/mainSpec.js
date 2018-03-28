// the ultimate goal is to stick closer to this standard
// http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
it("default mask", function () {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime)).toBe("Mon Mar 19 2018 14:20:31");
});


it("y", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "y")).toBe("2018");
});

it("yy", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "yy")).toBe("18");
});

it("yyy", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "yyy")).toBe("018");
});

it("yyyy", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "yyyy")).toBe("2018");
});


it("QQQ", function() {
    expect(dateFormat(new Date(2018, 01 - 1), "QQQ")).toBe("Q1");
    expect(dateFormat(new Date(2018, 02 - 1), "QQQ")).toBe("Q1");
    expect(dateFormat(new Date(2018, 03 - 1), "QQQ")).toBe("Q1");
    expect(dateFormat(new Date(2018, 04 - 1), "QQQ")).toBe("Q2");
    expect(dateFormat(new Date(2018, 05 - 1), "QQQ")).toBe("Q2");
    expect(dateFormat(new Date(2018, 06 - 1), "QQQ")).toBe("Q2");
    expect(dateFormat(new Date(2018, 07 - 1), "QQQ")).toBe("Q3");
    expect(dateFormat(new Date(2018, 08 - 1), "QQQ")).toBe("Q3");
    expect(dateFormat(new Date(2018, 09 - 1), "QQQ")).toBe("Q3");
    expect(dateFormat(new Date(2018, 10 - 1), "QQQ")).toBe("Q4");
    expect(dateFormat(new Date(2018, 11 - 1), "QQQ")).toBe("Q4");
    expect(dateFormat(new Date(2018, 12 - 1), "QQQ")).toBe("Q4");
});

it("w", function() {
    expect(dateFormat(new Date(2016, 01 - 1, 3), "w")).toBe("0");
    expect(dateFormat(new Date(2016, 01 - 1, 10), "w")).toBe("1");
    expect(dateFormat(new Date(2016, 12 - 1, 31), "w")).toBe("52");


    expect(dateFormat(new Date(2017, 01 - 1, 1), "w")).toBe("0");
    expect(dateFormat(new Date(2017, 01 - 1, 8), "w")).toBe("1");
    expect(dateFormat(new Date(2017, 12 - 1, 31), "w")).toBe("52");

    expect(dateFormat(new Date(2018, 01 - 1, 1), "w")).toBe("1");
    expect(dateFormat(new Date(2018, 01 - 1, 8), "w")).toBe("2");
    expect(dateFormat(new Date(2018, 12 - 1, 31), "w")).toBe("53");

    expect(dateFormat(new Date(2019, 01 - 1, 1), "w")).toBe("1");
    expect(dateFormat(new Date(2019, 01 - 1, 7), "w")).toBe("2");
});


it("ww", function() {
    expect(dateFormat(new Date(2016, 01 - 1, 3), "ww")).toBe("00");
    expect(dateFormat(new Date(2016, 01 - 1, 10), "ww")).toBe("01");
    expect(dateFormat(new Date(2016, 12 - 1, 31), "ww")).toBe("52");


    expect(dateFormat(new Date(2017, 01 - 1, 1), "ww")).toBe("00");
    expect(dateFormat(new Date(2017, 01 - 1, 8), "ww")).toBe("01");
    expect(dateFormat(new Date(2017, 12 - 1, 31), "ww")).toBe("52");

    expect(dateFormat(new Date(2018, 01 - 1, 1), "ww")).toBe("01");
    expect(dateFormat(new Date(2018, 01 - 1, 8), "ww")).toBe("02");
    expect(dateFormat(new Date(2018, 12 - 1, 31), "ww")).toBe("53");

    expect(dateFormat(new Date(2019, 01 - 1, 1), "ww")).toBe("01");
    expect(dateFormat(new Date(2019, 01 - 1, 7), "ww")).toBe("02");
});

it("D", function() {
    expect(dateFormat(new Date(2016, 03 - 1, 3), "D")).toBe("63");
    expect(dateFormat(new Date(2017, 03 - 1, 3), "D")).toBe("62");
    expect(dateFormat(new Date(2016, 01 - 1, 3), "D")).toBe("3");
    expect(dateFormat(new Date(2017, 01 - 1, 3), "D")).toBe("3");
    expect(dateFormat(new Date(2016, 12 - 1, 31), "D")).toBe("366");
    expect(dateFormat(new Date(2017, 12 - 1, 31), "D")).toBe("365");
});

it("DD", function() {
    expect(dateFormat(new Date(2016, 03 - 1, 3), "DD")).toBe("63");
    expect(dateFormat(new Date(2017, 03 - 1, 3), "DD")).toBe("62");
    expect(dateFormat(new Date(2016, 01 - 1, 3), "DD")).toBe("03");
    expect(dateFormat(new Date(2017, 01 - 1, 3), "DD")).toBe("03");
    expect(dateFormat(new Date(2016, 12 - 1, 31), "DD")).toBe("366");
    expect(dateFormat(new Date(2017, 12 - 1, 31), "DD")).toBe("365");
});

it("DDD", function() {
    expect(dateFormat(new Date(2016, 03 - 1, 3), "DDD")).toBe("063");
    expect(dateFormat(new Date(2017, 03 - 1, 3), "DDD")).toBe("062");
    expect(dateFormat(new Date(2016, 01 - 1, 3), "DDD")).toBe("003");
    expect(dateFormat(new Date(2017, 01 - 1, 3), "DDD")).toBe("003");
    expect(dateFormat(new Date(2016, 12 - 1, 31), "DDD")).toBe("366");
    expect(dateFormat(new Date(2017, 12 - 1, 31), "DDD")).toBe("365");
});

it("e", function() {
    expect(dateFormat(new Date(2016, 03 - 1, 7), "e")).toBe("1");
    expect(dateFormat(new Date(2016, 03 - 1, 8), "e")).toBe("2");
    expect(dateFormat(new Date(2016, 03 - 1, 9), "e")).toBe("3");
    expect(dateFormat(new Date(2016, 03 - 1, 10), "e")).toBe("4");
    expect(dateFormat(new Date(2016, 03 - 1, 11), "e")).toBe("5");
    expect(dateFormat(new Date(2016, 03 - 1, 12), "e")).toBe("6");
    expect(dateFormat(new Date(2016, 03 - 1, 13), "e")).toBe("7");
});

it("ee", function() {
    expect(dateFormat(new Date(2016, 03 - 1, 7), "ee")).toBe("01");
    expect(dateFormat(new Date(2016, 03 - 1, 8), "ee")).toBe("02");
    expect(dateFormat(new Date(2016, 03 - 1, 9), "ee")).toBe("03");
    expect(dateFormat(new Date(2016, 03 - 1, 10), "ee")).toBe("04");
    expect(dateFormat(new Date(2016, 03 - 1, 11), "ee")).toBe("05");
    expect(dateFormat(new Date(2016, 03 - 1, 12), "ee")).toBe("06");
    expect(dateFormat(new Date(2016, 03 - 1, 13), "ee")).toBe("07");
});

it("M handles both month 1 and month 2", function() {
    var datetime1 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "M")).toBe("3");
    var datetime2 = new Date(2018, 12 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "M")).toBe("12");
});

it("MM handles both month 1 and month 2", function() {
    var datetime1 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "MM")).toBe("03");
    var datetime2 = new Date(2018, 12 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "MM")).toBe("12");
});

it("MMM handles month 3", function() {
    var datetime1 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "MMM")).toBe("Mar");
});

it("MMMM handles month 4", function() {
    var datetime1 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "MMMM")).toBe("March");
});

it("d handles both day 1 and day 2", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "d")).toBe("1");
    var datetime2 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "d")).toBe("19");
});

it("dd handles both day 1 and day 2", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime1, "dd")).toBe("01");
    var datetime2 = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "dd")).toBe("19");
});

it("E/EE/EEE/eee handle day of week", function() {
    var datetime = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime, "E")).toBe("Thu");
});

it("H hour 24", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 2, 20, 31, 123);
    expect(dateFormat(datetime1, "H")).toBe("2");
    var datetime2 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "H")).toBe("14");
});

it("HH hour 24", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 2, 20, 31, 123);
    expect(dateFormat(datetime1, "HH")).toBe("02");
    var datetime2 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "HH")).toBe("14");
});

it("h hour 12", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 2, 20, 31, 123);
    expect(dateFormat(datetime1, "h")).toBe("2");
    var datetime2 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "h")).toBe("2");
});

it("hh hour 12", function() {
    var datetime1 = new Date(2018, 03 - 1, 1, 2, 20, 31, 123);
    expect(dateFormat(datetime1, "hh")).toBe("02");
    var datetime2 = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "hh")).toBe("02");
});

it("m handles both minute 1 and minute 2", function() {
    var datetime1 = new Date(2018, 03, 19, 14, 2, 31, 123);
    expect(dateFormat(datetime1, "m")).toBe("2");
    var datetime2 = new Date(2018, 03, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "m")).toBe("20");
});

it("mm handles both minute 1 and minute 2", function() {
    var datetime1 = new Date(2018, 03, 19, 14, 2, 31, 123);
    expect(dateFormat(datetime1, "mm")).toBe("02");
    var datetime2 = new Date(2018, 03, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "mm")).toBe("20");
});

it("s handles both second 1 and second 2", function() {
    var datetime1 = new Date(2018, 03, 19, 14, 2, 3, 123);
    expect(dateFormat(datetime1, "s")).toBe("3");
    var datetime2 = new Date(2018, 03, 19, 14, 20, 30, 123);
    expect(dateFormat(datetime2, "s")).toBe("30");
});

it("ss handles both second 1 and second 2", function() {
    var datetime1 = new Date(2018, 03, 19, 14, 2, 1, 123);
    expect(dateFormat(datetime1, "ss")).toBe("01");
    var datetime2 = new Date(2018, 03, 19, 14, 20, 10, 123);
    expect(dateFormat(datetime2, "ss")).toBe("10");
});

it("escaping", function() {
    var datetime = new Date(2018, 03 - 1, 1, 14, 20, 31, 123);
    expect(dateFormat(datetime, "'yyyy': yyyy")).toBe("yyyy: 2018");
});
