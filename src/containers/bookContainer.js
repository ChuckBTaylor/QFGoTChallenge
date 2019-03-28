import React, { Component } from "react";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import { bookActions } from "../constants/constants";
import ReactTable from "react-table";

class BookContainer extends Component {

  state = {
    bookFilter: "",
    pageSize: 15
  }

  updateFilter = e => {
    this.setState({bookFilter: e.target.value});
  }

  changePageSize = pageSize => {
    this.setState({pageSize});    
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
    const columns = [
      {
        Header: "Title",
        accessor: "name",
        showFilter: true,
        id: "bookTitle",
        Cell: (title => <span className='book-title'>{this.reformatBookTitle(title.value)}</span>),
        filterMethod: (filter, row) => row.bookTitle.toLowerCase().includes(filter.toLowerCase().value)
      },
      {
        Header: "Number of Pages",
        accessor: "numberOfPages",
        id: "numberOfPagesInBook",
        filterable: false
      },
      {
        Header: "Release Date",
        accessor: 'released',
        // Cell: (date => <span className='book release-date'>{date}</span>),
        filterable: false
      }
    ];
    return (
      <div className="book-container">
        <ReactTable
          data={Object.values(this.props.books)}
          columns={columns}
          loading={this.props.fetchingBooks}
          showFilters={true}
          filterable={true}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.changePageSize}
          pageSizeOptions={[5, 10, 15]}
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
