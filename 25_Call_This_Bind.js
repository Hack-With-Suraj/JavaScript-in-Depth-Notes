// ******************** CALL, APPLY, BIND, AND THIS IN JAVASCRIPT ********************

// ************ PART 1: 'THIS' FUNDAMENTALS ************

/*
WHAT IS 'THIS'?
- Reference to current execution context
- Value changes based on how function is called
- Not determined by where function is defined
- Can be explicitly set using call, apply, bind

THIS CONTEXTS:
1. Global context
2. Object method
3. Constructor function
4. Event handlers
5. Arrow functions
*/

// ************ 1. THIS IN DIFFERENT CONTEXTS ************

// 1.1 Global Context
console.log(this);  // Window (browser) or global (Node.js)

// 1.2 Object Method
const user = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);
    }
};

user.greet();  // Hello, John!

// 1.3 Constructor Function
function Person(name) {
    this.name = name;
    this.sayHi = function() {
        console.log(`Hi, I'm ${this.name}`);
    };
}

const john = new Person('John');
john.sayHi();  // Hi, I'm John

// 1.4 Event Handler
/*
button.addEventListener('click', function() {
    console.log(this);  // button element
});
*/

// 1.5 Arrow Functions
const arrowUser = {
    name: 'Arrow',
    greet: () => {
        console.log(`Hello, ${this.name}`);  // this is from outer scope
    }
};

// ************ 2. CALL METHOD ************

// 2.1 Basic Call Usage
function introduce(greeting) {
    console.log(`${greeting}, I'm ${this.name}`);
}

const person1 = { name: 'John' };
const person2 = { name: 'Jane' };

introduce.call(person1, 'Hi');      // Hi, I'm John
introduce.call(person2, 'Hello');   // Hello, I'm Jane

// 2.2 Method Borrowing
const calculator = {
    numbers: [],
    sum() {
        return this.numbers.reduce((a, b) => a + b, 0);
    }
};

const numbersObj = { numbers: [1, 2, 3] };
console.log(calculator.sum.call(numbersObj));  // 6

// 2.3 Constructor Chain
function Animal(name) {
    this.name = name;
}

function Dog(name, breed) {
    Animal.call(this, name);  // Call parent constructor
    this.breed = breed;
}

// ************ 3. APPLY METHOD ************

// 3.1 Basic Apply Usage
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.apply(person1, ['Hello', '!']);  // Hello, John!

// 3.2 Array Methods with Apply
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers);
const min = Math.min.apply(null, numbers);

// 3.3 Function Composition with Apply
function compose(...functions) {
    return function(x) {
        return functions.reduceRight((value, fn) => {
            return fn.apply(this, [value]);
        }, x);
    };
}

// ************ 4. BIND METHOD ************

// 4.1 Basic Bind Usage
const boundGreet = greet.bind(person1, 'Hi');
boundGreet('!');  // Hi, John!

// 4.2 Partial Application
function multiply(a, b) {
    return a * b;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(4));  // 8

// 4.3 Event Handlers with Bind
class Counter {
    constructor() {
        this.count = 0;
        this.increment = this.increment.bind(this);
    }
    
    increment() {
        this.count++;
        console.log(this.count);
    }
}

// ************ 5. ADVANCED PATTERNS ************

// 5.1 Method Borrowing with Bind
const numbers1 = [1, 2, 3];
const args = Array.prototype.slice.call(arguments);

// Modern version
const args2 = Array.from(arguments);

// 5.2 Currying with Bind
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

// 5.3 Context Preservation
class AsyncHandler {
    constructor() {
        this.data = [];
    }
    
    async process() {
        // Preserving this in async operations
        const self = this;
        await Promise.all(this.data.map(async function(item) {
            await self.processItem(item);
        }));
    }
    
    // Better version using arrow function
    async processModern() {
        await Promise.all(this.data.map(async item => {
            await this.processItem(item);
        }));
    }
}

// ************ 6. PRACTICAL EXAMPLES ************

// 6.1 Method Delegation
class UIComponent {
    constructor(element) {
        this.element = element;
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);
    }
    
    handleClick(event) {
        console.log(`Clicked at: ${event.clientX}, ${event.clientY}`);
        this.processClick(event);
    }
}

// 6.2 Function Composition with Context
function pipe(...fns) {
    return function(x) {
        return fns.reduce((v, f) => f.call(this, v), x);
    };
}

// 6.3 Mixin Implementation
const mixin = {
    sayHi() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

function applyMixin(target, methods) {
    Object.keys(methods).forEach(method => {
        target.prototype[method] = methods[method];
    });
}

// ************ 7. BEST PRACTICES ************

/*
1. Context Management:
   - Use bind for event handlers
   - Arrow functions for callbacks
   - Avoid storing this in variables
   - Use method shorthand in objects

2. Performance:
   - Cache bound functions
   - Avoid binding in render methods
   - Use class fields for auto-binding
   - Consider function composition

3. Debugging:
   - Console.log this early
   - Use debugger statement
   - Check call stack
   - Verify context explicitly

4. Common Patterns:
   - Method borrowing
   - Event handling
   - Constructor inheritance
   - Partial application
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: Difference between call, apply, and bind?
A: - call: immediate execution with comma-separated args
   - apply: immediate execution with array of args
   - bind: returns new function with fixed this

Q2: How does this work in arrow functions?
A: - Inherits this from enclosing scope
   - Can't be changed with call/apply/bind
   - Great for callbacks and methods

Q3: What determines this value?
A: - How function is called
   - new keyword
   - call/apply/bind
   - Object method
   - Global/undefined (strict mode)

Q4: Common this pitfalls?
A: - Callback losing context
   - Method reference losing context
   - Nested functions
   - Event handlers
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        Person,
        Counter,
        AsyncHandler,
        UIComponent,
        curry,
        pipe
    };
} 