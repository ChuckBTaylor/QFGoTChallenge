import React, { Component } from "react";
import CallApiButton from "../components/CallApiButton";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { characterRootSaga } from "../sagas/characterSagas";
import { characterActions } from "../constants/constants";

class CharacterContainer extends Component {
  state = {};

  buttonClickFromParent = () => {
    console.log(this.props);
    this.props.fetchCharacters();
  };

  render() {
    return (
      <div>
        <CallApiButton
          onClick={this.buttonClickFromParent}
          buttonName={"Get Characters"}
        />
      </div>
    );
  }
  componentDidMount = () => {
    console.log("CharacterContainer Mounted");
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
