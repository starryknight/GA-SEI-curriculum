import React from 'react'
import Results from './Results.js';
import { getFavorites } from "./util.js";

export default class extends React.Component {
  state = {
    favorites: []
  }

  componentDidMount() {
    getFavorites()
      .then(favorites => {
        this.setState({favorites});
      });
  }

  render() {
    return (
      <Results movies={this.state.favorites} />
    );
  }
}

