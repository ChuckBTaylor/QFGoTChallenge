import React, { Component } from 'react';
import { connect } from "react-redux";
import { getIdFromUrlString } from '../../utils/utils';
import { houseActions } from '../../constants/constants';

export class HouseDrillDown extends Component {

  checkForAndFetchOverlord = () => {
    const overlord = getIdFromUrlString(this.props.house.overlord);
    if(overlord && !this.props.houses[overlord]){      
      this.props.fetchHouse({id: getIdFromUrlString(this.props.house.overlord)});
    }
  }
  render() {
    const words = this.props.house.words ? ("\"" + this.props.house.words + "\"") : '';
    const lordName = this.props.house.currentLord ? this.props.characters[getIdFromUrlString(this.props.house.currentLord)].name : "unknown";
    const coatOfArms = this.props.house.coatOfArms ? this.props.house.coatOfArms : "unknown";
    const overlord = this.props.house.overlord ? this.props.houses[getIdFromUrlString(this.props.house.overlord)] : '';
    let overlordName = 'unknown';
    if (overlord) {
      overlordName = overlord.name;
    }
    return (
      <div className="drill-down">
        <div className="house-title">
          <h3 className="house-name" align='center'>{this.props.house.name}</h3>
          <h4 className="house-words" align='center'>{words}</h4>
        </div>
        <div className="houseInfo">
          <p>Current Lord: {lordName}</p>
          <p>Coat of Arms: {coatOfArms}</p>
          <p>Overlord: {overlordName}</p>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.checkForAndFetchOverlord()
  }

  componentDidUpdate = () => {
    this.checkForAndFetchOverlord()
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters.list,
    houses: state.houses.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchHouse: payload => dispatch({type: houseActions.FETCH_HOUSE_START, payload})
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HouseDrillDown);