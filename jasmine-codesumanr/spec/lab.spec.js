const validateMonth = require('./lab.js'); // Correct path

describe('validateMonth', () => {
    // Edge cases
    it('should return "Nothing was provided" if no value is provided', () => {
        expect(validateMonth()).toEqual('Nothing was provided');
    });

    it('should return "Error! Choose between 1 and 12." if month is less than 1', () => {
        expect(validateMonth(0)).toEqual('Error! Choose between 1 and 12.');
    });

    it('should return "Error! Choose between 1 and 12." if month is greater than 12', () => {
        expect(validateMonth(13)).toEqual('Error! Choose between 1 and 12.');
    });

    it('should return "Error! Choose between 1 and 12." if month is NaN', () => {
        expect(validateMonth(NaN)).toEqual('Error! Choose between 1 and 12.');
    });

    it('should return "Nothing was provided" if month is null', () => {
        expect(validateMonth(null)).toEqual('Nothing was provided');
    });

    it('should return "Nothing was provided" if month is undefined', () => {
        expect(validateMonth(undefined)).toEqual('Nothing was provided');
    });

    // Valid not current month value
    it('should return "Good job!" if month is valid and not current month', () => {
        expect(validateMonth(5)).toEqual('Good job!');
    });

    // Valid current month value
    it('should return "Try again." if month is current month', () => {
        expect(validateMonth(10)).toEqual('Try again.');
    });

    // Non-numeric values
    it('should return "Error! Choose between 1 and 12." if month is a string', () => {
        expect(validateMonth('hello')).toEqual('Error! Choose between 1 and 12.');
    });

    it('should return "Error! Choose between 1 and 12." if month is an object', () => {
        expect(validateMonth({})).toEqual('Error! Choose between 1 and 12.');
    });

    it('should return "Error! Choose between 1 and 12." if month is an array', () => {
        expect(validateMonth([])).toEqual('Error! Choose between 1 and 12.');
    });
});