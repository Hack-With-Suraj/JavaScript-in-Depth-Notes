// ******************** THIS AND ARROW FUNCTIONS IN JAVASCRIPT ********************

// ************ PART 1: THE 'THIS' KEYWORD FUNDAMENTALS ************

/*
WHAT IS 'THIS'?
- Special keyword that refers to the current execution context
- Value changes based on how and where function is called
- Not related to where function is defined (except arrow functions)
- One of the most confusing parts of JavaScript

WHEN IS 'THIS' DETERMINED?
- During function execution (runtime)
- Depends on function invocation pattern
- Can be explicitly set using bind, call, or apply
*/

// ************ 1. GLOBAL CONTEXT ************

// In non-strict mode
console.log(this);  // Window (browser) or global (Node.js)

// In strict mode
'use strict';
console.log(this);  // undefined in functions, Window/global in global scope

// ************ 2. OBJECT METHOD CONTEXT ************

const user = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);  // 'this' refers to user object
    },
    
    // Nested function problem
    delayedGreet() {
        function delayed() {
            console.log(`Hello, ${this.name}!`);  // 'this' is undefined/window
        }
        setTimeout(delayed, 1000);
    }
};

// ************ 3. CONSTRUCTOR FUNCTION CONTEXT ************

function User(name) {
    this.name = name;  // 'this' refers to the new object being created
    
    this.sayHi = function() {
        console.log(`Hi, I'm ${this.name}`);
    };
}

const john = new User('John');  // 'this' bound to john object

// ************ 4. EVENT HANDLER CONTEXT ************

/*
button.addEventListener('click', function() {
    console.log(this);  // 'this' refers to the button element
});
*/

// ************ PART 2: ARROW FUNCTIONS ************

/*
WHAT ARE ARROW FUNCTIONS?
- Shorter syntax for function expressions
- Lexical 'this' binding
- No own 'this', arguments, super, or new.target
- Can't be used as constructors

WHY USE ARROW FUNCTIONS?
1. Shorter syntax
2. Lexical this binding
3. Implicit return
4. Clear intent in functional programming
*/

// ************ 1. ARROW FUNCTION SYNTAX ************

// Basic syntax
const add = (a, b) => a + b;  // Implicit return

// Multiple parameters
const multiply = (a, b) => {
    return a * b;  // Explicit return with block
};

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const getRandomNumber = () => Math.random();

// ************ 2. LEXICAL THIS BINDING ************

const counter = {
    count: 0,
    
    // Regular function loses 'this'
    startRegular: function() {
        setTimeout(function() {
            this.count++;  // 'this' is window/undefined
            console.log(this.count);
        }, 1000);
    },
    
    // Arrow function preserves 'this'
    startArrow: function() {
        setTimeout(() => {
            this.count++;  // 'this' is counter object
            console.log(this.count);
        }, 1000);
    }
};

// ************ 3. COMMON USE CASES ************

// 1. Array Methods
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);

// 2. Promise Chains
fetchData()
    .then(data => processData(data))
    .then(result => console.log(result))
    .catch(error => handleError(error));

// 3. Event Handlers
/*
element.addEventListener('click', () => {
    this.classList.toggle('active');  // Warning: 'this' is not element!
});
*/

// ************ 4. LIMITATIONS AND GOTCHAS ************

// 1. Can't be used as constructors
const Person = (name) => {
    this.name = name;  // Error: can't use 'new' with arrow function
};

// 2. No arguments object
const args = () => console.log(arguments);  // Error: arguments not defined

// 3. Can't bind, call, or apply 'this'
const greet = () => console.log(this.name);
greet.call({name: 'John'});  // 'this' still refers to original context

// ************ PRACTICAL EXAMPLES ************

// 1. Class Methods with Callbacks
class DataHandler {
    constructor(data) {
        this.data = data;
    }
    
    processWithDelay() {
        // Arrow function preserves 'this'
        setTimeout(() => {
            console.log(this.data);
        }, 1000);
    }
}

// 2. Method Shorthand vs Arrow
const api = {
    data: [],
    
    // Method shorthand (preferred for methods)
    fetch() {
        // 'this' is api object
    },
    
    // Arrow function (preferred for callbacks)
    process: () => {
        // 'this' is not api object!
    }
};

// ************ INTERVIEW QUESTIONS ************

/*
Q1: How does 'this' work in arrow functions vs regular functions?
A: - Regular functions: 'this' determined by call site
   - Arrow functions: 'this' inherited from enclosing scope
   - Arrow functions can't be bound to different 'this'

Q2: When should you NOT use arrow functions?
A: - Object methods
   - Constructor functions
   - Event handlers needing 'this' to refer to element
   - Methods requiring arguments object

Q3: How can you fix 'this' context in callbacks?
A: - Use arrow functions
   - Bind the function
   - Store 'this' in variable (const self = this)
   - Use method shorthand in objects

Q4: What's the difference between call/apply and bind?
A: - call/apply: Immediately invoke with new 'this'
   - bind: Returns new function with fixed 'this'
*/

// ************ BEST PRACTICES ************

/*
1. Arrow Function Usage:
   - Use for callbacks and short functions
   - Use when you need to preserve 'this'
   - Avoid for methods and constructors
   - Consider readability

2. Regular Function Usage:
   - Use for object methods
   - Use when you need 'this' to be dynamic
   - Use when you need arguments object
   - Use for constructors

3. Context Management:
   - Understand how 'this' works in different contexts
   - Be consistent with function style in similar situations
   - Document when 'this' behavior is important
   - Use TypeScript for better type checking

4. Debugging:
   - Console.log 'this' to check context
   - Use debugger to inspect scope
   - Watch for common pitfalls
   - Test in different environments
*/

