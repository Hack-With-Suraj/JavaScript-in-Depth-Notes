// ******************** HIGH ORDER ARRAY LOOPS IN JAVASCRIPT ********************

// ************ PART 1: FUNDAMENTALS ************

/*
WHAT ARE HIGH ORDER ARRAY METHODS?
- Functions that take other functions as arguments
- Operate on arrays in a declarative way
- More readable than traditional loops
- Built-in methods in JavaScript arrays
- Functional programming approach

MAIN METHODS:
1. forEach() - Iteration
2. map() - Transform elements
3. filter() - Select elements
4. reduce() - Accumulate values
5. find() - Search elements
6. some()/every() - Test elements
*/

// ************ 1. forEach() METHOD ************

/*
forEach():
- Executes function for each element
- Cannot break or return
- Good for side effects
- No new array created
*/

// 1.1 Basic forEach
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => {
    console.log(num * 2);
});

// 1.2 With Index and Array
const fruits = ['apple', 'banana', 'orange'];
fruits.forEach((fruit, index, array) => {
    console.log(`${index}: ${fruit} (of ${array.length})`);
});

// ************ 2. map() METHOD ************

/*
map():
- Creates new array
- Transforms each element
- Same length as original
- Immutable operation
*/

// 2.1 Basic Transformation
const doubled = numbers.map(num => num * 2);

// 2.2 Complex Objects
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
];

const userNames = users.map(user => user.name);

// 2.3 Chaining Maps
const processed = numbers
    .map(num => num * 2)
    .map(num => num.toString())
    .map(str => `Number: ${str}`);

// ************ 3. filter() METHOD ************

/*
filter():
- Creates new array
- Elements that pass test
- Can change length
- Immutable operation
*/

// 3.1 Basic Filtering
const evenNumbers = numbers.filter(num => num % 2 === 0);

// 3.2 Complex Filtering
const adults = users.filter(user => user.age >= 18);

// 3.3 Chaining Filter and Map
const processedAdults = users
    .filter(user => user.age >= 18)
    .map(user => user.name);

// ************ 4. reduce() METHOD ************

/*
reduce():
- Accumulates values
- Returns single value
- Most flexible method
- Can implement other methods
*/

// 4.1 Basic Sum
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// 4.2 Object Accumulation
const usersByAge = users.reduce((acc, user) => {
    acc[user.age] = acc[user.age] || [];
    acc[user.age].push(user);
    return acc;
}, {});

// 4.3 Advanced Reduce (Implementing Map)
function customMap(array, fn) {
    return array.reduce((acc, curr, i, arr) => {
        acc.push(fn(curr, i, arr));
        return acc;
    }, []);
}

// ************ 5. ADVANCED PATTERNS ************

// 5.1 Pipeline Processing
const pipeline = [
    data => data.filter(x => x > 0),
    data => data.map(x => x * 2),
    data => data.reduce((a, b) => a + b, 0)
];

function processPipeline(data, pipeline) {
    return pipeline.reduce((acc, fn) => fn(acc), data);
}

// 5.2 Composite Operations
function processUsers(users) {
    return users
        .filter(user => user.active)
        .map(user => ({
            ...user,
            lastLogin: new Date()
        }))
        .reduce((groups, user) => {
            const group = user.type;
            groups[group] = groups[group] || [];
            groups[group].push(user);
            return groups;
        }, {});
}

// 5.3 Custom Iterator
class CustomArray {
    constructor(array) {
        this.array = array;
    }
    
    mapFilter(mapFn, filterFn) {
        return this.array
            .filter(filterFn)
            .map(mapFn);
    }
}

// ************ 6. PRACTICAL EXAMPLES ************

// 6.1 Data Transformation
const orders = [
    { id: 1, items: ['book', 'pen'], total: 50 },
    { id: 2, items: ['laptop'], total: 1000 },
    { id: 3, items: ['phone', 'case'], total: 600 }
];

// Calculate total revenue
const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

// Get all items
const allItems = orders
    .map(order => order.items)
    .flat();

// 6.2 Data Analysis
const grades = [
    { subject: 'math', score: 85 },
    { subject: 'physics', score: 90 },
    { subject: 'chemistry', score: 78 }
];

// Calculate average
const average = grades
    .map(grade => grade.score)
    .reduce((acc, score, i, arr) => acc + score / arr.length, 0);

// 6.3 DOM Manipulation
function updateUserList(users) {
    const userElements = users
        .filter(user => user.active)
        .map(user => `<li>${user.name}</li>`)
        .join('');
    
    document.querySelector('#userList').innerHTML = userElements;
}

// ************ 7. OPTIMIZATION AND BEST PRACTICES ************

