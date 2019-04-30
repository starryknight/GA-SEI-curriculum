import React, {Component} from 'react'
import SearchContainer from './SearchContainer.js'
import './App.css'

class Home extends Component {

  render() {
    return (
      <div className="App">
        <h1>TVMaze React</h1>
        <SearchContainer />
      </div>
    )
  }


}

export default Home