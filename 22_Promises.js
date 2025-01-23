// ******************** JAVASCRIPT PROMISES GUIDE ********************

// ************ PART 1: PROMISE FUNDAMENTALS ************

/*
WHAT IS A PROMISE?
- Object representing eventual completion of async operation
- Has three states: pending, fulfilled, rejected
- Provides better handling of async operations
- Solves callback hell problem
- Part of ES6 (ES2015)

PROMISE STATES:
1. Pending: Initial state, neither fulfilled nor rejected
2. Fulfilled: Operation completed successfully
3. Rejected: Operation failed
*/

// ************ 1. CREATING PROMISES ************

// 1.1 Basic Promise Creation
function basicPromise() {
    return new Promise((resolve, reject) => {
        // Async operation
        const success = true;
        
        if (success) {
            resolve('Operation successful');
        } else {
            reject(new Error('Operation failed'));
        }
    });
}

// 1.2 Promise with Timeout
function promiseWithTimeout(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Completed after ' + timeout + 'ms');
        }, timeout);
    });
}

// ************ 2. PROMISE HANDLING ************

// 2.1 Basic Promise Handling
function handlePromise() {
    basicPromise()
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            console.log('Cleanup operations');
        });
}

// 2.2 Promise Chaining
function promiseChaining() {
    return fetchUser(1)
        .then(user => fetchUserPosts(user.id))
        .then(posts => fetchPostComments(posts[0].id))
        .then(comments => {
            return { comments, count: comments.length };
        })
        .catch(error => {
            console.error('Error in chain:', error);
            throw error; // Re-throwing for further handling
        });
}

// ************ 3. ADVANCED PROMISE PATTERNS ************

// 3.1 Promise.all - Parallel Execution
function parallelPromises() {
    const promises = [
        fetch('/api/users'),
        fetch('/api/posts'),
        fetch('/api/comments')
    ];
    
    return Promise.all(promises)
        .then(([users, posts, comments]) => {
            return {
                users: users.json(),
                posts: posts.json(),
                comments: comments.json()
            };
        });
}

// 3.2 Promise.race - First to Complete
function promiseRace() {
    return Promise.race([
        fetch('/api/fast-server'),
        fetch('/api/slow-server')
    ]).then(response => response.json());
}

// 3.3 Promise.allSettled - Wait for All
function allSettledExample() {
    return Promise.allSettled([
        Promise.resolve(1),
        Promise.reject('error'),
        Promise.resolve(3)
    ]).then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('Value:', result.value);
            } else {
                console.log('Error:', result.reason);
            }
        });
    });
}

// ************ 4. PROMISE UTILITIES ************

// 4.1 Promisify Callback Function
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    };
}

// 4.2 Delay Function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 4.3 Retry Mechanism
async function retryOperation(operation, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// ************ 5. ERROR HANDLING PATTERNS ************

// 5.1 Global Error Handler
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// 5.2 Custom Error Types
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

// 5.3 Error Recovery
async function errorRecovery() {
    try {
        const result = await riskyOperation();
        return result;
    } catch (error) {
        if (error instanceof NetworkError) {
            return await fallbackOperation();
        }
        throw error;
    }
}

// ************ 6. ADVANCED IMPLEMENTATIONS ************

// 6.1 Promise Queue
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    enqueue(promiseFunc) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseFunc, resolve, reject });
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.processing) return;
        this.processing = true;
        
        while (this.queue.length > 0) {
            const { promiseFunc, resolve, reject } = this.queue.shift();
            try {
                const result = await promiseFunc();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        
        this.processing = false;
    }
}

// 6.2 Promise Pool
class PromisePool {
    constructor(maxConcurrent) {
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.queue = [];
    }
    
    async add(promiseFunc) {
        if (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        
        this.running++;
        try {
            return await promiseFunc();
        } finally {
            this.running--;
            if (this.queue.length > 0) {
                this.queue.shift()();
            }
        }
    }
}

// ************ 7. BEST PRACTICES ************

/*
1. Error Handling:
   - Always have catch blocks
   - Use type checking for errors
   - Implement proper error recovery
   - Handle edge cases

2. Promise Chains:
   - Keep chains readable
   - Return values in then blocks
   - Use proper error propagation
   - Consider breaking into functions

3. Async/Await Usage:
   - Use for cleaner code
   - Proper try/catch blocks
   - Remember await is sequential
   - Consider Promise.all for parallel

4. Performance:
   - Use appropriate Promise methods
   - Consider memory implications
   - Handle cleanup properly
   - Implement cancellation when needed
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What is Promise and why use it?
A: - Handles async operations
   - Better than callbacks
   - Cleaner error handling
   - Supports chaining

Q2: Difference between Promise.all and Promise.race?
A: - Promise.all waits for all promises
   - Promise.race returns first completed
   - Promise.all fails if any fails
   - Promise.race returns first success/failure

Q3: How to handle Promise rejection?
A: - Use .catch() method
   - try/catch with async/await
   - Global unhandledrejection
   - Error recovery patterns

Q4: Microtask queue vs Macrotask queue?
A: - Promises use microtask queue
   - setTimeout uses macrotask queue
   - Microtasks have priority
   - Affects execution order
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        PromiseQueue,
        PromisePool,
        retryOperation,
        promisify
    };
}