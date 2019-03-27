import React, { Component } from "react";
import { connect } from "react-redux";
import { bookActions } from "../constants/constants";

class BookContainer extends Component {
  render() {
    return <div>Books!</div>;
  }
  componentDidMount(){
    this.props.fetchBooks();
  }
}
const mapStateToProps = state => {
  return {
    books: state.books.list
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
