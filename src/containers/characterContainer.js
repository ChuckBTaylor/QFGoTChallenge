import React, { Component } from "react";
import CallApiButton from "../components/general/CallApiButton";
import { connect } from "react-redux";
import { characterActions } from "../constants/constants";
import ReactTable from "react-table";

class CharacterContainer extends Component {
  state = {};

  buttonClickFromParent = () => {
    console.log(this.props);
    this.props.fetchCharacters();
  };

  nameValidator = character => {
    character.name = (character.name === undefined || character.name === "") ? (character.aliases[0] + "*") : character.name;
    return character;
  }

  render() {
    const columns = [{
      Header: "Name",
      accessor: 'name'
    }]
    return (
      <div>
        <ReactTable
          data={this.props.characters}
          columns={columns}
          resolveData={data => data.map(row => this.nameValidator(row))}
        />
        <CallApiButton
          onClick={this.buttonClickFromParent}
          buttonName={"Get Characters"}
        />
      </div>
    );
  }
  componentDidMount = () => {
    this.props.fetchCharacters();
  };
}

const mapStateToProps = state => {
  return {
    characters: state.characters.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacters: () =>
      dispatch({ type: characterActions.CHARACTERS_FETCH_START })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterContainer);
