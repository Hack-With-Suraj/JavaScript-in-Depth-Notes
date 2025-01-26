// ******************** JAVASCRIPT CONSOLE IN-DEPTH GUIDE ********************

// ************ PART 1: BASIC CONSOLE METHODS ************

/*
WHAT IS CONSOLE?
- Built-in debugging tool
- Provides various methods for debugging
- Available in browsers and Node.js
- Essential for development and troubleshooting

CONSOLE FEATURES:
1. Output different types of messages
2. Format and style output
3. Time operations
4. Count operations
5. Group related messages
6. Create tables from data
7. Track stack traces
*/

// 1. Basic Output Methods
console.log('Basic message');      // General output
console.info('Info message');      // Informational output
console.warn('Warning message');   // Warning output
console.error('Error message');    // Error output
console.debug('Debug message');    // Debug output

// 2. Styled Console Output
console.log('%cStyled text', 'color: blue; font-size: 20px; font-weight: bold');

// 3. Placeholder Formatting
console.log('Hello %s', 'World');     // String
console.log('Number: %d', 42);        // Number
console.log('Object: %o', {a: 1});    // Object