// ******************** DOM MANIPULATION IN JAVASCRIPT ********************

// ************ PART 1: DOM FUNDAMENTALS ************

/*
WHAT IS DOM?
- Document Object Model
- Tree-like structure of HTML document
- Programming interface for HTML/XML
- Each HTML element is a node
- Allows JavaScript to manipulate webpage

DOM TREE STRUCTURE:
- Document (root)
  ├── HTML
  │   ├── Head
  │   │   ├── Title
  │   │   └── Meta tags
  │   └── Body
  │       ├── Div
  │       ├── Paragraph
  │       └── Other elements
*/

// ************ 1. DOM SELECTORS ************

// 1.1 Basic Selectors
const elementById = document.getElementById('myId');
const elementsByClass = document.getElementsByClassName('myClass');
const elementsByTag = document.getElementsByTagName('div');

// 1.2 Modern Selectors
const singleElement = document.querySelector('.myClass');
const allElements = document.querySelectorAll('.myClass');

// 1.3 Traversing DOM
const parent = element.parentElement;
const children = element.children;
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;

// ************ 2. CREATING ELEMENTS ************

// 2.1 Basic Element Creation
function createBasicElement() {
    // Create new element
    const div = document.createElement('div');
    
    // Add content
    div.textContent = 'New Element';
    
    // Add attributes
    div.id = 'newDiv';
    div.className = 'new-class';
    
    // Add to DOM
    document.body.appendChild(div);
}

// 2.2 Complex Element Creation
function createComplexElement() {
    const article = document.createElement('article');
    
    // Create structure
    article.innerHTML = `
        <h2>Title</h2>
        <p>Content</p>
        <button>Click me</button>
    `;
    
    // Add event listeners
    const button = article.querySelector('button');
    button.addEventListener('click', () => {
        console.log('Button clicked');
    });
    
    return article;
}

// ************ 3. MODIFYING ELEMENTS ************

// 3.1 Content Modification
function modifyContent(element) {
    // Text content
    element.textContent = 'New text';
    
    // HTML content
    element.innerHTML = '<span>New HTML</span>';
    
    // Attributes
    element.setAttribute('data-id', '123');
    element.removeAttribute('data-old');
    
    // Classes
    element.classList.add('new-class');
    element.classList.remove('old-class');
    element.classList.toggle('active');
}

// 3.2 Style Modification
function modifyStyles(element) {
    // Direct style
    element.style.backgroundColor = 'red';
    element.style.fontSize = '16px';
    
    // CSS classes
    element.className = 'new-class another-class';
    
    // Dataset
    element.dataset.info = 'some data';
}

// ************ 4. REMOVING ELEMENTS ************

// 4.1 Basic Removal
function removeElement(element) {
    element.remove();  // Modern way
    // OR
    element.parentElement.removeChild(element);  // Old way
}

// 4.2 Conditional Removal
function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// ************ 5. ADVANCED DOM MANIPULATION ************

// 5.1 Fragment for Better Performance
function createMultipleElements(count) {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        fragment.appendChild(div);
    }
    
    document.body.appendChild(fragment);
}

// 5.2 Clone Elements
function cloneElement(element, withEvents = false) {
    return element.cloneNode(withEvents);
}

// 5.3 Insert Elements
function insertElements() {
    const parent = document.querySelector('.parent');
    const newElement = document.createElement('div');
    
    // Different insertion methods
    parent.insertBefore(newElement, parent.firstChild);  // Start
    parent.insertAdjacentElement('beforeend', newElement);  // End
    parent.insertAdjacentHTML('afterbegin', '<div>New HTML</div>');
}

// ************ 6. EVENT HANDLING ************

// 6.1 Basic Event Handling
function setupBasicEvents() {
    const button = document.querySelector('button');
    
    button.addEventListener('click', (event) => {
        console.log('Clicked!', event);
    });
    
    button.removeEventListener('click', handler);
}

// 6.2 Event Delegation
function setupEventDelegation() {
    document.querySelector('.list').addEventListener('click', (event) => {
        if (event.target.matches('li')) {
            console.log('List item clicked:', event.target.textContent);
        }
    });
}

// ************ 7. PRACTICAL EXAMPLES ************

// 7.1 Dynamic Form Creation
function createDynamicForm() {
    const form = document.createElement('form');
    
    const fields = ['name', 'email', 'message'];
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = field === 'message' ? 'textarea' : 'text';
        input.name = field;
        input.placeholder = `Enter your ${field}`;
        form.appendChild(input);
    });
    
    return form;
}

// 7.2 Interactive List
class InteractiveList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [];
        this.setupUI();
    }
    
    setupUI() {
        const input = document.createElement('input');
        const button = document.createElement('button');
        const list = document.createElement('ul');
        
        button.textContent = 'Add Item';
        button.onclick = () => this.addItem(input.value);
        
        this.container.append(input, button, list);
    }
    
    addItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.onclick = () => this.removeItem(li);
        this.container.querySelector('ul').appendChild(li);
    }
    
    removeItem(item) {
        item.remove();
    }
}

// ************ 8. PERFORMANCE OPTIMIZATION ************

/*
BEST PRACTICES:
1. Minimize DOM Access
   - Cache DOM elements
   - Use fragments for bulk updates
   - Minimize reflows/repaints

2. Event Handling
   - Use event delegation
   - Remove unused listeners
   - Debounce/throttle when needed

3. Content Updates
   - Batch DOM updates
   - Use requestAnimationFrame
   - Consider virtual DOM for complex UIs

4. Memory Management
   - Clean up event listeners
   - Remove unused elements
   - Watch for memory leaks
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        createBasicElement,
        createComplexElement,
        InteractiveList,
        createDynamicForm
    };
} 