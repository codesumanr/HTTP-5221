function validateHumberId(input) {
    if (typeof input === 'undefined') {
        throw new Error('Undefined is not a valid input.');
    }
    if (input === null) {
        throw new Error('Please, don\'t use null here.');
    }
    if (typeof input !== 'string') {
        throw new Error('Invalid input provided.');
    }
    if (input.trim() === '') {
        throw new Error('Input should not be an empty string.');
    }

    const regex = /^[nN]\d{8}$/;
    return regex.test(input);
}

function testValidateHumberId() {
    const testCases = [
        { input: 'N12345678', expected: true },
        { input: '123N45678', expected: false },
        { input: 'n1234567', expected: false },
        { input: 'N123456789', expected: false },
        { input: 'X12345678', expected: false },
        { input: '', expected: 'Input should not be an empty string.' },
        { input: null, expected: 'Please, don\'t use null here.' },
        { input: undefined, expected: 'Undefined is not a valid input.' },
        { input: { key: 'value' }, expected: 'Invalid input provided.' }
    ];

    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';

    testCases.forEach((testCase) => {
        try {
            const result = validateHumberId(testCase.input);
            if (result === testCase.expected) {
                resultsElement.innerHTML += `<p>Test passed: function returned ${result}</p>`;
            } else {
                resultsElement.innerHTML += `<p>Test failed: function returned ${result}, expected ${testCase.expected}</p>`;
            }
        } catch (error) {
            if (error.message === testCase.expected) {
                resultsElement.innerHTML += `<p>Test passed: function returned ${error.message}</p>`;
            } else {
                resultsElement.innerHTML += `<p>Test failed: function returned ${error.message}, expected ${testCase.expected}</p>`;
            }
        }
    });
}

testValidateHumberId();

module.exports = validateHumberId;