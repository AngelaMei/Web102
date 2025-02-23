# Web102 - The Codepath Projects

This repository contains the projects completed for the Web102 course at Codepath.

## Table of Contents

- [Class 1: React Components](#class-1)


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


### ➡️ Lab 1 - Timetable

**Creating a New React Project:**

1.  Open your terminal.
2.  Run the command: `npm create vite@latest`
3.  Follow the prompts to configure your project.

### ➡️ Project 1 - Community Board
