// ******************** IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSIONS) ********************

// ************ PART 1: IIFE FUNDAMENTALS ************

/*
WHAT IS AN IIFE?
- Function that runs as soon as it's defined
- Creates a new scope immediately
- Helps avoid global scope pollution
- Provides data privacy
- Pattern: (function(){})()

WHY USE IIFE?
1. Data Privacy
2. Avoid Global Scope Pollution
3. Module Pattern Implementation
4. Async Operations Handling
5. State Encapsulation
*/

// ************ 1. BASIC IIFE SYNTAX ************

// Basic IIFE
(function() {
    console.log("I run immediately!");
})();

// IIFE with Parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("John");

// Arrow Function IIFE
(() => {
    console.log("Arrow IIFE");
})();

// Return Values from IIFE
const result = (function() {
    return "IIFE result";
})();

// ************ 2. IIFE WITH PRIVATE SCOPE ************

// Private Variables Example
const counter = (function() {
    // Private variable
    let count = 0;
    
    // Public interface
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
})();

// ************ 3. ADVANCED IIFE PATTERNS ************

// 1. Module Pattern
const calculator = (function() {
    // Private members
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    let lastResult = 0;
    
    // Public API
    return {
        addNumbers(a, b) {
            lastResult = add(a, b);
            return lastResult;
        },
        subtractNumbers(a, b) {
            lastResult = subtract(a, b);
            return lastResult;
        },
        getLastResult() {
            return lastResult;
        }
    };
})();

// 2. Singleton Pattern with IIFE
const Database = (function() {
    // Private instance
    let instance;
    
    // Private constructor
    function createInstance() {
        return {
            data: [],
            add(item) { this.data.push(item); },
            remove(item) { 
                this.data = this.data.filter(i => i !== item);
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// 3. Factory Pattern with IIFE
const userFactory = (function() {
    // Private methods
    function validateUser(user) {
        return user.name && user.age;
    }
    
    // Public factory method
    return function createUser(name, age) {
        const user = { name, age };
        return validateUser(user) ? user : null;
    };
})();

// ************ 4. PRACTICAL EXAMPLES ************

// 1. Configuration Management
const config = (function() {
    // Private configuration
    const defaultConfig = {
        apiUrl: 'https://api.example.com',
        timeout: 5000
    };
    
    // Private validation
    function validateConfig(config) {
        return config.apiUrl && config.timeout;
    }
    
    return {
        getConfig() {
            return {...defaultConfig};
        },
        updateConfig(newConfig) {
            if (validateConfig(newConfig)) {
                Object.assign(defaultConfig, newConfig);
                return true;
            }
            return false;
        }
    };
})();

// 2. State Management
const stateManager = (function() {
    // Private state
    const state = new Map();
    
    // Private methods
    function validateKey(key) {
        return typeof key === 'string' && key.length > 0;
    }
    
    // Public API
    return {
        setState(key, value) {
            if (validateKey(key)) {
                state.set(key, value);
                return true;
            }
            return false;
        },
        getState(key) {
            return state.get(key);
        },
        clearState() {
            state.clear();
        }
    };
})();

// 3. Event Handler Management
const eventManager = (function() {
    // Private storage
    const handlers = new Map();
    
    // Private cleanup
    function cleanup() {
        handlers.forEach((handler, element) => {
            element.removeEventListener('click', handler);
        });
        handlers.clear();
    }
    
    // Public API
    return {
        addHandler(element, handler) {
            handlers.set(element, handler);
            element.addEventListener('click', handler);
        },
        removeHandler(element) {
            const handler = handlers.get(element);
            if (handler) {
                element.removeEventListener('click', handler);
                handlers.delete(element);
            }
        },
        cleanup
    };
})();

// ************ 5. ASYNC IIFE ************

// 1. Async IIFE with Promise
(async function() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
})();

// 2. IIFE with Generator
const iterator = (function*() {
    yield 1;
    yield 2;
    yield 3;
})();

// ************ COMMON PATTERNS AND BEST PRACTICES ************

/*
1. Module Pattern
- Use for organizing related code
- Provide public API
- Keep implementation details private
*/
const myModule = (function() {
    // Private members
    const privateVar = 'private';
    function privateMethod() {}
    
    // Public API
    return {
        publicMethod() {
            return privateVar;
        }
    };
})();

/*
2. Initialization Pattern
- Set up application state
- Configure dependencies
- Handle async initialization
*/
const app = (function() {
    // Initialize app
    async function init() {
        await loadConfig();
        setupEventListeners();
        startApplication();
    }
    
    return { init };
})();

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What are the benefits of using IIFE?
A: - Data privacy
   - Avoid global scope pollution
   - Module pattern implementation
   - Immediate execution of async code

Q2: How does IIFE help with closures?
A: - Creates private scope
   - Maintains state between executions
   - Provides encapsulation

Q3: What's the difference between IIFE and regular functions?
A: - IIFE executes immediately
   - IIFE creates private scope
   - Regular functions need explicit call
   - IIFE can't be reused

Q4: How to pass global objects to IIFE?
A: (function(window, document) {
       // Use window and document
   })(window, document);
*/

// ************ DEBUGGING TIPS ************

/*
1. Naming IIFE for Stack Traces:
(function debuggableIIFE() {
    // Function name appears in stack trace
})();

2. Source Map Support:
//# sourceMappingURL=app.js.map

3. Error Handling:
(function() {
    try {
        // IIFE code
    } catch (error) {
        console.error('IIFE Error:', error);
    }
})();
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        counter,
        calculator,
        Database,
        userFactory,
        config,
        stateManager,
        eventManager
    };
} 