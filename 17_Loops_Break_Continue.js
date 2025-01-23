// ******************** FOR LOOPS, BREAK, AND CONTINUE IN JAVASCRIPT ********************

// ************ PART 1: BASIC FOR LOOP CONCEPTS ************

/*
WHAT ARE FOR LOOPS?
- Repetitive execution of code blocks
- Controlled iteration over data
- Three components: initialization, condition, increment/decrement
- Foundation for array manipulation and iteration

COMPONENTS OF FOR LOOP:
1. Initialization (starting point)
2. Condition (when to stop)
3. Increment/Decrement (how to move forward)
*/

// ************ 1. BASIC FOR LOOP PATTERNS ************

// 1.1 Standard For Loop
function basicForLoop() {
    for (let i = 0; i < 5; i++) {
        console.log(i);  // Outputs: 0, 1, 2, 3, 4
    }
}

// 1.2 Reverse For Loop
function reverseForLoop() {
    for (let i = 5; i > 0; i--) {
        console.log(i);  // Outputs: 5, 4, 3, 2, 1
    }
}

// 1.3 Step Increment
function stepLoop() {
    for (let i = 0; i < 10; i += 2) {
        console.log(i);  // Outputs: 0, 2, 4, 6, 8
    }
}

// ************ 2. BREAK STATEMENT ************

/*
WHAT IS BREAK?
- Immediately exits the loop
- Stops further iterations
- Can be used with conditions
- Useful for early termination
*/

// 2.1 Basic Break Example
function findNumber(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            console.log(`Found at index ${i}`);
            break;  // Exit loop when found
        }
    }
}

// 2.2 Break with Nested Loops
function breakNestedLoop() {
    outerLoop: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) {
                break outerLoop;  // Breaks out of both loops
            }
            console.log(`i: ${i}, j: ${j}`);
        }
    }
}

// ************ 3. CONTINUE STATEMENT ************

/*
WHAT IS CONTINUE?
- Skips rest of current iteration
- Continues with next iteration
- Useful for filtering conditions
- Maintains loop execution
*/

// 3.1 Basic Continue Example
function skipEvenNumbers() {
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
            continue;  // Skip even numbers
        }
        console.log(i);  // Outputs: 1, 3, 5, 7, 9
    }
}

// 3.2 Continue with Nested Loops
function continueNestedLoop() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === j) {
                continue;  // Skip when i equals j
            }
            console.log(`i: ${i}, j: ${j}`);
        }
    }
}

// ************ 4. ADVANCED PATTERNS ************

// 4.1 Multiple Counters
function multipleCounters() {
    for (let i = 0, j = 10; i < j; i++, j--) {
        console.log(`i: ${i}, j: ${j}`);
    }
}

// 4.2 Dynamic Increment
function dynamicIncrement(array) {
    for (let i = 0; i < array.length;) {
        console.log(array[i]);
        i += array[i];  // Jump based on current value
    }
}

// 4.3 Complex Break Conditions
function complexBreak(matrix) {
    let found = false;
    for (let i = 0; i < matrix.length && !found; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < 0) {
                found = true;
                break;  // Break inner loop
            }
        }
    }
    return found;
}

// ************ 5. PRACTICAL EXAMPLES ************

// 5.1 Array Processing with Break
function findFirstMatch(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return array[i];  // Break and return when found
        }
    }
    return null;
}

// 5.2 Data Validation with Continue
function processValidData(data) {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        if (!isValid(data[i])) {
            continue;  // Skip invalid data
        }
        results.push(processItem(data[i]));
    }
    return results;
}

// 5.3 Matrix Traversal
function spiralTraversal(matrix) {
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        
        // Break if done
        if (top > bottom) break;
        
        // Continue with remaining traversal...
    }
    return result;
}

// ************ 6. OPTIMIZATION PATTERNS ************

// 6.1 Cache Length for Performance
function optimizedLoop(array) {
    for (let i = 0, len = array.length; i < len; i++) {
        // Length cached in len variable
        console.log(array[i]);
    }
}

// 6.2 Early Break Optimization
function findInSortedArray(sortedArray, target) {
    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i] > target) {
            break;  // Early break if passed target
        }
        if (sortedArray[i] === target) {
            return i;
        }
    }
    return -1;
}

// ************ COMMON PITFALLS AND SOLUTIONS ************

/*
1. Infinite Loops:
   - Always ensure termination condition
   - Check increment/decrement logic
   - Verify break conditions
*/
function avoidInfiniteLoop() {
    let i = 0;
    for (;;) {  // Infinite loop
        if (i >= 5) break;  // Proper exit condition
        i++;
    }
}

/*
2. Off-by-One Errors:
   - Be careful with <= vs <
   - Check array bounds
   - Verify initial and final values
*/
function handleOffByOne(array) {
    for (let i = 0; i < array.length; i++) {
        // Correct boundary check
    }
}

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's the difference between break and continue?
A: - break exits the loop completely
   - continue skips current iteration
   - break stops further execution
   - continue moves to next iteration

Q2: How to break from nested loops?
A: - Use labeled statements
   - Use boolean flags
   - Extract to function and return

Q3: When to use for...of vs traditional for loop?
A: - for...of for simple iteration
   - traditional for when need index
   - traditional for more control
   - for...of cleaner syntax

Q4: How to optimize loop performance?
A: - Cache array length
   - Minimize work in loop
   - Use appropriate break conditions
   - Consider alternative approaches
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        findNumber,
        skipEvenNumbers,
        multipleCounters,
        findFirstMatch,
        spiralTraversal
    };
} 