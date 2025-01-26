# JavaScript Data Types 🚀

## Table of Contents
- [Introduction](#introduction)
- [Primitive Data Types](#primitive-data-types)
- [Reference Data Types](#reference-data-types)
- [Type Checking](#type-checking)
- [Memory Behavior](#memory-behavior)
- [Things to Avoid](#things-to-avoid)
- [Conclusion](#conclusion)

## Introduction

In JavaScript, data types define the kind of values a variable can hold. Knowing about data types is essential for understanding how to work with different types of data in your code.

JavaScript has two main categories of data types:
1. Primitive `(common or basic)` Data Types `(stored by value)`
2. Non-Primitive Data Types in JavaScript `(stored by reference)`

## Primitive Data Types

### 1. Number
```javascript
// Integer numbers
let age = 25;
let temperature = -5;

// Floating-point numbers
let price = 99.99;
let pi = 3.14159;

// Special numeric values
let infinity = Infinity;
let negInfinity = -Infinity;
let notANumber = NaN;

// Number methods
Number.isInteger(5);      // true
Number.isFinite(Infinity);// false
Number.isNaN(NaN);       // true
```

### 2. String
```javascript
// String creation
let single = 'Single quotes';
let double = "Double quotes";
let backtick = `Template literal`;

// String methods
let str = "Hello, World!";
str.length;              // 13
str.toUpperCase();       // "HELLO, WORLD!"
str.substring(0, 5);     // "Hello"
str.split(',');          // ["Hello", " World!"]

// Template literals
let name = "John";
let greeting = `Hello, ${name}!`;
```

### 3. Boolean
```javascript
let isActive = true;
let isLoggedIn = false;

// Truthy and falsy values
// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

// Boolean operations
let and = true && false;  // false
let or = true || false;   // true
let not = !true;         // false
```

### 4. Null
```javascript
let empty = null;  // Intentional absence of value

// Checking for null
console.log(empty === null);  // true
console.log(typeof null);     // "object" (JavaScript quirk)
```

### 5. Undefined
```javascript
let notDefined;  // undefined
let explicit = undefined;

// Checking for undefined
console.log(typeof notDefined === 'undefined');  // true
```

### 6. Symbol
```javascript
// Creating unique identifiers
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2);  // false

// Symbol usage
const obj = {
    [sym1]: "Value for sym1"
};
```

### 7. BigInt
```javascript
// For numbers larger than 2^53
const bigInt = 9007199254740991n;
const anotherBigInt = BigInt("9007199254740991");

// Operations
const sum = bigInt + 1n;  // Must use BigInt with BigInt
```

## Reference Data Types

### 1. Object
```javascript
// Object literal
const person = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, ${this.name}!`;
    }
};

// Object methods
Object.keys(person);      // ["name", "age"]
Object.values(person);    // ["John", 30]
Object.entries(person);   // [["name","John"], ["age",30]]

// Object property descriptors
Object.defineProperty(person, 'id', {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false
});
```

### 2. Array
```javascript
// Array creation
let fruits = ["apple", "banana", "orange"];
let mixed = [1, "two", { three: 3 }];

// Array methods
fruits.push("grape");     // Add to end
fruits.pop();            // Remove from end
fruits.unshift("lemon"); // Add to start
fruits.shift();          // Remove from start

// Advanced array methods
const numbers = [1, 2, 3, 4, 5];
numbers.map(n => n * 2);      // [2, 4, 6, 8, 10]
numbers.filter(n => n > 2);   // [3, 4, 5]
numbers.reduce((a, b) => a + b, 0); // 15
```

### 3. Function
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const sayHi = function(name) {
    return `Hi, ${name}!`;
};

// Arrow function
const welcome = (name) => `Welcome, ${name}!`;

// Function as object
greet.customProperty = "I'm a property";
```

## Type Checking

### CHECKING DATA TYPES
```javascript
// Use typeof operator to check data type
console.log(typeof 42)          // "number"
console.log(typeof "hello")     // "string"
console.log(typeof true)        // "boolean"
console.log(typeof undefined)   // "undefined"
console.log(typeof null)        // "object" (This is a known JavaScript quirk!)
console.log(typeof {})          // "object"
console.log(typeof [])          // "object" (Arrays are objects in JavaScript)
console.log(typeof function () { }) // "function"
```
## MEMORY BEHAVIOR 
- Primitive: Stored directly in memory location (Stack)
- Reference: Stored as reference to memory location (Heap)

This affects how they are copied and compared:
- Primitives are copied by value
- Reference types are copied by reference

## THINGS TO AVOID
```javascript
// 1. Avoid implicit type conversion
// BAD:
let result = "5" + 3   // "53" (string concatenation)
// GOOD:
let result2 = Number("5") + 3  // 8 (explicit conversion)

// 2. Avoid undefined comparisons
// BAD:
if (variable === undefined) { }
// GOOD:
if (typeof variable === "undefined") { }

// 3. Avoid direct null comparisons
// BAD:
if (value == null) { }
// GOOD:
if (value === null) { } // Use strict equality
```
## Conclusion

1. Primitive types are immutable (cannot be changed) and store actual values
2. Non-primitive types are mutable and store references
3. Always use strict equality `(===)` for comparisons
4. Be consistent with data types in your variables
5. Be careful with type coercion (automatic type conversion)
6. Use appropriate data types for your needs:
   - Numbers for calculations
   - Strings for text
   - Booleans for flags/conditions
   - Objects for structured data
   - Arrays for lists
   - null for intentional absence
   - undefined should be avoided in assignments

## Additional Resources
- [MDN Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [JavaScript Type System](https://www.typescriptlang.org/docs/handbook/basic-types.html)