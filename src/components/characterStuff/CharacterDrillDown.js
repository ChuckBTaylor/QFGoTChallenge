import React, { Component } from "react";
import { connect } from 'react-redux';
import { generateListKey } from "../../utils/utils";
import { generalActions } from "../../constants/constants";
import { characterActions, houseActions } from '../../constants/constants';

class CharacterDrillDown extends Component {
  constructAliases = () => {
    let aliases = this.props.character.aliases;
    let i = this.props.character.name ? 0 : 1;
    let arr = [];
    for (i; i < aliases.length; i++) {
      if (!!aliases[i])
        arr.push(
          <li
            className="unclickable"
            key={generateListKey("alias-list", aliases[i])}
          >
            {aliases[i]}
          </li>
        );
    }
    return arr;
  };

  handleBackClick = () => {
    const historyObj = this.props.appHistory[1];
    console.log(historyObj);
    
    if(historyObj.domain === "character"){
      this.props.backSelectCharacter({id: historyObj.id});
    } else if (historyObj.domain === "house"){
      this.props.backSelectHouse({id: historyObj.id});
    }
  }

  showBackButton = () => {
    return this.props.appHistory.length > 1;
  }

  render() {
    const name = this.props.character.name
      ? this.props.character.name
      : this.props.character.aliases[0] + "*";
    const culture = this.props.character.culture
      ? this.props.character.culture
      : "";
    const aliases = this.constructAliases();
    return (
      <div className="drill-down">
        <span className="drill-down-navigation" >
        {this.showBackButton() ?
            <i className="material-icons drill-down-back" onClick={this.handleBackClick}>
              arrow_back
            </i>
            : ''
          }
          <i className="material-icons close-drill-down" onClick={this.props.closeDrillDown}>close</i>
        </span>
        <div className="character-title">
          <h3 className="character-name" align="center">
            {name}
          </h3>
          <h4 align="center">
            {culture} {this.props.character.gender}{" "}
            {culture ? "" : "from unknwon"}
          </h4>
        </div>
        <div className="character-info">
          <p>
            Born:{" "}
            {this.props.character.born ? this.props.character.born : "unknwon"}
          </p>
          <p>
            Died:{" "}
            {this.props.character.died
              ? this.props.character.died
              : "alive or unknown"}{" "}
          </p>
          {!!aliases.length
            ? this.props.character.name
              ? "Aliases: "
              : "Other Aliases: "
            : ""}
          <ul>{aliases}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appHistory: state.app.drillDownHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDrillDown: () => dispatch({type: generalActions.CLOSE_DRILL_DOWN}),
    backSelectCharacter: payload => dispatch({type: characterActions.BACK_SELECT_CHARACTER, payload}),
    backSelectHouse: payload => dispatch({type: houseActions.BACK_SELECT_HOUSE, payload})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterDrillDown);
