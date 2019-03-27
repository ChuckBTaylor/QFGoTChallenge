import React, { Component } from 'react';
import './assets/stylesheets/app.scss';
import CharacterContainer from './containers/characterContainer'
import BookContainer from './containers/bookContainer';

class GoTApp extends Component {
  
  render() {
    return (
      <div className="App">
        <CharacterContainer />
        <BookContainer />
      </div>
    );
  }
}

export default GoTApp;
