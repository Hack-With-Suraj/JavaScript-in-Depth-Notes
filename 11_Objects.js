// ******************** JAVASCRIPT OBJECTS EXPLAINED ********************

// ************ PART 1: OBJECT BASICS ************

/*
WHAT IS AN OBJECT?
- Objects are collections of key-value pairs
- Like a container that holds related data and functionality
- The fundamental building block of JavaScript

WHY USE OBJECTS?
1. Group related data together
2. Create reusable code structures
3. Model real-world entities
4. Organize code better

HOW TO CREATE OBJECTS?
1. Object Literals: {}
2. Constructor Functions: new Object()
3. Classes (ES6+)
4. Object.create()
*/

// ************ PRACTICE PROBLEMS - BASICS ************

/*
Problem 1: Create a Book Object
Create an object representing a book with:
- title, author, year, ISBN
- method to display book info
- method to check if book is old (>5 years)
*/

// Solution:
const book = { 
    title: "JavaScript Guide",
    author: "John Doe",
    year: 2020,
    isbn: "123-456-789",
    
    displayInfo() {
        console.log(`${this.title} by ${this.author} (${this.year})`);
    },
    
    isOld() {
        return (new Date().getFullYear() - this.year) > 5;
    }
};

/*
Problem 2: Object Factory
Create a function that generates user objects with:
- name, email, role
- login/logout methods
- method to change role
*/

// Solution:
function createUser(name, email, role) {
    return {
        name,
        email,
        role,
        isLoggedIn: false,
        
        login() {
            this.isLoggedIn = true;
            return `${this.name} logged in`;
        },
        
        logout() {
            this.isLoggedIn = false;
            return `${this.name} logged out`;
        },
        
        changeRole(newRole) {
            this.role = newRole;
            return `Role changed to ${newRole}`;
        }
    };
}

// ************ PART 2: ADVANCED CONCEPTS ************

/*
WHAT IS A SINGLETON?
- Design pattern that ensures only one instance of an object exists
- Useful for managing global state
- Implements lazy initialization

WHY USE SINGLETON?
1. Control access to shared resources
2. Ensure single point of access
3. Manage application state

HOW TO IMPLEMENT?
- Use IIFE (Immediately Invoked Function Expression)
- Private instance variable
- Public getInstance method
*/

// Example and Practice:
const DatabaseConnection = (function() {
    let instance;
    
    function createConnection() {
        return {
            query(sql) {
                console.log(`Executing: ${sql}`);
            },
            connect() {
                console.log('Connected to database');
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createConnection();
            }
            return instance;
        }
    };
})();

/*
Practice Problem 3: Configuration Singleton
Create a singleton that manages application configuration:
- theme (light/dark)
- language
- notifications (on/off)
- methods to change settings
*/

