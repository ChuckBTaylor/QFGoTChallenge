import React, { Component } from "react";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import { bookActions } from "../constants/constants";
import ReactTable, { ReactTableDefaults } from "react-table";

class BookContainer extends Component {

  sortingMethod = data => {
    console.log("Sorting!");
  }

  render() {
    const columns = [
      {
        Header: "Title",
        accessor: "name",
        showFilter: true
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
        <ReactTable
          data={this.props.books}
          columns={columns}
          loading={this.props.fetchingBooks}
          showFilters={true}          
        />
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchBooks();
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
