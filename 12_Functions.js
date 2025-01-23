// ******************** JAVASCRIPT FUNCTIONS GUIDE ********************

// ************ PART 1: FUNCTION BASICS ************

/*
WHAT IS A FUNCTION?
- A reusable block of code
- Can take inputs (parameters)
- Can return outputs
- First-class citizens in JavaScript (can be treated like any other value)

WHY USE FUNCTIONS?
1. Code reusability
2. Abstraction
3. Modularity
4. Organization

HOW TO CREATE FUNCTIONS?
1. Function Declaration
2. Function Expression
3. Arrow Functions
4. IIFE (Immediately Invoked Function Expression)
*/

// 1. Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// 2. Function Expression
const greetExp = function(name) {
    return `Hello, ${name}!`;
};

// 3. Arrow Function
const greetArrow = (name) => `Hello, ${name}!`;

// 4. IIFE
(function() {
    console.log('I run immediately!');
})();

// ************ PART 2: FUNCTION PARAMETERS ************

/*
PARAMETER FEATURES:
1. Default parameters
2. Rest parameters
3. Parameter destructuring
4. Arguments object
*/

// 1. Default Parameters
function createUser(name = 'Anonymous', age = 18) {
    return { name, age };
}

// 2. Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// 3. Parameter Destructuring
function processUser({ name, age, email = 'n/a' }) {
    console.log(`${name} is ${age} years old. Email: ${email}`);
}

// 4. Arguments Object (old way)
function oldStyle() {
    return Array.from(arguments).join(', ');
}

// ************ PART 3: ADVANCED CONCEPTS ************

/*
ADVANCED FEATURES:
1. Closures
2. Higher-Order Functions
3. Pure Functions
4. Currying
5. Composition
*/

// 1. Closures
function createCounter() {
    let count = 0;
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
}

// 2. Higher-Order Functions
function withLogging(fn) {
    return function(...args) {
        console.log('Before function execution');
        const result = fn(...args);
        console.log('After function execution');
        return result;
    };
}

// 3. Pure Functions
function add(a, b) {
    return a + b;  // Pure: same input always gives same output
}

// 4. Currying
const multiply = (a) => (b) => a * b;

// 5. Function Composition
const compose = (...fns) => (x) => 
    fns.reduceRight((acc, fn) => fn(acc), x);

// ************ PRACTICE PROBLEMS ************

/*
Problem 1: Create a Memoization Function
- Implement a function that caches results
- Handle multiple arguments
- Clear cache when needed
*/

// Solution:
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Usage:
const expensiveOperation = memoize((n) => {
    console.log('Computing...');
    return n * 2;
});

/*
Problem 2: Implement Function Throttling
- Control how often a function can be called
- Maintain context and arguments
- Handle edge cases
*/

// Solution:
function throttle(fn, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            return fn.apply(this, args);
        }
    };
}

// ************ FUNCTIONAL PROGRAMMING CONCEPTS ************

// 1. Map Implementation
Array.prototype.myMap = function(callback) {
    const result = [];
    for(let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// 2. Reduce Implementation
Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue === undefined ? this[0] : initialValue;
    const startIndex = initialValue === undefined ? 1 : 0;
    
    for(let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

// 3. Pipe Function (Left to Right Composition)
const pipe = (...fns) => (x) => 
    fns.reduce((acc, fn) => fn(acc), x);

// ************ PRACTICAL EXAMPLES ************

// 1. Debounce Implementation
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 2. Partial Application
function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

// 3. Once Function (Run Only Once)
function once(fn) {
    let hasRun = false;
    let result;
    
    return function(...args) {
        if (!hasRun) {
            result = fn.apply(this, args);
            hasRun = true;
        }
        return result;
    };
}

// ************ INTERVIEW QUESTIONS ************

/*
Q1: Explain closures and their use cases.
A: A closure is a function that has access to variables in its outer scope.
   Use cases: 
   - Data privacy
   - Partial application
   - Maintaining state

Q2: What's the difference between .call(), .apply(), and .bind()?
A: - call(): Executes function with given this and comma-separated arguments
   - apply(): Same as call but takes array of arguments
   - bind(): Returns new function with fixed this and optional preset arguments

Q3: How does 'this' work in different contexts?
A: - Global: refers to global object (window/global)
   - Method: refers to object that owns method
   - Constructor: refers to newly created instance
   - Arrow function: inherits this from enclosing scope

Q4: Explain function hoisting
A: Function declarations are hoisted (moved to top)
   Function expressions are not hoisted
*/

// ************ BEST PRACTICES ************

/*
1. Function Design:
   - Keep functions small and focused
   - Use meaningful names
   - Limit number of parameters
   - Return early when possible

2. Error Handling:
   - Validate input parameters
   - Use try-catch appropriately
   - Return consistent values

3. Performance:
   - Use memoization for expensive operations
   - Avoid creating functions in loops
   - Be careful with closures (memory)

4. Maintainability:
   - Document complex functions
   - Use TypeScript for better type safety
   - Write tests for important functions

5. Debugging:
   - Use meaningful error messages
   - Add logging for complex operations
   - Consider using source maps
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        memoize,
        throttle,
        debounce,
        partial,
        once,
        pipe,
        compose
    };
} 