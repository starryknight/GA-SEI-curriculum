# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> MERN Stack Bog App

### Overview

Everyone does blog apps. Now, you're going to work on a **bog app**. Researchers are collecting data on a local bog and need an app to quickly record field data.

### Objectives

It's time to put all your React and Express knowledge into practice! In this project, you will:

- Review **CRUD** in the context of a MERN application.
- Build Forms and communicate with a back end using React
- Build memory for the steps required to create an Express app.


### Workflow

You'll work through this project as a "time trial." You will be building the app 4 times, each time gaining skills through repetition. Here's how we want you to work:

  1. Start by making a parent folder that will hold each of your trial apps.
  1. Move through the instructions below to build your bog app. Use as many hints as you'd like to check your work and make sure you get through the lab smoothly. Commit your work along the way and at the conclusion.  Take notes on your workflow.
  1. When you've finished a run, go back to the parent folder and make a new MERN app. Make sure you name it differently (e.g. `bog-app-one`, `bog-app-two`)! Watch out that you're not in a nested MERN app folder!
  1. Go through the lab another time. This time, time yourself on how long it takes you. Push yourself to peek at the hints more sparingly and code as much as you can on your own. Try not reference the solution; you can look at your first MERN app if you're stuck.  Again, make sure to commit your work.
  1. Repeat the lab a third time. Try not to use the instructions to build your bog app and refer to them only when very stuck. Time yourself again and aim to build the app faster than you built it the second time around. Make sure you have roughly the same number of commits as you had on your second run. Version control isn't the place to cut corners!
  1. Repeat the lab a fourth time. Time yourself. Try to streamline your process. Squash bugs faster and try not to look at any resources. Commit often and build it as fast as you can!


<img src="https://camo.githubusercontent.com/d758d1c1a85e7829d11df73ea25820533db881e7/687474703a2f2f692e67697068792e636f6d2f545467647a75545766784d566439716a4262712e676966" width="40%">

### Submission

When you're finished with your timed runs, edit the README to add an introduction paragraph that includes:

 - a 3-5 sentences reflection on how this went for you  
 - a tip for others to help conquer some part of the app that used to trip you up  
 - the times for your first and fourth runs


## Background

> A bog is a mire that accumulates peat, a deposit of dead plant material — often mosses.

You may hear bog and think of Yoda and Luke...