/*
1. Performance Considerations:
   - Use for loop for simple iterations
   - Avoid creating unnecessary arrays
   - Consider breaking early when possible
   - Cache array length in traditional loops

2. Method Selection:
   - forEach for side effects
   - map for transformations
   - filter for selection
   - reduce for accumulation
   - find for single element
   - some/every for testing

3. Chaining:
   - Keep chains readable
   - Break into multiple lines
   - Consider performance impact
   - Use intermediate variables for clarity

4. Error Handling:
   - Check for empty arrays
   - Validate callback functions
   - Handle edge cases
   - Use try-catch when needed
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: Difference between map and forEach?
A: - map returns new array, forEach doesn't
   - map is for transformation, forEach for iteration
   - map is chainable, forEach isn't
   - map is functional, forEach is imperative

Q2: When to use reduce vs other methods?
A: - reduce for accumulation to single value
   - reduce for complex transformations
   - reduce when need previous results
   - reduce for flexible operations

Q3: How to implement map using reduce?
A: array.reduce((acc, curr) => {
       acc.push(callback(curr));
       return acc;
   }, []);

Q4: Performance implications?
A: - Methods are slower than for loops
   - Creating new arrays costs memory
   - Chaining creates intermediate arrays
   - Consider data size and operation complexity
*/

// ************ 8. FOR...IN AND FOR...OF LOOPS ************

/*
FOR...IN LOOP:
- Iterates over enumerable properties
- Used primarily for objects
- Includes inherited properties
- Returns property names/keys
- Not recommended for arrays

FOR...OF LOOP:
- Iterates over iterable values
- Used for arrays, strings, maps, sets
- Direct access to values
- ES6+ feature
- More intuitive for arrays
*/

// ************ 8.1 FOR...IN EXAMPLES ************

// 8.1.1 Basic Object Iteration
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 8.1.2 Array with for...in (Not Recommended)
const colors = ['red', 'green', 'blue'];
for (const index in colors) {
    console.log(`Index ${index}: ${colors[index]}`);
}

// 8.1.3 Inherited Properties
const child = Object.create(person);
child.toy = 'ball';

for (const prop in child) {
    if (child.hasOwnProperty(prop)) {
        console.log(`Own property: ${prop}`);
    } else {
        console.log(`Inherited property: ${prop}`);
    }
}

// ************ 8.2 FOR...OF EXAMPLES ************

// 8.2.1 Array Iteration
const numbersArray = [1, 2, 3, 4, 5];
for (const num of numbersArray) {
    console.log(num);  // Direct access to values
}

// 8.2.2 String Iteration
const str = "Hello";
for (const char of str) {
    console.log(char);  // Iterates over characters
}

// 8.2.3 Set Iteration
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
for (const num of uniqueNumbers) {
    console.log(num);  // No duplicates
}

// 8.2.4 Map Iteration
const userMap = new Map([
    ['name', 'John'],
    ['age', 30]
]);

for (const [key, value] of userMap) {
    console.log(`${key}: ${value}`);
}

// ************ 8.3 ADVANCED PATTERNS ************

// 8.3.1 Custom Iterables
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    *[Symbol.iterator]() {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
}

const range = new Range(1, 5);
for (const num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}

// 8.3.2 Combining for...in and for...of
const usersList = [
    { name: 'John', roles: ['admin', 'user'] },
    { name: 'Jane', roles: ['user'] }
];

for (const user of usersList) {
    for (const key in user) {
        console.log(`${key}: ${user[key]}`);
    }
}

// 8.3.3 Async Iteration
async function* asyncRange(start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

async function processAsyncRange() {
    for await (const num of asyncRange(1, 5)) {
        console.log(num);  // Numbers with 1-second delay
    }
}

// ************ 8.4 BEST PRACTICES ************

/*
1. For...in Best Practices:
   - Use for objects, not arrays
   - Check hasOwnProperty when needed
   - Be aware of inheritance chain
   - Use Object.keys() for array-like iteration

2. For...of Best Practices:
   - Prefer for arrays and other iterables
   - Use for cleaner array iteration
   - Great for async iteration
   - Use destructuring when possible

3. When to Use Each:
   for...in:
   - Object property enumeration
   - Debugging object properties
   - Working with dynamic properties
   - Legacy code compatibility

   for...of:
   - Array iteration
   - String character iteration
   - Set/Map iteration
   - Custom iterable objects
*/

// ************ 8.5 COMMON PITFALLS ************

// 8.5.1 Array Iteration with for...in
const arr = [1, 2, 3];
arr.customProp = 'bad';

// Wrong way (includes customProp)
for (const i in arr) {
    console.log(arr[i]);
}

// Right way
for (const num of arr) {
    console.log(num);
}

// 8.5.2 Object Iteration with for...of
// This will throw error
try {
    for (const value of person) {
        console.log(value);
    }
} catch (error) {
    console.log('Objects are not iterable');
}

// ************ ADDITIONAL INTERVIEW QUESTIONS ************

/*
Q5: When would you use for...in vs Object.keys()?
A: - for...in for enumerable properties including prototype chain
   - Object.keys() for own enumerable properties only
   - Object.keys() returns array for further array methods
   - for...in better for dynamic property checking

Q6: How to make custom objects iterable with for...of?
A: - Implement Symbol.iterator method
   - Return iterator object with next()
   - Use generator functions for easier implementation
   - Define custom iteration behavior
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        CustomArray,
        processPipeline,
        processUsers,
        updateUserList,
        Range,
        processAsyncRange
    };
} 