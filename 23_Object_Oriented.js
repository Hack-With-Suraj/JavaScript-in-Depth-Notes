// ******************** OBJECT-ORIENTED PROGRAMMING IN JAVASCRIPT ********************

// ************ PART 1: OOP FUNDAMENTALS ************

/*
WHAT IS OOP?
- Programming paradigm based on objects
- Objects contain data and code
- Organizes code into reusable patterns
- Four main principles: Encapsulation, Inheritance, Polymorphism, Abstraction

WHY USE OOP?
1. Code Organization
2. Reusability
3. Maintainability
4. Scalability
*/

// ************ 1. OBJECTS AND CLASSES ************

// 1.1 Object Literals
const personLiteral = {
    name: 'John',
    age: 30,
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

// 1.2 Constructor Functions (ES5)
function Person(name, age) {
    this.name = name;
    this.age = age;
    
    this.greet = function() {
        console.log(`Hello, I'm ${this.name}`);
    };
}

// 1.3 Classes (ES6+)
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
    
    // Static method
    static createAnonymous() {
        return new PersonClass('Anonymous', 0);
    }
}

// ************ 2. ENCAPSULATION ************

// 2.1 Private Fields (ES2022)
class BankAccount {
    #balance = 0;  // Private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

// 2.2 Closure for Privacy (ES5)
function createCounter() {
    let count = 0;  // Private variable
    
    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
    };
}

// ************ 3. INHERITANCE ************

// 3.1 Class Inheritance
class Employee extends Person {
    constructor(name, age, role) {
        super(name, age);
        this.role = role;
    }
    
    work() {
        console.log(`${this.name} is working as ${this.role}`);
    }
}

// 3.2 Prototypal Inheritance
function Animal(name) {
    this.name = name;
}

Animal.prototype.makeSound = function() {
    console.log('Some sound');
};

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// ************ 4. POLYMORPHISM ************

// 4.1 Method Overriding
class Shape {
    calculateArea() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
}

// 4.2 Interface-like Behavior
class DataStorage {
    save(data) {
        throw new Error('Must implement save method');
    }
    
    load() {
        throw new Error('Must implement load method');
    }
}

// ************ 5. ABSTRACTION ************

// 5.1 Abstract Class Pattern
class AbstractVehicle {
    constructor() {
        if (this.constructor === AbstractVehicle) {
            throw new Error('Cannot instantiate abstract class');
        }
    }
    
    start() {
        throw new Error('Must implement start method');
    }
}

// 5.2 Implementation
class Car extends AbstractVehicle {
    start() {
        console.log('Car starting...');
    }
}

// ************ 6. ADVANCED PATTERNS ************

// 6.1 Singleton Pattern
class Singleton {
    static #instance;
    
    constructor() {
        if (Singleton.#instance) {
            return Singleton.#instance;
        }
        Singleton.#instance = this;
    }
}

// 6.2 Factory Pattern
class UserFactory {
    createUser(type) {
        switch(type) {
            case 'admin':
                return new AdminUser();
            case 'regular':
                return new RegularUser();
            default:
                throw new Error('Invalid user type');
        }
    }
}

// 6.3 Observer Pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// ************ 7. MIXINS AND COMPOSITION ************

// 7.1 Mixin Pattern
const speakerMixin = {
    speak(phrase) {
        console.log(this.name + ' says: ' + phrase);
    }
};

Object.assign(Person.prototype, speakerMixin);

// 7.2 Composition
class ComposedObject {
    constructor() {
        this.state = new StateManager();
        this.events = new EventEmitter();
        this.data = new DataHandler();
    }
}

// ************ 8. BEST PRACTICES ************

/*
1. Class Design:
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation
   - Dependency Inversion

2. Inheritance:
   - Favor composition over inheritance
   - Keep inheritance chains shallow
   - Use interfaces when possible
   - Consider mixins for shared behavior

3. Encapsulation:
   - Use private fields/methods
   - Provide clear public API
   - Validate input data
   - Maintain invariants

4. Performance:
   - Minimize object creation
   - Use prototypes effectively
   - Consider memory usage
   - Cache object references
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What is the difference between classical and prototypal inheritance?
A: - Classical: class-based, strict hierarchy
   - Prototypal: object-based, flexible
   - JavaScript uses prototypal internally
   - Classes are syntactic sugar

Q2: How does 'this' work in classes?
A: - Refers to instance in methods
   - Undefined in strict mode
   - Can be bound explicitly
   - Arrow functions preserve context

Q3: What are private fields?
A: - Denoted by # prefix
   - Only accessible within class
   - Not inherited
   - True private implementation

Q4: When to use composition vs inheritance?
A: - Composition for has-a relationships
   - Inheritance for is-a relationships
   - Composition more flexible
   - Inheritance can lead to tight coupling
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        Person,
        BankAccount,
        EventEmitter,
        UserFactory
    };
} 