import React, { Component } from 'react';
import CharacterContainer from './containers/characterContainer'
import BookContainer from './containers/bookContainer';
import { bookActions } from './constants/constants';
import { connect } from "react-redux";

class GoTApp extends Component {

  state = {
    viewBooks: true,
    viewCharacters: false,
    viewHouses: false
  };

  changeView = e => {
    let viewBooks = false, viewCharacters = false, viewHouses = false;
    switch(e.target.value){
      case 'books':
        viewBooks = true;
        break;
      case 'characters':
        viewCharacters = true;
        break;
      case 'houses':
        viewHouses = true;
        break;
    }
    this.setState({viewBooks, viewCharacters, viewHouses});
  }

  render() {
    return (
      <div className="App">
        <div id="selector">
          <span>
            <button value='books' onClick={this.changeView} className='view-selector-button'>View Books</button>
          </span>
          <span>
            <button value='characters' onClick={this.changeView} className='view-selector-button'>View Characters</button>
          </span>
          <span>
            <button value='houses' onClick={this.changeView} className='view-selector-button'>View Houses</button>
          </span>
        </div>
        {this.state.viewCharacters ? (<CharacterContainer />) : ''}
        {this.state.viewBooks ? (<BookContainer />) : ''}
      </div>
    );
  }

  componentDidMount = () => {
    this.props.fetchBooks();
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch({ type: bookActions.BOOKS_FETCH_START })
  };
};

export default connect(null, mapDispatchToProps)(GoTApp);
