import React, { Component } from 'react';
import { connect } from "react-redux";

class BookContainer extends Component {

  redner(){

    return (<div>

    </div>)
  };
}
const mapStateToProps = state => {
  return {
    books: state.books.list
  };
};

export default connect(mapStateToProps)(BookContainer);