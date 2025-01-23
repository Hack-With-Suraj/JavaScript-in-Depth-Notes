// ******************** JAVASCRIPT EVENTS GUIDE ********************

// ************ PART 1: EVENT FUNDAMENTALS ************

/*
WHAT ARE EVENTS?
- Actions or occurrences in a browser
- User interactions (clicks, keypresses)
- Browser actions (loading, errors)
- Program-triggered actions
- Asynchronous by nature

TYPES OF EVENTS:
1. Mouse Events (click, dblclick, mouseover)
2. Keyboard Events (keydown, keyup, keypress)
3. Form Events (submit, change, focus)
4. Window Events (load, resize, scroll)
5. Document Events (DOMContentLoaded)
6. Custom Events
*/

// ************ 1. BASIC EVENT HANDLING ************

// 1.1 Event Handler Assignment
function basicEventHandling() {
    const button = document.querySelector('button');
    
    // Method 1: DOM Level 0 (older)
    button.onclick = function(event) {
        console.log('Clicked!');
    };
    
    // Method 2: addEventListener (modern)
    button.addEventListener('click', function(event) {
        console.log('Clicked!', event);
    });
}

// 1.2 Event Object Properties
function handleEvent(event) {
    console.log({
        type: event.type,           // Type of event
        target: event.target,       // Element that triggered event
        currentTarget: event.currentTarget,  // Element handling event
        timeStamp: event.timeStamp, // Time of event
        clientX: event.clientX,     // Mouse X coordinate
        clientY: event.clientY      // Mouse Y coordinate
    });
}

// ************ 2. EVENT PROPAGATION ************

/*
EVENT FLOW PHASES:
1. Capturing Phase (down)
2. Target Phase
3. Bubbling Phase (up)
*/

// 2.1 Event Bubbling
function setupBubbling() {
    document.querySelector('#child').addEventListener('click', e => {
        console.log('Child clicked');
    });
    
    document.querySelector('#parent').addEventListener('click', e => {
        console.log('Parent received click');
    });
}

// 2.2 Event Capturing
function setupCapturing() {
    document.querySelector('#parent').addEventListener('click', e => {
        console.log('Parent caught click');
    }, true);  // true enables capturing phase
}

// 2.3 Stop Propagation
function stopEventPropagation(event) {
    event.stopPropagation();  // Stops bubbling
    // event.stopImmediatePropagation();  // Stops all handlers
}

// ************ 3. EVENT DELEGATION ************

// 3.1 Basic Delegation Pattern
function setupDelegation() {
    document.querySelector('#list').addEventListener('click', e => {
        if (e.target.matches('li')) {
            console.log('List item clicked:', e.target.textContent);
        }
    });
}

// 3.2 Advanced Delegation with Multiple Events
class DelegationManager {
    constructor(element) {
        this.element = element;
        this.handlers = new Map();
    }
    
    addHandler(selector, event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Map());
            this.element.addEventListener(event, e => this.handleEvent(e));
        }
        this.handlers.get(event).set(selector, handler);
    }
    
    handleEvent(event) {
        const handlers = this.handlers.get(event.type);
        handlers.forEach((handler, selector) => {
            if (event.target.matches(selector)) {
                handler(event);
            }
        });
    }
}

// ************ 4. CUSTOM EVENTS ************

// 4.1 Creating Custom Events
function createCustomEvent() {
    const event = new CustomEvent('userAction', {
        detail: {
            username: 'John',
            timestamp: Date.now()
        },
        bubbles: true,
        cancelable: true
    });
    
    document.dispatchEvent(event);
}

// 4.2 Custom Event Handling
function handleCustomEvents() {
    document.addEventListener('userAction', e => {
        console.log('User action:', e.detail);
    });
}

// ************ 5. EVENT TYPES AND HANDLING ************

// 5.1 Mouse Events
function setupMouseEvents(element) {
    const events = ['click', 'dblclick', 'mouseenter', 'mouseleave', 
                   'mouseover', 'mouseout', 'mousemove'];
    
    events.forEach(eventType => {
        element.addEventListener(eventType, e => {
            console.log(`${eventType}:`, {
                x: e.clientX,
                y: e.clientY,
                target: e.target
            });
        });
    });
}

// 5.2 Keyboard Events
function setupKeyboardEvents() {
    document.addEventListener('keydown', e => {
        console.log({
            key: e.key,
            code: e.code,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey
        });
    });
}

// 5.3 Form Events
function setupFormEvents(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();  // Prevent default submission
        // Handle form data
    });
    
    form.addEventListener('change', e => {
        if (e.target.matches('input')) {
            validateField(e.target);
        }
    });
}

// ************ 6. ADVANCED PATTERNS ************

// 6.1 Event Throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 6.2 Event Debouncing
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 6.3 Event Queue Management
class EventQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    addEvent(event) {
        this.queue.push(event);
        if (!this.processing) {
            this.processQueue();
        }
    }
    
    async processQueue() {
        this.processing = true;
        while (this.queue.length > 0) {
            const event = this.queue.shift();
            await this.handleEvent(event);
        }
        this.processing = false;
    }
}

// ************ 7. BEST PRACTICES ************

/*
1. Event Handler Management:
   - Remove unused event listeners
   - Use event delegation for dynamic elements
   - Avoid inline event handlers
   - Consider memory implications

2. Performance:
   - Throttle/debounce when appropriate
   - Use passive event listeners
   - Minimize event handler work
   - Batch DOM updates

3. Error Handling:
   - Always handle potential errors
   - Prevent default when needed
   - Consider browser compatibility
   - Test edge cases

4. Accessibility:
   - Handle both mouse and keyboard events
   - Ensure proper focus management
   - Support assistive technologies
   - Follow ARIA guidelines
*/

// ************ INTERVIEW QUESTIONS ************

/*
Q1: What's event delegation and why use it?
A: - Pattern of handling events at a higher level
   - Reduces memory usage
   - Works with dynamic elements
   - Simplifies event handling

Q2: Difference between bubbling and capturing?
A: - Bubbling: Events bubble up from target
   - Capturing: Events capture down to target
   - Default is bubbling
   - Can control with addEventListener third parameter

Q3: How to prevent event propagation?
A: - stopPropagation() stops bubbling
   - stopImmediatePropagation() stops all handlers
   - preventDefault() stops default behavior
   - Return false in some cases

Q4: When to use custom events?
A: - Component communication
   - Decoupling code
   - Creating APIs
   - Testing and debugging
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        DelegationManager,
        EventQueue,
        throttle,
        debounce
    };
} 