import React, { Component } from "react";
import { connect } from "react-redux";
import { getIdFromUrlString } from "../../utils/utils";
import { houseActions, characterActions, generalActions } from "../../constants/constants";
import SwornMemberList from "./SwornMemberList";

class HouseDrillDown extends Component {
  checkForAndFetchCharacters = () => {
    const overlord = getIdFromUrlString(this.props.house.overlord);
    if (overlord && !this.props.houses[overlord]) {
      this.props.fetchHouse({
        id: getIdFromUrlString(this.props.house.overlord)
      });
    }
    this.props.house.swornMembers.forEach(member => {
      const id = getIdFromUrlString(member);
      if (!this.props.characters[id]) {
        this.props.fetchCharacter({ id });
      }
    });
  };

  getLordFromCharacters = () => {
    return this.props.characters[
      getIdFromUrlString(this.props.house.currentLord)
    ];
  };

  selectLord = () => {
    if (this.getLordFromCharacters()) {
      const id = getIdFromUrlString(this.getLordFromCharacters().url);
      this.props.selectCharacter({ id });
    }
  };

  selectOverlord = () => {
    if (this.props.house.overlord) {
      const id = getIdFromUrlString(this.props.house.overlord);
      if (this.props.houses[id]) {
        this.props.selectHouse({ id });
      }
    }
  };

  showBackButton = () => {
    return this.props.appHistory.length > 1;
  }

  handleBackClick = () => {
    const historyObj = this.props.appHistory[1];
    if(historyObj.domain === "character"){
      this.props.backSelectCharacter({id: historyObj.id});
    } else if (historyObj.domain === "house"){
      this.props.backSelectHouse({id: historyObj.id});
    }
  }

  onMemberClick = id => {
    if (this.props.characters[id]) {
      this.props.selectCharacter({ id });
    }
  };

  isLordLoaded = () => {
    console.log(this.props);
    
    return !!this.props.house.currentLord && this.getLordFromCharacters();
  };

  render() {
    const words = this.props.house.words
      ? '"' + this.props.house.words + '"'
      : "";
    const lordName = this.isLordLoaded()
      ? this.getLordFromCharacters().name
      : "unknown";
    const coatOfArms = this.props.house.coatOfArms
      ? this.props.house.coatOfArms
      : "unknown";
    const overlord = this.props.house.overlord
      ? this.props.houses[getIdFromUrlString(this.props.house.overlord)]
      : "";
    let overlordName = "unknown";
    if (overlord) {
      overlordName = overlord.name;
    }
    const members = this.props.house.swornMembers
      .map(member => getIdFromUrlString(member))
      .filter(id => !!this.props.characters[id])
      .map(id => this.props.characters[id]);
    return (
      <div className="drill-down">
        <span className="drill-down-navigation" >
          {this.showBackButton() ?
            <i className="material-icons drill-down-back clickable" onClick={this.handleBackClick}>
              arrow_back
            </i>
            : ''
          }
          <i className="material-icons close-drill-down clickable" onClick={this.props.closeDrillDown}>
            close
          </i>
        </span>
        <span className="house-title">
          <h3 className="house-name" align="center">
            {this.props.house.name}
          </h3>
          <h4 className="house-words" align="center">
            {words}
          </h4>
        </span>
        <div className="house-info">
          <p className={this.isLordLoaded() ? "clickable" : "unclickable"} onClick={this.selectLord}>Current Lord: {lordName}</p>
          <p>Coat of Arms: {coatOfArms}</p>
          <p className={!!overlord ? "clickable" : "unclickable"} onClick={this.selectOverlord}>Overlord: {overlordName}</p>
        </div>
        Sworn Members:
        {this.props.house.swornMembers.length ? (
          <SwornMemberList
            onMemberClick={this.onMemberClick}
            members={members}
            characters={this.props.characters}
          />
        ) : (
            " None"
          )}
      </div>
    );
  }

  componentDidMount = () => {
    this.checkForAndFetchCharacters();
  };

  componentDidUpdate = () => {
    this.checkForAndFetchCharacters();
  };
}

const mapStateToProps = state => {
  return {
    characters: state.characters.list,
    houses: state.houses.list,
    appHistory: state.app.drillDownHistory
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchHouse: payload =>
      dispatch({ type: houseActions.FETCH_HOUSE_START, payload }),
    selectCharacter: payload =>
      dispatch({ type: characterActions.SELECT_CHARACTER, payload }),
    selectHouse: payload =>
      dispatch({ type: houseActions.SELECT_HOUSE, payload }),
    fetchCharacter: payload =>
      dispatch({ type: characterActions.FETCH_CHARACTER_START, payload }),
    closeDrillDown: () => dispatch({ type: generalActions.CLOSE_DRILL_DOWN }),
    backSelectCharacter: payload => dispatch({type: characterActions.BACK_SELECT_CHARACTER, payload}),
    backSelectHouse: payload => dispatch({type: houseActions.BACK_SELECT_HOUSE, payload})
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseDrillDown);
