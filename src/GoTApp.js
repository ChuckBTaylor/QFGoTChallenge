import React, { Component } from 'react';
import CharacterContainer from './containers/CharacterContainer'
import BookContainer from './containers/BookContainer';
import { bookActions } from './constants/constants';
import { connect } from "react-redux";
import './App.css';
import HouseContainer from './containers/HouseContainer';
import { CharacterDrillDown } from './components/characterStuff/CharacterDrillDown';
import HouseDrillDown from './components/houseStuff/HouseDrillDown';

class GoTApp extends Component {

  state = {
    viewBooks: false,
    viewCharacters: true,
    viewHouses: false
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
    const isDrillDownOpen = this.props.selectedCharacter || this.props.selectedHouse;    
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
        {this.state.viewCharacters ? (<CharacterContainer isDrillDownOpen={isDrillDownOpen}/>) : ''}
        {this.state.viewBooks ? (<BookContainer isDrillDownOpen={isDrillDownOpen}/>) : ''}
        {this.state.viewHouses ? (<HouseContainer isDrillDownOpen={isDrillDownOpen}/>) : ''}
        {this.props.selectedCharacter ? (<CharacterDrillDown character={this.props.selectedCharacter} />) : ''}
        {this.props.selectedHouse ? (<HouseDrillDown house={this.props.selectedHouse} />) : ''}
      </div>
    );
  }

  componentDidMount = () => {
    this.props.fetchBooks();
  }

  componentDidUpdate = () => {    
  }
}

const mapStateToProps = state => {
  return {
    selectedCharacter: state.characters.selectedCharacter,
    selectedHouse: state.houses.selectedHouse
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch({ type: bookActions.BOOKS_FETCH_START })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoTApp);
