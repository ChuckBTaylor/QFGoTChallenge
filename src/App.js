import React, { Component } from 'react';
import './assets/stylesheets/app.scss';
import CallApiButton from './components/CallApiButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        This will be the GoT App.
        <CallApiButton buttonName={"Characters"} />
      </div>
    );
  }
}

export default App;
