var datetime = new Date(2018, 03 - 1, 19, 14, 20, 31, 123);

it("default mask", function () {
    expect(dateFormat(datetime)).toBe("Mon Mar 19 2018 14:20:31");
});
