// The task:

// Create a function which:

// should return 'Nothing was provided' if no value was provided to it.
// should return 'Error! Choose between 1 and 12.' if a value is not a valid month (less than 1 and more than 12) or not a number.
// should return 'Try again.' if a value equals to current month (set to 10).
// should return 'Good job!' if a value is a valid month, not current.


function validateMonth(month) {
    const currentMonth = 10;

    // Check if no value is provided (undefined or null)
    if (month === undefined || month === null) {
        return 'Nothing was provided';
    }

    // Check if the value is not a number or is NaN
    if (typeof month !== 'number' || isNaN(month)) {
        return 'Error! Choose between 1 and 12.';
    }

    // Check if the month is outside the valid range (1–12)
    if (month < 1 || month > 12) {
        return 'Error! Choose between 1 and 12.';
    }

    // Check if the month is the current month
    if (month === currentMonth) {
        return 'Try again.';
    }

    // If all checks pass, return 'Good job!'
    return 'Good job!';
}

module.exports = validateMonth;