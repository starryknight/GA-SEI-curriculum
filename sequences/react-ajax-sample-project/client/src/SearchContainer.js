import React, { Component } from "react";
import { queryTVMazeAPI } from "./util.js";
import Results from './Results.js';
import Search from './Search.js';

class SearchContainer extends Component {
  state = {
    query: "",
    movies: [],
    hasSearched: false
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmitQuery = () => {
    queryTVMazeAPI(this.state.query).then((movies)=>{
      this.setState({
        movies,
        hasSearched: true
      })
    })
  }

  handleSearchAgain = () => {
    this.setState({
      movies: [],
      hasSearched: false,
      query: ''
    })
  }

  render() {
    return (
      <div>
        {
          this.state.hasSearched
            ? <Results
                movies={this.state.movies}
                handleSearchAgain={this.handleSearchAgain}
            />
            : <Search
                query={this.state.query}
                handleInputChange={this.handleInputChange}
                handleSubmitQuery={this.handleSubmitQuery}
            />
        }
      </div>
    );
  }
}

export default SearchContainer;
