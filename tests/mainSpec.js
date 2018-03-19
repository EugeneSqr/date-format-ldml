// the ultimate goal is to stick closer to this standard
// http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
it("default mask", function () {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime)).toBe("Mon Mar 19 2018 14:20:31");
});

it("Year 4", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "yyyy")).toBe("2018");
});

it("Year 2", function() {
    var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime, "yy")).toBe("18");
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
