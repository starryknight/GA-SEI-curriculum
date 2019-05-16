import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class SingleCreature extends Component {
  state = {
      creature: {
          name: '',
          description: ''
      },
      redirectToHome: false,
      isEditFormDisplayed: false
  }

  componentDidMount = () => {
      axios.get(`/api/v1/${this.props.match.params.id}`).then(res => {
          this.setState({creature: res.data})
      })
  }

  deleteCreature = () => {
      axios.delete(`/api/v1/${this.props.match.params.id}`).then(res => {
          this.setState({redirectToHome: true})
      })
  }

  toggleEditForm = () => {
      this.setState((state, props) => {
          return {isEditFormDisplayed: !state.isEditFormDisplayed}
      })
  }

  handleChange = (e) => {
      const cloneCreature = {...this.state.creature}
      cloneCreature[e.target.name] = e.target.value
      this.setState({creature: cloneCreature})
  }

  updateCreature = (e) => {
      e.preventDefault()
      axios
        .put(`/api/v1/${this.props.match.params.id}`, {
            name: this.state.creature.name,
            description: this.state.creature.description
        })
        .then(res => {
            this.setState({creature: res.data, isEditFormDisplayed: false})
        })
  }

  render() {
    if(this.state.redirectToHome) {
        return (<Redirect to="/" />)
    }

    return (
      <div>
        <Link to="/">Back to Creatures Home</Link>
        <h1>Single Creature</h1>
        <button onClick={this.toggleEditForm}>Edit</button>
        {
            this.state.isEditFormDisplayed
                ? <form onSubmit={this.updateCreature}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.creature.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.creature.description}
                        />
                    </div>
                    <button>Update</button>
                </form>
                : <div>
                    <div>
                        Name: {this.state.creature.name}
                    </div>
                    <div>
                        Description: {this.state.creature.description}
                    </div>
                    <button onClick={this.deleteCreature}>Delete</button>
                </div>
        }
      </div>
    );
  }
}

export default SingleCreature;