![](https://cloud.githubusercontent.com/assets/7833470/11500466/211c115a-97e2-11e5-9b7f-9fc900023d8d.jpeg)

Or maybe Sir Didymus and The Bog of Eternal Stench...

![](https://cloud.githubusercontent.com/assets/7833470/11500467/212e3c7c-97e2-11e5-9256-ca7e28cf6941.gif)

## CRUD and REST Reference

REST stands for **REpresentational State Transfer**. We will strictly adhere to RESTful *routing*.

| Verb | Path | Action | Used for |
| :--- | :--- | :--- | :--- |
| GET | /api/creatures | index | displaying list of all creatures |
| GET | /api/creatures/new | new | displaying an HTML form to create a new creature |
| POST | /api/creatures | create | creating a new creature in the database |
| GET | /api/creatures/:id | show | displaying a specific creature |
| GET | /api/creatures/:id/edit | edit | displaying an HTML form to edit a specific creature |
| PUT or PATCH | /api/creatures/:id | update | updating a specific creature in the database |
| DELETE | /api/creatures/:id | destroy | deleting a specific creature in the database |

## Part I: Getting Started

![](https://camo.githubusercontent.com/58b675eee577ccb1f4b57b14e58761b3fa56a3b8/687474703a2f2f692e67697068792e636f6d2f313149334f7346524c6b514951552e676966)

#### 0. Create a folder that will (eventually) contain four MERN stack apps
Only do this step the first time:

```bash
mkdir bog-app-time-trials
cd bog-app-time-trials
```

#### 1. Set up a new Express project
(Write down your start time!!!)

Create a new Express project:

```bash
 mkdir bog-express-one
 cd bog-express-one
 npm init -y
 npm i express mongoose dotenv morgan concurrently
 touch server.js
```

After installing your server side dependencies and creating your `server.js` it's time to open up your text editor and get to work!

Add the following to your `server.js`:
 - Import all of your server side dependencies (express, morgan, etc)
 - Inject middleware (like `morgan`) using `app.use`
 - Set up a get request that sends back "Hello World"
 - Tell your app to listen on port 3001, and console log when it connects.

<details>
  <summary>Example</summary>

```js
const express = require('express')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('App is up and running on port ' + PORT)
})
```

</details>

Take a look at some previous examples to refresh you on how to set up an express app. [Sample Project 3](https://github.com/dphurley/sample_project_three)

#### 2. Add a `db` directory and create a connection file that connects to your database. Don't forget your `.env` file! This is important for connecting to your mongo database!

Add the following to your `connection.js` file:

 - Set up `dotenv` to parse your environment variables
 - Connect to the Mongoose database at `process.env.MONGODB_URI` (make sure you have a `.env` file where you define the address)
 - Log when your database connects (a.k.a 'open') and when it errors

 <details>
  <summary>Connection Example</summary>

  ```js
  require('dotenv').config()
  const mongoose = require('mongoose')

  mongoose.connect(process.env.MONGODB_URI)

  mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
  })

  mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connection error!!! ${error}`)
    process.exit(-1)
  })

  module.exports = mongoose
  ```
</details>

#### 3. Set up a models directory and build out your Creature model.

<details>
<summary>Model Example</summary>

```js
const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Creature = new Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('Creature', Creature)
```

</details>

Also create a `seeds.js` file and add a few test creatures to your database.  Verify that this works via the mongo command line.

<details>
  <summary>Seeds Example</summary>

  ```js
  const Creature = require('../models/Creature.js')
  
  // using async/await
  const saved = async () => {
    await Creature.deleteMany()
    const luke = new Creature({name: 'Luke', description: 'Jedi'})
    await luke.save()
    const darth = new Creature({name: 'Darth Vader', description: 'Father of Luke'})
    await darth.save()
  }

  saved()
  ```
  
  ---or---
  
  ```js
  const Creature = require('../models/Creature.js')
  
  // using Promises
  Creature.deleteMany().then(() => {
    const luke = new Creature({name: 'Luke', description: 'Jedi'})
    return luke.save()
  }).then(() => {
    const darth = new Creature({name: 'Darth Vader', description: 'Father of Luke'})
    return darth.save()
  })
  ```
  
</details>

#### 4. Create a routes directory and build out RESTful API routes for creatures.
Remember to import the express router. Then create a controllers directory and build out actions for your routes.

<details>

```js
const express = require('express')
const router = express.Router()

const creatureController = require('../controllers/creatureController')
```
</details>


Make sure there are routes for each RESTful action.
- Get All Creatures
- Get One Creature by Id
- Create New Creature
- Update A Creature
- Delete A Creature

Use Postman to test each routes.

Make sure to import your controllers into your `index.js` file.

<details>
  <summary>Index Route</summary>

  ```js
  index: async (req, res) => {
    try {
      const creatures = await Creature.find({})
      res.json(creatures)
    } catch (err) {
      console.log(err)
    }
  }
  ```
  --- or ---
  ```js
  index: (req, res) => {
    Creature.find().then((creatures) => {
      res.json(creatures)
    }).catch((err) => {
      console.log(err)
    })
  }
  ```
</details>

<details>
  <summary>Show Route</summary>

  ```js
  show: async (req, res) => {
    try {
      const creatureId = req.params.id
      const creature = await Creature.findById(creatureId)
      res.json(creature)
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  }
  ```
</details>

<details>
  <summary>Create Route</summary>

  ```js
  create: async (req, res) => {
    try {
      const newCreature = req.body
      const savedCreature = await Creature.create(newCreature)
      res.json(savedCreature)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
  ```
</details>

<details>
  <summary>Update Route</summary>

  ```js
  update: async (req, res) => {
    try {
      const creatureId = req.params.id
      const updatedCreature = req.body
      const savedCreature = await Creature.findByIdAndUpdate(creatureId, updatedCreature, {new: true})
      res.json(savedCreature)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
  ```
</details>

<details>
  <summary>Delete Route</summary>

  ```js
  delete: async (req, res) => {
    try {
      const creatureId = req.params.id
      await Creature.findByIdAndRemove(creatureId)
      res.json({
        msg: 'Successfully Deleted'
      })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
  ```
</details>

#### 5. Use `create-react-app` to build your client directory

Once you have a working API, it's now time to tie that to a React app.

Initialize your React app by running this command in the root of your directory. Additionally, let's go ahead and install some packages we will use in React

```bash
create-react-app client
cd client
npm i axios styled-components react-router-dom
```

#### 6. Set up your proxy and express app to handle React

Add a proxy to hit your local API in your client `package.json`
```json
...
  "proxy": "http://localhost:3001",
...
```

In your `server.js`, make sure you add the Express static middleware and you change your `app.get('/')` to handle the built React app.

```js
// server.js
...
  app.use(express.static(`${__dirname}/client/build`))
...
  //below your api routes
  app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
  })
...
```

Also make sure to add a postinstall and dev scripts to the root `package.json` to help Heroku know how to deploy your app.

```json
 "engines": {
   "node": "10.13.0"
 },
 "scripts": {
    "start": "nodemon server.js",
    "dev": "concurrently \"nodemon server.js\" \"cd client && npm start\"",
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "cd client && npm i && npm run build"
  },
```

You should now be able to run both your API and React app by using the command `npm run dev`

**ASIDE**: This is a great opportunity to deploy to Heroku!
Make sure you follow these commands.
```bash
  heroku create
  heroku addons:create mongolab:sandbox
  git push heroku master

  # If you need to seed your production database
  heroku run node db/seeds.js
```

#### 7. Set up React Router and create Components for Routes

First we will get rid of the boilerplate code in `App.js` and replace it with some `react-router` code

```jsx
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Creatures from './components/Creatures'
import SingleCreature from './components/SingleCreature'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Creatures}/>
            <Route path="/:id" component={SingleCreature}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
```

#### 8. Read All and Create New
Use the `Creatures` component to house components that allow you do the following:
 - Get All Creatures and display them as a list of `Link`s.
 - Click a button to toggle a form on and off.
 - Input data into a form to create a new creature.

Take a look at the [solution code](./express_bog/client/src) for hints

#### 9. Read One, Update, and Delete
Use the `SingleCreature` component to house components that allow you to get one creature, toggle a form to update the creature, and delete a creature.
Take a look at the [solution code](./express_bog/client/src) for hints

#### 10. Introduce Styled Components
Once you have the usability for creatures, use styled components to style your application.
Keep these things in mind.  Feel free to also bring in libraries like `material-ui`

- Does my app look good on mobile?
- Can I add transitions and animations to this UI
- Does this app look professional and polished?

## Additional Development Ideas for after Version 4

* Add links to other pages to help users navigate your site. For instance, a creature show page might have a link to the creatures index page. Use `Link`.  Also link each creature on the `Creatures` component to its individual `show` page.
* If you'd like, add a `navbar` with links to the homepage (`/`).  Make a new route called `/new` which will open the Creatures component, but set the form toggle to true by default.  This navbar should show up on every page. Take advantage of whichever CSS library you chose to include!
* Read about [Mongoose Validations](http://mongoosejs.com/docs/validation.html), and add validations to the `Creature` model to make sure a new creature can't be created without a `name` and `description`.

## CONGRATULATIONS! You have created a Bog App! Take a break, you look *Swamped*!

![](https://cloud.githubusercontent.com/assets/7833470/11501240/83536030-97e7-11e5-8060-fa7666de7165.jpeg)
