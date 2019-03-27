import React, { Component } from 'react';
import './assets/stylesheets/app.scss';
import CharacterContainer from './containers/characterContainer'

class GoTApp extends Component {
  
  render() {
    return (
      <div className="App">
        <CharacterContainer />
      </div>
    );
  }
}

export default GoTApp;
