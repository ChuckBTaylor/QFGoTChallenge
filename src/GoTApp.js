import React, { Component } from 'react';
import CharacterContainer from './containers/characterContainer'
import BookContainer from './containers/bookContainer';

class GoTApp extends Component {

  state = {
    viewBooks: true,
    viewCharacters: false,
    viewHouses: false
  };
  
  render() {
    return (
      <div className="App">
        {this.state.viewCharacters ? (<CharacterContainer />) : ''}
        {this.state.viewBooks ? (<BookContainer />) : ''}
      </div>
    );
  }
}

export default GoTApp;
