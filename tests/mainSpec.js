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

it("m handles both minute 1 and minute 2", function() {
    var datetime1 = new Date(2018, 03, 19, 14, 2, 31, 123);
    expect(dateFormat(datetime1, "m")).toBe("2");
    var datetime2 = new Date(2018, 03, 19, 14, 20, 31, 123);
    expect(dateFormat(datetime2, "m")).toBe("20");
});
