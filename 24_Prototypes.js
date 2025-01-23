// ******************** JAVASCRIPT PROTOTYPES GUIDE ********************

// ************ PART 1: PROTOTYPE FUNDAMENTALS ************

/*
WHAT IS A PROTOTYPE?
- Core mechanism for inheritance in JavaScript
- Objects can inherit properties and methods from other objects
- Every object has a prototype (except null)
- Forms prototype chain for property lookup
- Foundation of OOP in JavaScript

KEY CONCEPTS:
1. __proto__ - Reference to object's prototype
2. prototype - Property of constructor functions
3. Constructor - Function used to create objects
4. Prototype Chain - Inheritance hierarchy
*/

// ************ 1. BASIC PROTOTYPE CONCEPTS ************

// 1.1 Object Prototype
const obj = {};
console.log(obj.__proto__ === Object.prototype);  // true

// 1.2 Constructor Function and Prototype
function Animal(name) {
    this.name = name;
}

Animal.prototype.makeSound = function() {
    console.log('Some sound');
};

const dog = new Animal('Dog');
dog.makeSound();  // 'Some sound'

// 1.3 Prototype Chain
function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log('Woof!');
};

// ************ 2. PROTOTYPE INHERITANCE ************

// 2.1 Basic Inheritance
function Shape(color) {
    this.color = color;
}

Shape.prototype.getColor = function() {
    return this.color;
};

function Circle(color, radius) {
    Shape.call(this, color);
    this.radius = radius;
}

// Set up inheritance
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// Add Circle-specific methods
Circle.prototype.getArea = function() {
    return Math.PI * this.radius ** 2;
};

// 2.2 Multiple Inheritance (Mixin Pattern)
const speakerMixin = {
    speak(phrase) {
        console.log(`${this.name} says: ${phrase}`);
    }
};

const moverMixin = {
    move(distance) {
        console.log(`${this.name} moved ${distance}m`);
    }
};

// Apply mixins
Object.assign(Dog.prototype, speakerMixin, moverMixin);

// ************ 3. ADVANCED PROTOTYPE PATTERNS ************

// 3.1 Property Descriptors
Object.defineProperty(Shape.prototype, 'type', {
    get() {
        return this._type;
    },
    set(value) {
        this._type = value.toLowerCase();
    },
    enumerable: true,
    configurable: true
});

// 3.2 Prototype Pollution Prevention
function createSafeObject(proto) {
    return Object.create(proto, {
        __proto__: {
            writable: false,
            configurable: false
        }
    });
}

// 3.3 Factory with Prototypes
const vehicleProto = {
    start() {
        console.log('Starting...');
    },
    stop() {
        console.log('Stopping...');
    }
};

function createVehicle(type) {
    const vehicle = Object.create(vehicleProto);
    vehicle.type = type;
    return vehicle;
}

// ************ 4. PROTOTYPE METHODS AND PROPERTIES ************

// 4.1 Object.create()
const proto = {
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};

const person = Object.create(proto, {
    name: {
        value: 'John',
        writable: true,
        enumerable: true
    }
});

// 4.2 Object.getPrototypeOf() / setPrototypeOf()
const child = {};
Object.setPrototypeOf(child, person);
console.log(Object.getPrototypeOf(child) === person);  // true

// 4.3 hasOwnProperty() vs in operator
console.log(person.hasOwnProperty('name'));  // true
console.log('greet' in person);  // true

// ************ 5. PERFORMANCE OPTIMIZATION ************

// 5.1 Prototype Method Sharing
function createUsers(count) {
    const userProto = {
        sayHi() {
            console.log(`Hi, I'm ${this.name}`);
        }
    };
    
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(Object.create(userProto, {
            name: { value: `User${i}` }
        }));
    }
    return users;
}

// 5.2 Prototype Chain Optimization
function optimizedChain() {
    // Flatten prototype chain for performance
    const methods = {};
    let proto = this.__proto__;
    
    while (proto) {
        Object.assign(methods, proto);
        proto = proto.__proto__;
    }
    
    return Object.create(methods);
}

// ************ 6. PRACTICAL EXAMPLES ************

// 6.1 Custom Array Methods
Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
};

Array.prototype.average = function() {
    return this.sum() / this.length;
};

// 6.2 Event Emitter Implementation
function EventEmitter() {}

EventEmitter.prototype.on = function(event, callback) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
};

EventEmitter.prototype.emit = function(event, ...args) {
    if (this._events && this._events[event]) {
        this._events[event].forEach(cb => cb.apply(this, args));
    }
};

// 6.3 Chainable Methods
function Query(data) {
    this.data = data;
}

Query.prototype.where = function(predicate) {
    this.data = this.data.filter(predicate);
    return this;
};

Query.prototype.select = function(selector) {
    this.data = this.data.map(selector);
    return this;
};

// ************ 7. COMMON PITFALLS AND SOLUTIONS ************

/*
1. Constructor Function Issues:
   - Forgetting 'new' keyword
   - Not setting constructor property
   - Modifying Object.prototype

2. Property Shadowing:
   - Properties on instance shadow prototype
   - Can lead to unexpected behavior
   - Use hasOwnProperty() to check

3. Prototype Pollution:
   - Modifying shared prototype
   - Security vulnerabilities
   - Use Object.freeze() or preventExtensions()

4. Performance Considerations:
   - Long prototype chains
   - Property lookup cost
   - Memory usage vs code reuse
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's the difference between __proto__ and prototype?
A: - __proto__ is the actual prototype of an object
   - prototype is a property of constructor functions
   - prototype becomes __proto__ of new instances
   - __proto__ is used in prototype chain lookup

Q2: How does prototype chain work?
A: - Object properties looked up in instance
   - If not found, check object's prototype
   - Continue until null is reached
   - Forms basis of inheritance

Q3: Why use prototypes instead of classes?
A: - More flexible and dynamic
   - Better memory efficiency
   - Runtime modification
   - True JavaScript way

Q4: How to prevent prototype pollution?
A: - Object.freeze() prototypes
   - Use Object.create(null)
   - Validate object properties
   - Implement safe merge functions
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        Animal,
        Dog,
        Shape,
        Circle,
        EventEmitter,
        Query
    };
} 