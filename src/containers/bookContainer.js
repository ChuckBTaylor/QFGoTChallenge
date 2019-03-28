import React, { Component } from "react";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import { bookActions } from "../constants/constants";
import ReactTable from "react-table";

class BookContainer extends Component {

  state = {
    bookFilter: ""
  }

  updateFilter = e => {
    this.setState({bookFilter: e.target.value});

  }

  reformatBookTitle = title => {
    if (title.startsWith("The")) {
      return title.slice(4).concat(", The");
    } else if (title.startsWith("A")) {
      return title.slice(2).concat(", A");
    }
    return title;
  };

  render() {
    const books = this.props.books.filter(book => book.name.includes(this.state.bookFilter));
    const columns = [
      {
        Header: "Title",
        accessor: "name",
        showFilter: true,
        id: "bookTitle",
        Cell: (title => <span className='book-title'>{this.reformatBookTitle(title.value)}</span>),
        filterMethod: (filter, row, column) => {return true},
        filterRender: ({filter, onFilterChange}) => <select onChange={event => onFilterChange(event.target.value)} value={filter ? filter.value : ''}></select>
      },
      {
        Header: "Number of Pages",
        accessor: "numberOfPages",
        id: "numberOfPagesInBook",
        showFilter: true
      }
    ];
    return (
      <div className="book-container">
        <label htmlFor="book-filter-input">Filter Books by Title: </label>
        <input id="book-filter-input" type='text' value={this.state.bookFilter} onChange={this.updateFilter} />
        <ReactTable
          data={books}
          columns={columns}
          loading={this.props.fetchingBooks}
          showFilters={true}
        />
        
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      bookFilter: ''
    });
  }
}
const mapStateToProps = state => {
  return {
    books: state.books.list,
    fetchingBooks: state.books.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch({ type: bookActions.BOOKS_FETCH_START })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
