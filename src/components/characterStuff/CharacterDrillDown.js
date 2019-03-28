import React, { Component } from "react";
import { generateListKey } from "../../utils/utils";

export class CharacterDrillDown extends Component {

  constructAliases = () => {
    let aliases = this.props.character.aliases;
    let i = this.props.character.name ? 0 : 1;
    let arr = [];
    for(i; i < aliases.length; i++){
      arr.push(<li className="unclickable" key={generateListKey("alias-list", aliases[i])}>{aliases[i]}</li>)
    }
    return arr;
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
        <div className="character-title">
          <h3 className="character-name" align="center">
            {name}
          </h3>
          <h4 align='center'>
            {culture} {this.props.character.gender} {culture ? '' : "from unknwon"}
          </h4>
        </div>
        <div className='character-info'>
          <p>Born: {this.props.character.born ? this.props.character.born : 'unknwon'}</p>
          <p>Died: {this.props.character.died ? this.props.character.died : 'alive or unknown'} </p>
          {!!aliases.length ? this.props.character.name ? "Aliases: " : "Other Aliases: " : ''}
          <ul>
            {aliases}
          </ul>
        </div>
      </div>
    );
  }
}
