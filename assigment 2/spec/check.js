function checkNumber(value) {
    const strValue = String(value).trim();
    
    // Check for empty or non-numeric input
    if (!strValue || isNaN(strValue)) {
        return 'Missing input';
    }
    
    const num = Number(strValue);
    
    // Check range boundaries
    if (num <= 17 || num >= 99) {
        return 'Wrong number';
    }
    
    // Check secret number
    if (num === 87) {
        return 'Congratulations!';
    }
    
    // Provide feedback
    return num < 87 
        ? 'Your number is less than secret. Try again.'
        : 'Your number is more than secret. Try again.';
}
// Add module export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkNumber };
}