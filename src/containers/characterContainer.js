import React, { Component } from "react";
import CallApiButton from "../components/general/CallApiButton";
import { connect } from "react-redux";
import { characterActions } from "../constants/constants";
import ReactTable from "react-table";
import { isStringEmpty, commonFilter } from "../utils/utils";

class CharacterContainer extends Component {
  state = {
    pageSize: 10,
    filterUnknownCulture: false
  };

  getMoreCharacters = () => {
    this.props.fetchCharacters({ page: (+this.props.lastPageRequested + 1) });
  };

  characterValidator = character => {
    character.name = isStringEmpty(character.name) ? (character.aliases[0] + "*") : character.name;
    return character;
  }

  updateCultureFilter = () => {
    this.setState({ filterUnknownCulture: !this.state.filterUnknownCulture });
  }

  changePageSize = pageSize => {
    this.setState({ pageSize });
  }

  filterCharacterByCulture = it => {
    if (!this.state.filterUnknownCulture)
      return true;
    if(isStringEmpty(it.culture)){      
      return false;
    }
    return true;
  }

  render() {
    const filteredCharacters = Object.values(this.props.characters).filter(it => this.filterCharacterByCulture(it));
    const columns = [{
      Header: "Name",
      accessor: 'name',
      id: 'characterName',
      Footer: "*alias",
      filterable: true,
      filterMethod: commonFilter
    }, {
      Header: "Gender",
      accessor: 'gender',
      filterable: true,
      filterMethod: (filter, row) => row.gender.toLowerCase().startsWith(filter.value.toLowerCase())
    }, {
      Header: "Culture",
      accessor: 'culture',
      id: 'culture',
      Cell: (culture => <span>{!isStringEmpty(culture.value) ? culture.value : "unknown"}</span>),
      filterable: true,
      filterMethod: commonFilter,
      Footer: <span>Filter Unknown: <input type='checkbox' onChange={this.updateCultureFilter} checked={this.state.filterUnknownCulture} /></span>
    }]
    return (
      <div>
        <ReactTable
          data={filteredCharacters}
          columns={columns}
          resolveData={data => data.map(row => this.characterValidator(row))}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.changePageSize}
          showFilters={true}
        />
        <CallApiButton
          onClick={this.getMoreCharacters}
          buttonName={"Get More Characters"}
        />
      </div>
    );
  }
  componentDidMount = () => {
    if (this.props.lastPageRequested < 1)
      this.props.fetchCharacters({ page: 1 });
  };

  componentDidUpdate = () => {    
  }
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
