# Objectives

* Explain what a frontend framework is and why they can be helpful in writing
  more complex applications.
* Explain what ReactJS is and where it fits in our applications' stack.
* Explain the component model of web development.
* Create and render React components in the browser.

# Intro

`React - a Javascript library for building user interfaces`

# A. Install Tools and Create New Project

1. Run the following code:

```sh
npm install -g create-react-app
create-react-app hello-world 
cd hello-world 
npm run start
```

2. Now edit `src/index.js`

# B. Hello World  (00:10)

1. Whack everything in the file and replace with: 

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<h1>Hello World</h1>,
  document.body
);
``` 

2. Play around with the code in `render()` (_remember the JSX needs to be
   wrapped in a single tag_)

# C. Components (00:25)

1. Page heading example on multiple places on the page

```js
ReactDOM.render(
  <div>
    <h1>Main Title</h1>
    <h2>Sub title</h2>
  </div>,
  document.body
);
```

1. Components solves 2 problems: 
  * re-using HTML and CSS, 
  * keeping the JS logic with the HTML

```
//add: , { Component } 

class Title extends Component {
  render () {
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <p>You are {this.props.age} years old</p>
      </div>
    )
  }
}

... 

  <Title />
  <Title />, 
  document.body
)

```

2. Turn and Talk: How might you redesign you project 2 using components?

# Props (00:55)

1. What if I want each piece to have different titles and sub titles?

```
{{this.props.title}}
{{this.props.subtitle}}
```

# Stretch goals

* Write a todo list component that uses a tood item component
