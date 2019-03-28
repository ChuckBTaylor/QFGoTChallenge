import React, { Component } from 'react';
import CharacterContainer from './containers/CharacterContainer'
import BookContainer from './containers/BookContainer';
import { bookActions } from './constants/constants';
import { connect } from "react-redux";
import './App.css';
import HouseContainer from './containers/HouseContainer';
import { CharacterDrillDown } from './components/drillDown/CharacterDrillDown';

class GoTApp extends Component {

  state = {
    viewBooks: false,
    viewCharacters: false,
    viewHouses: true
  };

  changeView = e => {
    let viewBooks = false, viewCharacters = false, viewHouses = false;
    switch (e.target.value) {
      case 'books':
        viewBooks = true;
        break;
      case 'characters':
        viewCharacters = true;
        break;
      case 'houses':
        viewHouses = true;
        break;
      default:
        break;
    }
    this.setState({ viewBooks, viewCharacters, viewHouses });
  }

  render() {
    
    return (
      <div className="git-app">
        <div id="domain-selector" align='center'>
          <span>
            <button value='books' onClick={this.changeView} className="view-selector-button">View Books</button>
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
        {this.state.viewHouses ? (<HouseContainer />) : ''}
        {this.props.selectedCharacter ? (<CharacterDrillDown character={this.props.selectedCharacter} />) : ''}
      </div>
    );
  }

  componentDidMount = () => {
    this.props.fetchBooks();
  }
}

const mapStateToProps = state => {
  return {
    selectedCharacter: state.characters.selected,
    selectedHouse: state.houses.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch({ type: bookActions.BOOKS_FETCH_START })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoTApp);
