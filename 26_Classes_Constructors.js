// ******************** CLASSES, CONSTRUCTORS, AND STATIC MEMBERS IN JAVASCRIPT ********************

// ************ PART 1: CLASS FUNDAMENTALS ************

/*
WHAT ARE CLASSES?
- Blueprint for creating objects
- Introduced in ES6 (ES2015)
- Syntactical sugar over prototypes
- Support inheritance, static members, private fields
- Better organization of object-oriented code

KEY CONCEPTS:
1. Constructor method
2. Instance methods
3. Static methods/properties
4. Private fields/methods
5. Inheritance
*/

// ************ 1. BASIC CLASS STRUCTURE ************

// 1.1 Class Declaration
class Person {
    // Class fields (ES2022+)
    name;
    age;
    
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Instance method
    introduce() {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
    }
}

// 1.2 Class Expression
const Animal = class {
    constructor(species) {
        this.species = species;
    }
};

// ************ 2. CONSTRUCTORS IN DEPTH ************

// 2.1 Basic Constructor
class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }
}

// 2.2 Constructor with Parameter Validation
class BankAccount {
    constructor(initialBalance) {
        if (initialBalance < 0) {
            throw new Error('Initial balance cannot be negative');
        }
        this.balance = initialBalance;
    }
}

// 2.3 Constructor with Default Values
class Config {
    constructor({
        port = 3000,
        host = 'localhost',
        timeout = 5000
    } = {}) {
        this.port = port;
        this.host = host;
        this.timeout = timeout;
    }
}

// ************ 3. STATIC MEMBERS ************

// 3.1 Static Methods
class MathOperations {
    static add(x, y) {
        return x + y;
    }
    
    static multiply(x, y) {
        return x * y;
    }
    
    static get PI() {
        return 3.14159;
    }
}

// 3.2 Static Fields
class Database {
    static #connections = 0;  // Private static field
    static MAX_CONNECTIONS = 5;  // Public static field
    
    constructor() {
        if (Database.#connections >= Database.MAX_CONNECTIONS) {
            throw new Error('Max connections reached');
        }
        Database.#connections++;
    }
    
    static getConnectionCount() {
        return Database.#connections;
    }
}

// 3.3 Static Initialization Blocks
class ApiClient {
    static baseUrl;
    static apiKey;
    
    static {
        // Complex initialization logic
        this.baseUrl = process.env.API_URL || 'https://api.example.com';
        this.apiKey = this.loadApiKey();
    }
    
    static loadApiKey() {
        // Load from secure storage
        return 'secret-key';
    }
}

// ************ 4. ADVANCED CLASS PATTERNS ************

// 4.1 Factory Pattern with Static Methods
class UserFactory {
    static createAdmin(username) {
        return new User(username, true);
    }
    
    static createGuest() {
        return new User('guest', false);
    }
    
    static {
        // Initialize factory settings
        this.userCount = 0;
    }
}

// 4.2 Singleton Pattern
class Singleton {
    static #instance;
    
    constructor() {
        if (Singleton.#instance) {
            return Singleton.#instance;
        }
        Singleton.#instance = this;
    }
    
    static getInstance() {
        if (!Singleton.#instance) {
            Singleton.#instance = new Singleton();
        }
        return Singleton.#instance;
    }
}

// 4.3 Abstract Class Pattern
class AbstractDatabase {
    constructor() {
        if (this.constructor === AbstractDatabase) {
            throw new Error("Can't instantiate abstract class");
        }
    }
    
    static connect() {
        throw new Error('Method connect() must be implemented');
    }
}

// ************ 5. INHERITANCE WITH STATIC MEMBERS ************

// 5.1 Basic Inheritance
class Vehicle {
    static #count = 0;
    
    static getCount() {
        return Vehicle.#count;
    }
    
    constructor() {
        Vehicle.#count++;
    }
}

class Car extends Vehicle {
    static #carCount = 0;
    
    static {
        // Static initialization in child class
        this.wheels = 4;
    }
    
    constructor() {
        super();
        Car.#carCount++;
    }
    
    static getCarCount() {
        return Car.#carCount;
    }
}

// 5.2 Method Override with Super
class Logger {
    static log(msg) {
        console.log(msg);
    }
}

class DetailedLogger extends Logger {
    static log(msg) {
        super.log(`[${new Date().toISOString()}] ${msg}`);
    }
}

// ************ 6. PRACTICAL EXAMPLES ************

// 6.1 Database Connection Pool
class ConnectionPool {
    static #pool = new Map();
    static #maxSize = 10;
    
    static async getConnection(id) {
        if (!this.#pool.has(id)) {
            if (this.#pool.size >= this.#maxSize) {
                throw new Error('Pool is full');
            }
            this.#pool.set(id, await this.#createConnection());
        }
        return this.#pool.get(id);
    }
    
    static async #createConnection() {
        // Connection creation logic
        return { connected: true };
    }
}

// 6.2 Configuration Manager
class Config {
    static #instance;
    static #settings = new Map();
    
    static {
        // Load initial configuration
        this.load();
    }
    
    static load() {
        // Load settings from storage
    }
    
    static get(key) {
        return this.#settings.get(key);
    }
    
    static set(key, value) {
        this.#settings.set(key, value);
        this.save();
    }
}

// ************ 7. BEST PRACTICES ************

/*
1. Constructor Design:
   - Keep constructors simple
   - Validate input parameters
   - Use factory methods for complex creation
   - Consider private constructors

2. Static Members:
   - Use for utility functions
   - Maintain state across instances
   - Implement factory methods
   - Cache shared resources

3. Inheritance:
   - Keep inheritance hierarchy shallow
   - Use composition over inheritance
   - Override methods carefully
   - Call super() first in constructors

4. Performance:
   - Cache static values
   - Minimize static initialization
   - Use private fields appropriately
   - Consider memory implications
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: When to use static methods vs instance methods?
A: - Static: utility functions, factory methods
   - Static: operations not needing instance state
   - Instance: object-specific behavior
   - Instance: when need access to this

Q2: How does static inheritance work?
A: - Static members are inherited
   - Can be overridden in subclasses
   - super can access parent static members
   - Not instance-specific

Q3: Private static vs private instance fields?
A: - Private static: shared across instances
   - Private instance: unique to each instance
   - Both use # prefix
   - Different scope and lifetime

Q4: Benefits of static initialization blocks?
A: - Complex static initialization
   - Access to private static fields
   - Better than IIFE
   - Runs when class is evaluated
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        Person,
        UserFactory,
        Singleton,
        ConnectionPool,
        Config
    };
} 