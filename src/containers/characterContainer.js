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

  getCharacterNameOrAlias = rowInfo => {
    if (rowInfo.value)
      return rowInfo.value;
    return rowInfo.original.aliases[0] + "*";
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
          let id = rowInfo.original.id;
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
    //rowInfo only has urls\
    console.log(rowInfo);
    let povBooks = rowInfo.original.povBooks.map(bookUrl => getIdFromUrlString(bookUrl)).filter(bookId => !!this.props.books[bookId]).map(bookId => (<li className="unclickable" key={generateListKey('books-appeared-in-table', `${bookId}`)}>{this.props.books[bookId].name}*</li>))
    return povBooks.concat(rowInfo.row.books.map(bookUrl => getIdFromUrlString(bookUrl)).filter(bookId => !!this.props.books[bookId]).map(bookId => (<li className="unclickable" key={generateListKey('books-appeared-in-table', `${bookId}`)}>{this.props.books[bookId].name}</li>)));
  }

  constructBooksAppearedIn = props => {

    return (<span></span>)
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
      className: "clickable",
      filterMethod: commonFilter,
      Cell: name => (<span>{this.getCharacterNameOrAlias(name)}</span>)
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
      filterMethod: this.filterBooksAppearedIn,
      Footer: <span>*Point of View book</span>
    }]
    return (
      <div className={domainContainerClassName}>
        <h2 className='table-title' align='center'>Characters in the "Game of Thrones" series</h2>
        <span className="table-span">
          <ReactTable
            data={filteredCharacters}
            columns={columns}
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
