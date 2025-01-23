// ******************** JAVASCRIPT SCOPE GUIDE ********************

// ************ PART 1: SCOPE FUNDAMENTALS ************

/*
WHAT IS SCOPE?
- The accessibility/visibility of variables and functions in code
- Determines where variables and functions can be accessed
- Controls variable lifetime and memory usage
- Helps avoid naming conflicts

TYPES OF SCOPE:
1. Global Scope
2. Function/Local Scope
3. Block Scope (ES6+)
4. Module Scope
5. Lexical Scope
*/

// ************ 1. GLOBAL SCOPE ************

/*
WHAT IS GLOBAL SCOPE?
- Variables/functions accessible everywhere in the program
- Declared outside any function or block
- Window object in browsers, global in Node.js

WHY AVOID GLOBAL SCOPE?
1. Name collisions
2. Security risks
3. Harder to maintain
4. Memory usage
*/

// Example of Global Scope
var globalVar = "I'm global";  // Accessible everywhere
let globalLet = "I'm also global";
const globalConst = "I'm global too";

function accessGlobal() {
    console.log(globalVar);  // Can access global variables
}

// ************ 2. FUNCTION SCOPE ************

/*
WHAT IS FUNCTION SCOPE?
- Variables declared inside a function
- Only accessible within that function
- Each function creates new scope
- Nested functions create scope chain
*/

function functionScope() {
    let functionVar = "I'm function-scoped";
    
    function nestedFunction() {
        console.log(functionVar);  // Can access parent's variables
    }
}

// ************ 3. BLOCK SCOPE ************

/*
WHAT IS BLOCK SCOPE?
- Variables declared inside a block (if, for, while, etc.)
- Only accessible within that block
- Introduced with let and const in ES6
- var ignores block scope!
*/

// Block Scope Example
{
    let blockVar = "I'm block-scoped";
    const blockConst = "Me too";
    var notBlockScoped = "I'm actually function/global scoped!";
}

// ************ 4. LEXICAL SCOPE ************

/*
WHAT IS LEXICAL SCOPE?
- Scope is determined by code location (where it's written)
- Inner functions can access outer variables
- Forms the basis for closures
- Also called "Static Scope"
*/

function outer() {
    let outerVar = "I'm from outer";
    
    function inner() {
        let innerVar = "I'm from inner";
        console.log(outerVar);  // Can access outerVar
    }
}

// ************ ADVANCED SCOPE CONCEPTS ************

// 1. Closure Scope
function createCounter() {
    let count = 0;  // Private variable through closure
    
    return {
        increment() { return ++count; },
        getCount() { return count; }
    };
}

// 2. Module Scope (ES6 Modules)
/*
export const moduleVar = "I'm module-scoped";
import { moduleVar } from './module';
*/

// 3. Temporal Dead Zone (TDZ)
function tdz() {
    console.log(tdzVar);  // ReferenceError
    let tdzVar = "Can't access before declaration";
}

// ************ SCOPE CHAIN AND VARIABLE LOOKUP ************

/*
HOW SCOPE CHAIN WORKS:
1. Start in current scope
2. If variable not found, look in outer scope
3. Continue until global scope
4. If not found, ReferenceError
*/

const global = "I'm global";

function first() {
    const firstVar = "I'm in first";
    
    function second() {
        const secondVar = "I'm in second";
        
        function third() {
            console.log(global);      // Found in global scope
            console.log(firstVar);    // Found in first()
            console.log(secondVar);   // Found in second()
        }
    }
}

// ************ PRACTICAL EXAMPLES ************

// 1. Module Pattern (Using Scope for Privacy)
const calculator = (function() {
    // Private variables
    let result = 0;
    
    // Public interface
    return {
        add(n) { result += n; },
        subtract(n) { result -= n; },
        getResult() { return result; }
    };
})();

// 2. Factory Functions with Private State
function createUser(name) {
    // Private variables
    let secretKey = "xyz123";
    
    return {
        getName() { return name; },
        authenticate(key) { return key === secretKey; }
    };
}

// 3. Block Scope for Loop Variables
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // Works correctly
}

// ************ COMMON PITFALLS ************

/*
1. var Hoisting
   - Variables declared with var are hoisted
   - Only declaration is hoisted, not initialization
*/
console.log(hoistedVar);  // undefined, not ReferenceError
var hoistedVar = "I'm hoisted";

/*
2. this Context
   - Not related to lexical scope
   - Depends on how function is called
*/
const obj = {
    name: "Object",
    greet() {
        setTimeout(function() {
            console.log(this.name);  // undefined
        });
    }
};

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's the difference between var, let, and const scoping?
A: - var: function-scoped, hoisted
   - let/const: block-scoped, not hoisted (TDZ)
   - const: also prevents reassignment

Q2: Explain closure scope.
A: - Function retains access to variables in its outer scope
   - Creates private variables
   - Useful for data privacy and state management

Q3: How does the scope chain work?
A: - JavaScript looks for variables in current scope
   - If not found, checks outer scope
   - Continues until global scope
   - Throws ReferenceError if not found

Q4: What is the Temporal Dead Zone?
A: - Period between entering scope and variable declaration
   - let/const variables cannot be accessed before declaration
   - Results in ReferenceError
*/

// ************ BEST PRACTICES ************

/*
1. Variable Declaration:
   - Prefer const by default
   - Use let when reassignment needed
   - Avoid var
   - Declare variables at top of their scope

2. Scope Management:
   - Keep functions small
   - Minimize global variables
   - Use block scope for temporary variables
   - Understand closure implications

3. Module Usage:
   - Use ES6 modules for better scoping
   - Implement module pattern for privacy
   - Keep related code together

4. Performance:
   - Be aware of closure memory implications
   - Clean up event listeners
   - Don't create functions in loops

5. Debugging:
   - Use strict mode
   - Understand scope chain for debugging
   - Watch for common scope-related bugs
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        createCounter,
        calculator,
        createUser
    };
} 