import React, { Component } from "react";
import CallApiButton from "../components/general/CallApiButton";
import { connect } from "react-redux";
import { characterActions } from "../constants/constants";
import ReactTable from "react-table";
import { isStringEmpty } from "../utils/utils";

class CharacterContainer extends Component {
  state = {
    pageSize: 10
  };

  buttonClickFromParent = () => {
    console.log("requesting page" + (+this.props.lastPageRequested + 1))
    this.props.fetchCharacters({page: (+this.props.lastPageRequested + 1)});
  };

  characterValidator = character => {
    character.name = isStringEmpty(character.name) ? (character.aliases[0] + "*") : character.name;
    character.culture = isStringEmpty(character.culture) ? "Unknown" : character.culture;
    return character;
  }

  changePageSize = pageSize => {
    this.setState({ pageSize });
  }

  render() {
    const columns = [{
      Header: "Name",
      accessor: 'name',
      id: 'characterName',
      Footer: "*alias",
      filterable: true,
      filterMethod: (filter, row) => row.characterName.includes(filter.value)
    },{
      Header: "Gender",
      accessor: 'gender',
      filterable: true
    },{
      Header: "Culture",
      accessor: 'culture',
      filterable: true
    }]
    return (
      <div>
        <ReactTable
          data={this.props.characters}
          columns={columns}
          resolveData={data => data.map(row => this.characterValidator(row))}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.changePageSize}
          showFilters={true}
        />
        <CallApiButton
          onClick={this.buttonClickFromParent}
          buttonName={"Get More Characters"}
        />
      </div>
    );
  }
  componentDidMount = () => {
    if (this.props.lastPageRequested < 1)
      this.props.fetchCharacters({page: 1});
  };
}

const mapStateToProps = state => {
  return {
    characters: state.characters.list,
    lastPageRequested: state.characters.lastPageRequested
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacters: payload =>
      dispatch({ type: characterActions.CHARACTERS_FETCH_START, payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterContainer);
