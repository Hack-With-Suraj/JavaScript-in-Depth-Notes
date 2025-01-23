// ******************** GETTERS, SETTERS, AND STACK OVERFLOW IN JAVASCRIPT ********************

// ************ PART 1: GETTERS AND SETTERS ************

/*
WHAT ARE GETTERS/SETTERS?
- Special methods that get/set values
- Look like regular properties
- Can contain validation logic
- Control access to object properties
- Part of JavaScript property descriptors

WHY USE THEM?
1. Data validation
2. Computed properties
3. Encapsulation
4. Side effects handling
*/

// ************ 1. BASIC GETTER/SETTER ************

// 1.1 Object Literal Getters/Setters
const person = {
    firstName: 'John',
    lastName: 'Doe',
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    }
};

// 1.2 Class Getters/Setters
class Circle {
    #radius = 0;  // Private field
    
    get radius() {
        return this.#radius;
    }
    
    set radius(value) {
        if (value < 0) {
            throw new Error('Radius cannot be negative');
        }
        this.#radius = value;
    }
    
    get area() {
        return Math.PI * this.#radius ** 2;
    }
}

// ************ 2. ADVANCED GETTER/SETTER PATTERNS ************

// 2.1 Computed Properties
class Rectangle {
    #width = 0;
    #height = 0;
    #cache = new Map();
    
    set dimensions([width, height]) {
        this.#width = width;
        this.#height = height;
        this.#cache.clear();  // Clear cached values
    }
    
    get area() {
        if (!this.#cache.has('area')) {
            this.#cache.set('area', this.#width * this.#height);
        }
        return this.#cache.get('area');
    }
    
    get perimeter() {
        if (!this.#cache.has('perimeter')) {
            this.#cache.set('perimeter', 2 * (this.#width + this.#height));
        }
        return this.#cache.get('perimeter');
    }
}

// 2.2 Validation and Type Checking
class User {
    #email = '';
    
    set email(value) {
        if (!User.#isValidEmail(value)) {
            throw new Error('Invalid email format');
        }
        this.#email = value;
    }
    
    get email() {
        return this.#email;
    }
    
    static #isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// ************ 3. STACK OVERFLOW HANDLING ************

// 3.1 Basic Stack Overflow Example
function recursiveFunction(n) {
    if (n === 0) return;
    recursiveFunction(n - 1);  // Can cause stack overflow
}

// 3.2 Stack Overflow Prevention
class SafeRecursion {
    static MAX_DEPTH = 1000;
    
    static recursiveWithLimit(n, depth = 0) {
        if (depth > this.MAX_DEPTH) {
            throw new Error('Maximum recursion depth exceeded');
        }
        if (n === 0) return;
        this.recursiveWithLimit(n - 1, depth + 1);
    }
    
    // Using iteration instead of recursion
    static iterative(n) {
        while (n > 0) {
            n--;
        }
    }
}

// 3.3 Tail Call Optimization
function factorial(n, accumulator = 1) {
    if (n === 0) return accumulator;
    return factorial(n - 1, n * accumulator);
}

// ************ 4. ADVANCED STACK MANAGEMENT ************

// 4.1 Trampoline Function
function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}

// Usage with factorial
const safeFactorial = trampoline(function f(n, acc = 1) {
    if (n === 0) return acc;
    return () => f(n - 1, n * acc);
});

// 4.2 Generator-based Stack Management
function* fibonacciGenerator() {
    let prev = 0, curr = 1;
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

// 4.3 Async Stack Management
class AsyncStack {
    static async processLargeArray(array, fn, batchSize = 1000) {
        for (let i = 0; i < array.length; i += batchSize) {
            const batch = array.slice(i, i + batchSize);
            await Promise.all(batch.map(fn));
            await new Promise(resolve => setTimeout(resolve, 0));  // Let event loop breathe
        }
    }
}

// ************ 5. PRACTICAL EXAMPLES ************

// 5.1 Observable Properties
class Observable {
    #value;
    #observers = new Set();
    
    constructor(initialValue) {
        this.#value = initialValue;
    }
    
    get value() {
        return this.#value;
    }
    
    set value(newValue) {
        if (this.#value !== newValue) {
            this.#value = newValue;
            this.#notifyObservers();
        }
    }
    
    addObserver(observer) {
        this.#observers.add(observer);
    }
    
    #notifyObservers() {
        for (const observer of this.#observers) {
            observer(this.#value);
        }
    }
}

// 5.2 Memory-Efficient Collection
class LazyCollection {
    #data = new Map();
    #computeValue;
    
    constructor(computeValue) {
        this.#computeValue = computeValue;
    }
    
    get(key) {
        if (!this.#data.has(key)) {
            this.#data.set(key, this.#computeValue(key));
        }
        return this.#data.get(key);
    }
}

// ************ 6. BEST PRACTICES ************

/*
1. Getter/Setter Design:
   - Keep them lightweight
   - Cache computed values
   - Validate input data
   - Consider side effects

2. Stack Management:
   - Monitor recursion depth
   - Use iteration when possible
   - Implement batch processing
   - Consider memory usage

3. Performance:
   - Cache computed properties
   - Use appropriate data structures
   - Implement lazy evaluation
   - Handle large datasets carefully

4. Error Handling:
   - Validate input thoroughly
   - Handle edge cases
   - Provide clear error messages
   - Implement recovery strategies
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: When to use getters vs methods?
A: - Getters for computed properties
   - Getters for read-only values
   - Methods for operations
   - Methods for async operations

Q2: How to prevent stack overflow?
A: - Use iteration instead of recursion
   - Implement depth limits
   - Use trampolining
   - Consider async approaches

Q3: What are property descriptors?
A: - Define property behavior
   - Control enumeration
   - Set writability
   - Configure deletion

Q4: How to handle large recursive operations?
A: - Break into smaller chunks
   - Use async processing
   - Implement iterative solutions
   - Consider worker threads
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        Circle,
        User,
        SafeRecursion,
        AsyncStack,
        Observable,
        LazyCollection
    };
} 