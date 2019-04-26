import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Creatures from './components/Creatures.js'
import SingleCreature from './components/SingleCreature.js'

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
