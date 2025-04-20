// Mock the document object
const mockDocument = {
    getElementById: function(id) {
        return {
            addEventListener: () => null,
            innerHTML: '', // Simulate the innerHTML property
        };
    },
    querySelector: () => {
        return {
            addEventListener: () => null,
            innerHTML: '', // Simulate the innerHTML property
        };
    }
};

// Assign the mock document to the global object
global.document = mockDocument;


const validateHumberId = require('../exercise/script');

describe('validateHumberId', () => {
    ['N12345678', 'n87654321'].forEach(id => {
        it(`should return true for valid Humber IDs (${id})`, () => {
            expect(validateHumberId(id)).toBe(true);
        });
    });

    ['123N45678', 'N1234567', 'N123456789', 'N1234567X', 'not valid', '!'].forEach(id => {
        it(`should return false for invalid Humber IDs (${id})`, () => {
            expect(validateHumberId(id)).toBe(false);
        });
    });

    [
        { value: '', result: 'Input should not be an empty string.' },
        { value: null, result: 'Please, don\'t use null here.' },
        { value: undefined, result: 'Undefined is not a valid input.' },
        { value: {}, result: 'Invalid input provided.' },
        { value: ['1'], result: 'Invalid input provided.' },
        { value: () => {}, result: 'Invalid input provided.' },
    ].forEach(({ value, result }) => {
        it(`should throw an error for invalid Humber IDs (${value})`, () => {
            expect(() => validateHumberId(value)).toThrowError(result);
        });
    });
});