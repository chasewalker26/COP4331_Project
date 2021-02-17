const testTest = require("./main");

test("Returns correct products from list in database", () => {
    const data = testTest();
    expect(data).toBe(true);
});