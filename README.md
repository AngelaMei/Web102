# Web102 - The Codepath Projects

This repository contains the projects completed for the Web102 course at Codepath.

## Table of Contents

- [Class 1: React Components](#class-1)
- [Class 2: State](#class-2)
- [Class 3: Form](#class-3)
- [Class 4: Career Workshop](#class-4)
- [Class 5: Conditional Rendering & useEffect](#class-5)
- [Class 6: ](#class-6)

## Class 1

**Slide Link:** [Class 1 Slides](https://docs.google.com/presentation/d/1lcdZmzxKyMRZarTjk5sJEwNvOLG9_Nbj95TTTw86vns/edit)

### What is ReactJS?

ReactJS is a JavaScript library developed by Facebook for building interactive user interfaces quickly and efficiently with less code than standard JavaScript.

### JSX

JSX is a JavaScript extension syntax used in React to write HTML and JavaScript together easily. JSX is compiled into browser-understandable JavaScript.

**Key Differences between JSX and HTML:**

*   `className` is used instead of `class`.
*   `onClick` is used instead of `onclick`.
*   Self-closing tags in JSX must have a forward slash (e.g., `<img src="#" />`), while it's optional in HTML (e.g., `<img src="#">`).

### Components
A component is an independent and reusable piece of a user interface.
* The root component is the component where the layout structure of the user interface is defined. 
* All other components are child nodes of the root component.
* The name of the component must be capitalized and correspond to the file name.

### Props in React

In React, **props** (short for properties) are a way to pass data from a parent component to a child component.  Think of them like arguments you pass to a function.  Props are read-only within the child component; the child cannot directly modify the props it receives.  This helps maintain a unidirectional data flow, making your application easier to understand and debug.

**Example:**

```javascript
// Parent component
function Parent() {
  const message = "Hello from Parent!";
  return (
    <Child message={message} />
  );
}

// Child component
function Child(props) {
  return (
    <p>{props.message}</p> // Accessing the prop
  );
}
```

**Code Expression**

What is this

```javascript
{props.progress === 'Project' ? 'Project' : ''}
```
1. ```props.progress```: This accesses a prop (short for property) passed to the React component.  Props are a way to send data from a parent component to a child component.
2. Condition: ``` === 'Project' ?```
* If True: ```'Project'``` (The expression evaluates to the string 'Project')
* If False: ```''``` (The expression evaluates to an empty string)



### ➡️ Lab 1 - Timetable

**Creating a New React Project:**

1.  Open your terminal.
2.  Run the command: `npm create vite@latest`
3.  Follow the prompts to configure your project.

### ➡️ Project 1 - Community Board

## Class 2

**Slide Link:** [Class 2 Slides](https://docs.google.com/presentation/d/1oykq3FKH869pek56gF-Cj3vP_4XL_8GIsJejtPfd_To/edit#slide=id.gfee031c7e2_0_1760)

### What is State?
「state」（狀態）是指元件內部用來儲存和管理資料的物件。這些資料會影響元件的渲染結果，而且當 state 改變時，React 會自動重新渲染元件，以反映最新的資料。

State refers to a component’s memory: the variables that persist across renders of the component.

#### When to use?
* When you need to retain information between renders of a component
* When you need to display the updated information to the user

#### What is a Hook?
A hook is a special function that allows you to use state and lifecycle features for components.
* Don’t call Hooks inside loops, conditionals, or nested functions
* Only call hooks from inside React functions

#### How to use?
```javascript
import { useState } from ‘react’;
const [index, setindex] = useState(0);
```

### ➡️ Lab 2 - Samosa Selector

### ➡️ Project 2 - Flashcards

## Class 3

**Slide Link:** [Class 3 Slides](https://docs.google.com/presentation/d/1hiW4KHZAuyA8Ri66VE9vhh-MyRUREEvdXJLfT-wIPV0/edit?slide=id.g168a72c062d_0_407#slide=id.g168a72c062d_0_407)

### Controlled Components
Controlled components are a fundamental concept in React for managing form inputs. They provide a way to have React's state be the "single source of truth" for form data.

#### What are Controlled Components?

In a controlled component, the value of a form element (like `<input>`, `<textarea>`, `<select>`) is controlled by React's state. When the user interacts with the form element, an event handler updates the state, and React re-renders the component to reflect the new value.

This is different from uncontrolled components, where the form element manages its own state internally.

```Javascript  
<form onSubmit={handleSubmit}>
  <label>
    Username:
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
  </label>
</form>
```

### Arrays, Objects, and useState

#### With Array
When working with arrays in useState, do not modify the array directly. Instead, create a new array with the desired changes.

```javascript
const [items, setItems] = useState([]);

const addItem = (newItem) => {
  setItems([...items, newItem]); // Create a new array with the new item
};
```

#### With Objects
Similar to arrays, do not modify objects directly. Create a new object with the updated properties.

```javascript
const [user, setUser] = useState({ name: 'John', age: 30 });

const updateAge = (newAge) => {
  setUser({ ...user, age: newAge }); // Create a new object with updated age
};
```

## Class 4

Career Workshop

## Class 5

### HTTP Request

| Method | Purpose | Data Location | Idempotent | Cachable |
| :----- | :------ | :------------ | :--------- | :------- |
| GET    | Retrieve data | URL (query params) | Yes | Yes |
| POST   | Submit data for processing | Request body | No | No |
| PUT    | Replace resource | Request body | Yes | No |
| DELETE | Delete resource | (Often URL) | Yes | No |

### Promise
The Promise is Created: When you ask JavaScript to do something that takes time, it gives you a "promise" object.

The Promise Has Three States
* Pending
* Fulfilled (Resolved)
* Rejected

![Async vs sync](/cap/public/async.png)

#### Fetch + then

```Javascript
fetch(URL)
  .then((response) => response.json()).then((data) => { // If Success
  .catch() // For Error Handling
});
```

#### Asyn + Await
Async and await are special keywords in JavaScript that make working with promises even easier and cleaner.

* **Cleaner and more readable code:** Async/await makes asynchronous code look like synchronous code, making it easier to follow the flow of execution.   
* **Improved error handling:** Using try...catch blocks simplifies error handling in asynchronous code.


```Javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Got the data:', data);
    return data; // Return the data as a promise.
  } catch (error) {
    console.error('Oops, something went wrong:', error);
    throw error; // Re-throw the error, so the caller knows it failed.
  }
}
```

#### Axios Library
For making HTTP requests, Axios is a helpful library that makes it simpler.

```command
$  npm install axios
```

```Javascript
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

### Conditional Rendering & useEffect

#### useEffect
UseEffect is a React hook that lets you perform "side effects" in functional components.

* Fetching data from an API.
* Setting up subscriptions.
* Directly manipulating the DOM.
* setting up timers.

Using UseEffect to avoid infinite loop.

```Javascript
  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this effect runs only once
```

#### URL Parameter

* window.location.search


## Class 6

### Component Life Cycle
Now we use UseEffect instead of React component cycle.

- Mount: Add the component to screen
  - componentDidMount(): E.g. Connect to API
- Update: updated via changes in props or state
  - componentDidUpdate(): E.g. Update API with new Info
- Unmount: Removed
  - componentWillMount(): E.g. Disconnect API

### Filter
- It creates a new array.
- It iterates through each element of the original array.
- It applies a "test" (a function you provide) to each element.
- If the test returns `true`, the element is included in the new array.
- If the test returns `false`, the element is skipped.

```Javascript
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 800 },
  { name: 'Tablet', price: 300 },
  { name: 'Headphones', price: 150 },
];

const expensiveProducts = products.filter(product => product.price > 500);

console.log(expensiveProducts);
// Output:
// [
//   { name: 'Laptop', price: 1200 },
//   { name: 'Phone', price: 800 }
// ]
```

### Map
- It creates a new array by transforming each element of the original array.   
- It applies a function (a "callback function") that you provide to each element.   
- It returns a new array containing the results of applying the callback function to each element.

```Javascript
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 800 },
  { name: 'Tablet', price: 300 },
];

const productNames = products.map(product => product.name);

console.log(productNames); // Output: ["Laptop", "Phone", "Tablet"]
```
