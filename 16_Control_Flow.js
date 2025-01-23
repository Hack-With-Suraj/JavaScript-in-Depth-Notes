// ******************** JAVASCRIPT CONTROL FLOW GUIDE ********************

// ************ PART 1: BASIC CONTROL FLOW ************

/*
WHAT IS CONTROL FLOW?
- Order in which code statements are executed
- Determines program logic and branching
- Controls how data flows through application
- Foundation of programming logic

TYPES OF CONTROL FLOW:
1. Conditional Statements (if, else, switch)
2. Loops (for, while, do-while)
3. Error Handling (try-catch)
4. Jumps (break, continue, return)
5. Async Flow Control (Promises, async/await)
*/

// ************ 1. CONDITIONAL STATEMENTS ************

// 1.1 if...else
function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else if (age >= 13) {
        return "Teenager";
    } else {
        return "Child";
    }
}

// 1.2 Switch Statement
function getDayName(dayNumber) {
    switch (dayNumber) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        // ... other days
        default:
            return "Invalid day";
    }
}

// 1.3 Ternary Operator
const isAdult = age => age >= 18 ? "Adult" : "Minor";

// ************ 2. LOOPS AND ITERATIONS ************

// 2.1 for Loop
function sumArray(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

// 2.2 while Loop
function countdown(from) {
    while (from > 0) {
        console.log(from);
        from--;
    }
}

// 2.3 do...while Loop
function getValidInput() {
    let input;
    do {
        input = prompt("Enter a number > 0");
    } while (input <= 0);
    return input;
}

// 2.4 for...of Loop (Iterables)
function processArray(arr) {
    for (const item of arr) {
        console.log(item);
    }
}

// 2.5 for...in Loop (Objects)
function listProperties(obj) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(`${prop}: ${obj[prop]}`);
        }
    }
}

// ************ 3. ERROR HANDLING ************

// 3.1 Basic try-catch
function divideNumbers(a, b) {
    try {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    } finally {
        console.log("Operation completed");
    }
}

// 3.2 Custom Error Types
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// ************ PART 2: ADVANCED CONTROL FLOW ************

// 1. Generator Functions
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// 2. Async Control Flow
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

// 3. Promise Chaining
function processUserData(userId) {
    return fetchUserData(userId)
        .then(user => validateUser(user))
        .then(user => updateUser(user))
        .catch(error => handleError(error));
}

// ************ PRACTICAL EXAMPLES ************

// 1. State Machine
class TrafficLight {
    constructor() {
        this.states = ['red', 'green', 'yellow'];
        this.currentState = 0;
    }
    
    next() {
        this.currentState = (this.currentState + 1) % this.states.length;
        return this.states[this.currentState];
    }
    
    get state() {
        return this.states[this.currentState];
    }
}

// 2. Recursive Control Flow
function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    // Recursive case
    return n * factorial(n - 1);
}

// 3. Event-Driven Control Flow
class EventHandler {
    constructor() {
        this.events = new Map();
    }
    
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }
    
    emit(event, data) {
        const handlers = this.events.get(event) || [];
        handlers.forEach(handler => handler(data));
    }
}

// ************ ADVANCED PATTERNS ************

// 1. Pipeline Pattern
const pipeline = (...functions) => input => 
    functions.reduce((acc, fn) => fn(acc), input);

// Usage:
const processText = pipeline(
    text => text.trim(),
    text => text.toLowerCase(),
    text => text.replace(/\s+/g, '_')
);

// 2. Command Pattern
class CommandManager {
    constructor() {
        this.commands = [];
        this.current = -1;
    }
    
    execute(command) {
        this.commands.push(command);
        this.current++;
        command.execute();
    }
    
    undo() {
        if (this.current >= 0) {
            this.commands[this.current].undo();
            this.current--;
        }
    }
}

// 3. Async Iterator Pattern
async function* asyncNumberGenerator() {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

// ************ BEST PRACTICES ************

/*
1. Error Handling:
   - Always catch potential errors
   - Use specific error types
   - Provide meaningful error messages
   - Clean up resources in finally block

2. Async Flow:
   - Prefer async/await over raw promises
   - Handle all promise rejections
   - Use proper error boundaries
   - Consider cancellation patterns

3. Loops and Iterations:
   - Choose appropriate loop type
   - Avoid infinite loops
   - Consider performance implications
   - Use break/continue appropriately

4. Conditional Logic:
   - Keep conditions simple
   - Use early returns
   - Avoid deep nesting
   - Consider switch alternatives
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's the difference between for...in and for...of?
A: - for...in iterates over enumerable properties
   - for...of iterates over iterable values
   - for...in used for objects
   - for...of used for arrays/iterables

Q2: Explain async/await vs Promises
A: - async/await is syntactic sugar over Promises
   - Makes async code look synchronous
   - Better error handling with try/catch
   - Easier to reason about

Q3: What are Generators and their use cases?
A: - Functions that can pause execution
   - Yield multiple values
   - Useful for iteration
   - Can handle infinite sequences

Q4: How to handle nested async operations?
A: - Use Promise.all for parallel operations
   - Use async/await for sequential operations
   - Consider error boundaries
   - Handle timeouts appropriately
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        TrafficLight,
        EventHandler,
        CommandManager,
        pipeline
    };
} 