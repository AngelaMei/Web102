# Web102 - The Codepath Projects

This repository contains the projects completed for the Web102 course at Codepath.

## Table of Contents

- [Class 1: React Components](#class-1)
- [Class 2: State](#class-2)


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