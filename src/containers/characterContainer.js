import React, { Component } from "react";
import CallApiButton from "../components/general/CallApiButton";
import { connect } from "react-redux";
import { characterActions } from "../constants/constants";
import ReactTable from "react-table";
import { isStringEmpty, commonFilter, getIdFromUrlString, generateListKey } from "../utils/utils";

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
    if (isStringEmpty(it.culture)) {
      return false;
    }
    return true;
  }

  tdProps = (state, rowInfo, column) => {
    return {
      onClick: (e, handleOriginal) => {
        if (column.id === "characterName") {
          let id = getIdFromUrlString(rowInfo.original.url);
          this.props.selectCharacter({ id });
        }
        if (handleOriginal) {
          handleOriginal();
        }
      }
    }
  }

  filterBooksAppearedIn = (filter, row) => {
    for (let i = 0; i < row.books.length; i++) {
      let bookId = getIdFromUrlString(row.books[i]);
      if (this.props.books[bookId]) {
        if (this.props.books[bookId].name.toLowerCase().includes(filter.value.toLowerCase()))
          return true;
      }
    }
    return false;
  }

  createBookList = rowInfo => {
    return rowInfo.row.books.map(bookUrl => getIdFromUrlString(bookUrl)).filter(bookId => !!this.props.books[bookId]).map(bookId => (<li key={generateListKey('books-appeared-in-table', `${bookId}`)}>{this.props.books[bookId].name}</li>));
  }

  render() {
    const domainContainerClassName = "domain-container " + (this.props.isDrillDownOpen ? "drill-down-open" : "drill-down-closed");
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
    }, {
      Header: "Books Appeared In",
      accessor: "books",
      Cell: books => (<span><ul className='in-table-list'>{this.createBookList(books)}</ul></span>),
      filterable: true,
      filterMethod: this.filterBooksAppearedIn
    }]
    return (
      <div className={domainContainerClassName}>
        <span className="table-span">
          <ReactTable
            data={filteredCharacters}
            columns={columns}
            resolveData={data => data.map(row => this.characterValidator(row))}
            pageSize={this.state.pageSize}
            onPageSizeChange={this.changePageSize}
            showFilters={true}
            loading={this.props.fetchingCharacters}
            getTdProps={this.tdProps}
          />
        </span>
        <div className="api-button">
          <CallApiButton
            onClick={this.getMoreCharacters}
            buttonName={"Get More Characters"}
          />
        </div>
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
    lastPageRequested: state.characters.lastPageRequested,
    fetchingCharacters: state.characters.fetching,
    books: state.books.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacters: payload =>
      dispatch({ type: characterActions.CHARACTERS_FETCH_START, payload }),
    selectCharacter: payload => dispatch({ type: characterActions.SELECT_CHARACTER, payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterContainer);
