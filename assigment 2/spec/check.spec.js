const { checkNumber } = require('./check.js');
describe("checkNumber() Function Tests", function () {
    // Edge cases
    it("should return 'Missing input' for empty input", function () {
        expect(checkNumber("")).toBe("Missing input");
    });

    it("should return 'Missing input' for non-numeric input", function () {
        expect(checkNumber("abc")).toBe("Missing input");
    });

    it("should return 'Wrong number' for numbers less than 17", function () {
        expect(checkNumber("16")).toBe("Wrong number");
    });

    it("should return 'Wrong number' for numbers greater than 99", function () {
        expect(checkNumber("100")).toBe("Wrong number");
    });

    it("should return 'Your number is less than secret. Try again.' for numbers between 17 and 86", function () {
        expect(checkNumber("50")).toBe("Your number is less than secret. Try again.");
    });

    it("should return 'Your number is more than secret. Try again.' for numbers between 88 and 99", function () {
        expect(checkNumber("90")).toBe("Your number is more than secret. Try again.");
    });

    // Correct number case
    it("should return 'Congratulations!' for the number 87", function () {
        expect(checkNumber("87")).toBe("Congratulations!");
    });

    // Non-numeric values
    it("should return 'Missing input' for null", function () {
        expect(checkNumber(null)).toBe("Missing input");
    });

    it("should return 'Missing input' for undefined", function () {
        expect(checkNumber(undefined)).toBe("Missing input");
    });

    it("should return 'Missing input' for a boolean value", function () {
        expect(checkNumber(true)).toBe("Missing input");
    });
});