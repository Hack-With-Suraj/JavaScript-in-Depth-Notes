// ******************** WHILE AND DO-WHILE LOOPS IN JAVASCRIPT ********************

// ************ PART 1: WHILE LOOP FUNDAMENTALS ************

/*
WHAT IS A WHILE LOOP?
- Executes code block while condition is true
- Condition checked before execution
- No built-in counter (manual control)
- More flexible than for loops
- Best for unknown number of iterations

COMPONENTS:
1. Condition (when to continue)
2. Loop body (what to execute)
3. Iterator/Counter (optional)
*/

// ************ 1. BASIC WHILE LOOP PATTERNS ************

// 1.1 Basic Counter
function basicWhileLoop() {
    let count = 0;
    while (count < 5) {
        console.log(count);  // Outputs: 0, 1, 2, 3, 4
        count++;
    }
}

// 1.2 Condition-Based Loop
function readUntilEmpty(input) {
    while (input.length > 0) {
        console.log(input[0]);
        input = input.slice(1);
    }
}

// ************ 2. DO-WHILE LOOP FUNDAMENTALS ************

/*
WHAT IS A DO-WHILE LOOP?
- Executes code block at least once
- Condition checked after execution
- Guarantees minimum one iteration
- Useful for user input validation
- Good for menu-driven programs
*/

// 2.1 Basic Do-While
function basicDoWhile() {
    let count = 0;
    do {
        console.log(count);
        count++;
    } while (count < 5);
}

// 2.2 Input Validation
function getUserInput() {
    let input;
    do {
        input = prompt("Enter a number > 0:");
    } while (input <= 0);
    return input;
}

// ************ 3. ADVANCED PATTERNS ************

// 3.1 Nested While Loops
function nestedWhileExample() {
    let i = 0;
    while (i < 3) {
        let j = 0;
        while (j < 3) {
            console.log(`i: ${i}, j: ${j}`);
            j++;
        }
        i++;
    }
}

// 3.2 Dynamic Condition
function dynamicWhile(array) {
    let i = 0;
    while (shouldContinue(array[i])) {
        processItem(array[i]);
        i++;
    }
}

// 3.3 State Machine Implementation
class StateMachine {
    constructor() {
        this.state = 'IDLE';
    }
    
    run() {
        while (this.state !== 'FINISHED') {
            switch (this.state) {
                case 'IDLE':
                    this.state = 'RUNNING';
                    break;
                case 'RUNNING':
                    this.processData();
                    this.state = 'FINISHED';
                    break;
            }
        }
    }
}

// ************ 4. PRACTICAL EXAMPLES ************

// 4.1 Binary Search Implementation
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (array[mid] === target) return mid;
        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// 4.2 Event Queue Processing
class EventQueue {
    constructor() {
        this.queue = [];
    }
    
    processEvents() {
        while (this.queue.length > 0) {
            const event = this.queue.shift();
            this.handleEvent(event);
        }
    }
}

// 4.3 Recursive Structure Traversal
function traverseTree(node) {
    while (node) {
        console.log(node.value);
        node = node.next;
    }
}

// ************ 5. OPTIMIZATION TECHNIQUES ************

// 5.1 Early Exit Pattern
function findWithEarlyExit(array, predicate) {
    let i = 0;
    while (i < array.length) {
        if (predicate(array[i])) {
            return array[i];  // Early exit when found
        }
        i++;
    }
    return null;
}

// 5.2 Batch Processing
function batchProcess(items, batchSize) {
    let index = 0;
    while (index < items.length) {
        const batch = items.slice(index, index + batchSize);
        processBatch(batch);
        index += batchSize;
    }
}

// ************ 6. ERROR HANDLING AND SAFETY ************

// 6.1 Timeout Protection
function whileWithTimeout(operation, timeout) {
    const startTime = Date.now();
    while (!operation.isComplete()) {
        if (Date.now() - startTime > timeout) {
            throw new Error("Operation timed out");
        }
        operation.step();
    }
}

// 6.2 Safe Infinite Loop Prevention
function safeWhile(condition, maxIterations = 1000) {
    let iterations = 0;
    while (condition()) {
        iterations++;
        if (iterations > maxIterations) {
            throw new Error("Maximum iterations exceeded");
        }
        // Loop body
    }
}

// ************ COMMON PATTERNS AND BEST PRACTICES ************

/*
1. Loop Control:
   - Always have a clear exit condition
   - Update loop variables properly
   - Consider using break/continue
   - Handle edge cases

2. Performance:
   - Minimize work inside loop
   - Use appropriate exit conditions
   - Consider caching values
   - Batch operations when possible

3. Safety:
   - Implement timeout mechanisms
   - Prevent infinite loops
   - Handle errors gracefully
   - Validate input data

4. Readability:
   - Clear loop purpose
   - Meaningful variable names
   - Document complex conditions
   - Consider extracting complex logic
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: When to use while vs do-while?
A: - while: when condition check needed first
   - do-while: when at least one iteration needed
   - while: unknown number of iterations
   - do-while: input validation

Q2: How to handle infinite loops?
A: - Implement timeout mechanisms
   - Use iteration counters
   - Clear exit conditions
   - Error handling

Q3: Difference between while and for loops?
A: - while: condition-based iteration
   - for: counter-based iteration
   - while: more flexible
   - for: more structured

Q4: Common while loop patterns?
A: - Counter loops
   - Condition-based loops
   - Event processing
   - Tree traversal
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        basicWhileLoop,
        getUserInput,
        binarySearch,
        EventQueue,
        whileWithTimeout
    };
} 