// Solution:
const AppConfig = (function() {
    let instance;
    
    function init() {
        let settings = {
            theme: 'light',
            language: 'en',
            notifications: true
        };
        
        return {
            getSettings() {
                return {...settings};
            },
            
            setSetting(key, value) {
                if (key in settings) {
                    settings[key] = value;
                    return true;
                }
                return false;
            },
            
            toggleTheme() {
                settings.theme = settings.theme === 'light' ? 'dark' : 'light';
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

// ************ PART 3: OBJECT MANIPULATION ************

/*
WHAT ARE PROPERTY DESCRIPTORS?
- Metadata about object properties
- Control how properties behave
- Three main attributes:
  1. writable: can change value
  2. enumerable: shows in loops
  3. configurable: can delete/modify descriptor

WHY USE DESCRIPTORS?
1. Control property behavior
2. Create read-only properties
3. Hide properties from loops
4. Define computed properties
*/

// Practice Problem 4: Protected Properties
/*
Create an object with:
- Some properties that can't be changed
- Some properties that can't be deleted
- Some properties that won't show in loops
*/

// Solution:
const protectedObject = {};

Object.defineProperties(protectedObject, {
    id: {
        value: 1001,
        writable: false,     // Can't change
        enumerable: true,    // Shows in loops
        configurable: false  // Can't delete
    },
    
    secretKey: {
        value: 'abc123',
        enumerable: false    // Won't show in loops
    },
    
    computedValue: {
        get() {
            return this.id * 2;
        }
    }
});

// ************ PRACTICE EXERCISES ************

/*
Exercise 1: Shopping Cart
Create a shopping cart system with:
- Add/remove items
- Calculate total
- Apply discounts
- Track quantity
*/

/*
Exercise 2: Student Management
Create a system to:
- Add/remove students
- Calculate grades
- Track attendance
- Generate reports
*/

/*
Exercise 3: Bank Account
Implement:
- Deposit/withdraw
- Transfer between accounts
- Transaction history
- Interest calculation
*/

// I can provide solutions and more exercises if you'd like to practice any specific concept.

// ************ OBJECT CREATION AND PATTERNS ************

// 1. Singleton Pattern
const Singleton = (function() {
    let instance;
    
    function createInstance() {
        return {
            name: 'Singleton Instance',
            getData() {
                return this.name;
            }
        };
    }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Usage:
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
// instance1 === instance2 // true

// 2. Object.create Deep Dive
const personProto = {
    greet() {
        return `Hello, ${this.name}`;
    },
    setName(name) {
        this.name = name;
    }
};

const john = Object.create(personProto, {
    name: {
        value: 'John',
        writable: true,
        enumerable: true
    },
    age: {
        value: 25,
        writable: false
    }
});

// 3. Advanced Object Literals
const mySym = Symbol("key1");  // Symbol as key

const user = {
    name: "John",
    "full name": "John Doe",    // Space in property name
    [mySym]: "mykey1",         // Symbol as property key
    age: 30,
    
    // Method shorthand
    greet() {
        console.log(`Hello, ${this.name}`);
    },
    
    // Computed property names
    [`user_${Date.now()}`]: 'dynamic key',
    
    // Getter/Setter
    get userInfo() {
        return `${this.name} (${this.age})`;
    },
    
    set userInfo(value) {
        [this.name, this.age] = value.split(' ');
    }
};

// 4. Object Property Features
const advancedObject = {
    normalProp: 'value',
    items: ['item1', 'item2'],
    nested: {
        prop: 'nested value'
    }
};

// Property access methods
Object.keys(advancedObject);        // ['normalProp', 'items', 'nested']
Object.values(advancedObject);      // ['value', ['item1', 'item2'], {...}]
Object.entries(advancedObject);     // [['normalProp', 'value'], ...]

// Property descriptors
Object.defineProperties(advancedObject, {
    readOnly: {
        value: 'cant change',
        writable: false
    },
    computed: {
        get: function() {
            return this.normalProp + '!';
        }
    }
});

// 5. Object Merging and Cloning
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Merging objects
const merged1 = Object.assign({}, obj1, obj2);
const merged2 = { ...obj1, ...obj2 };  // Spread operator

// Deep cloning with nested objects
const deepObj = {
    name: 'Deep',
    address: {
        street: '123 Main St',
        city: 'Boston'
    },
    hobbies: ['reading', 'coding']
};

// 6. Object Destructuring Advanced
const {
    name,
    address: { street, city },  // Nested destructuring
    hobbies: [firstHobby, ...restHobbies]  // Array destructuring
} = deepObj;

// 7. JSON Objects
const jsonObj = {
    "name": "JSON Example",
    "types": ["string", "number", "boolean"],
    "nested": {
        "prop": "value"
    }
};

// Converting between JSON and Objects
const jsonString = JSON.stringify(jsonObj, null, 2);  // Pretty print
const parsedObj = JSON.parse(jsonString);

// ************ PRACTICAL EXAMPLES ************

// 1. Configuration Object Pattern
function initApp(config) {
    const defaultConfig = {
        theme: 'light',
        language: 'en',
        debug: false
    };
    
    return { ...defaultConfig, ...config };
}

// 2. Builder Pattern
class ObjectBuilder {
    constructor() {
        this.obj = {};
    }
    
    setName(name) {
        this.obj.name = name;
        return this;
    }
    
    setAge(age) {
        this.obj.age = age;
        return this;
    }
    
    build() {
        return { ...this.obj };
    }
}

// 3. Object Pool Pattern
class ObjectPool {
    constructor() {
        this.pool = [];
        this.inUse = new Set();
    }
    
    acquire() {
        let obj = this.pool.pop() || this.createNew();
        this.inUse.add(obj);
        return obj;
    }
    
    release(obj) {
        if (this.inUse.delete(obj)) {
            this.pool.push(obj);
        }
    }
    
    createNew() {
        return { id: Date.now() };
    }
}

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's the difference between Object.freeze() and Object.seal()?
A: - Object.freeze(): Prevents adding, deleting, and modifying properties
   - Object.seal(): Prevents adding and deleting properties, but allows modification

Q2: How would you implement private properties before ES2022?
A: Using closures, WeakMap, or Symbol keys

Q3: What's the difference between Object.create() and constructor functions?
A: Object.create() sets up prototype chain directly, constructor functions create new objects

Q4: How do you handle circular references in object serialization?
A: Custom replacer function in JSON.stringify() or maintaining a WeakMap of processed objects

Q5: Explain property descriptors and their use cases
A: Control property behavior (writable, enumerable, configurable) for security and APIs
*/

// ************ BEST PRACTICES ************

/*
1. Object Creation:
   - Use literal syntax for simple objects
   - Use factories or classes for complex objects
   - Consider immutability with Object.freeze()

2. Property Access:
   - Use dot notation for known properties
   - Use bracket notation for dynamic properties
   - Use optional chaining for safe nested access

3. Performance:
   - Avoid creating objects in loops
   - Use object pools for frequent creation/destruction
   - Be careful with deep cloning large objects

4. Security:
   - Freeze sensitive objects
   - Validate object properties
   - Use private fields for encapsulation

5. Maintenance:
   - Use consistent property naming
   - Document complex object structures
   - Use TypeScript or JSDoc for better typing
*/