// ************ ADDITIONAL PRACTICAL EXAMPLES ************

// 1. Real-World Event Handler Example
/*
PROBLEM: Button Click Counter
- Need to track number of clicks
- Update UI with count
- Handle multiple buttons
*/

class ClickCounter {
    constructor(buttonId) {
        this.count = 0;
        this.button = document.getElementById(buttonId);
        
        // BAD: 'this' will be wrong
        // this.button.addEventListener('click', function() {
        //     this.count++;  // 'this' refers to button, not class
        // });
        
        // GOOD: Arrow function preserves 'this'
        this.button.addEventListener('click', () => {
            this.count++;
            this.updateDisplay();
        });
    }
    
    updateDisplay() {
        this.button.textContent = `Clicked ${this.count} times`;
    }
}

// 2. Data Processing Pipeline
/*
PROBLEM: Process Array of User Data
- Filter users by age
- Transform data
- Calculate statistics
*/

const userProcessor = {
    minAge: 18,
    
    processUsers(users) {
        return users
            // Arrow functions great for short transformations
            .filter(user => user.age >= this.minAge)
            .map(user => ({
                name: user.name.toUpperCase(),
                age: user.age,
                canVote: user.age >= 18
            }))
            .reduce((stats, user) => {
                stats.totalAge += user.age;
                stats.count++;
                return stats;
            }, { totalAge: 0, count: 0 });
    }
};

// 3. Async Data Fetcher
/*
PROBLEM: Fetch and Cache Data
- Fetch data from API
- Cache results
- Handle errors
- Maintain context
*/

class DataFetcher {
    constructor() {
        this.cache = new Map();
    }
    
    async fetchData(url) {
        // Arrow function to preserve 'this' in Promise chain
        return new Promise((resolve, reject) => {
            if (this.cache.has(url)) {
                resolve(this.cache.get(url));
                return;
            }
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.cache.set(url, data);
                    resolve(data);
                })
                .catch(error => {
                    console.error('Failed to fetch:', error);
                    reject(error);
                });
        });
    }
}

// 4. Timer with Controls
/*
PROBLEM: Implement Timer
- Start/Stop functionality
- Pause/Resume
- Maintain state
- Handle cleanup
*/

class Timer {
    constructor() {
        this.seconds = 0;
        this.intervalId = null;
    }
    
    start() {
        if (this.intervalId) return;
        
        // Arrow function crucial here for 'this' binding
        this.intervalId = setInterval(() => {
            this.seconds++;
            this.display();
        }, 1000);
    }
    
    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    display() {
        console.log(`Time: ${this.seconds} seconds`);
    }
}

// 5. Method Borrowing Example
/*
PROBLEM: Borrow Methods Between Objects
- Show different 'this' behaviors
- Demonstrate method borrowing
- Compare arrow vs regular functions
*/

const methods = {
    regularMethod() {
        return this.value;
    },
    
    arrowMethod: () => this.value,  // 'this' is lexically scoped
    
    // Method that creates closures
    createGetter() {
        // Regular function - 'this' from call site
        const regular = function() { return this.value; };
        
        // Arrow function - 'this' from createGetter
        const arrow = () => this.value;
        
        return { regular, arrow };
    }
};

// 6. Event Emitter Implementation
/*
PROBLEM: Create Event System
- Register event handlers
- Emit events
- Maintain correct 'this' binding
*/

class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
        // Bind callback to preserve caller's 'this'
        this.events[event].push(callback.bind(this));
    }
    
    emit(event, data) {
        const callbacks = this.events[event] || [];
        callbacks.forEach(callback => callback(data));
    }
}

// ************ COMMON GOTCHAS AND SOLUTIONS ************

/*
1. Callback Context Loss
PROBLEM: 'this' lost in callbacks
SOLUTION: Use arrow functions or bind

Example:
*/
class DataService {
    constructor() {
        this.data = [];
    }
    
    // WRONG
    fetchDataBad() {
        fetch('/api/data')
            .then(function(response) {
                this.data = response;  // 'this' is undefined
            });
    }
    
    // RIGHT
    fetchDataGood() {
        fetch('/api/data')
            .then(response => {
                this.data = response;  // 'this' is DataService
            });
    }
}

/*
2. Method Assignment
PROBLEM: Losing 'this' when assigning methods
SOLUTION: Bind method or use arrow function

Example:
*/
class Button {
    constructor(text) {
        this.text = text;
        
        // WRONG
        // const onClick = this.handleClick;
        
        // RIGHT
        const onClick = this.handleClick.bind(this);
        // OR
        const onClickArrow = () => this.handleClick();
    }
}

/*
3. Partial Application with 'this'
PROBLEM: Maintaining 'this' while partially applying arguments
SOLUTION: Use arrow functions or bind

Example:
*/
function partial(fn, ...args) {
    return (...moreArgs) => fn.apply(this, [...args, ...moreArgs]);
}

// ************ DEBUGGING TIPS ************

/*
1. Console Logging 'this':
function debugThis() {
    console.log('this:', this);
    console.log('typeof this:', typeof this);
    console.log('this constructor:', this.constructor.name);
}

2. Check Binding:
const boundFunction = fn.bind(obj);
console.log(boundFunction.name);  // "bound fn"

3. Arrow Function Check:
const isArrow = fn.prototype === undefined;

4. Context Testing:
function checkContext(fn, obj) {
    fn.call(obj);
    fn.apply(obj);
    fn.bind(obj)();
}
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        ClickCounter,
        DataFetcher,
        Timer,
        EventEmitter,
        userProcessor
    };
} 