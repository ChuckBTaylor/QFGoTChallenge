import React, { Component } from "react";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import { houseActions } from "../constants/constants";
import ReactTable from "react-table";
import { commonFilter } from "../utils/utils";

class HouseContainer extends Component {

  state = {
    houseFilter: "",
    pageSize: 15
  }

  updateFilter = e => {
    this.setState({ houseFilter: e.target.value });
  }

  changePageSize = pageSize => {
    this.setState({ pageSize });
  }

  reformatHouseTitle = title => {
    if (title.startsWith("The")) {
      return title.slice(4).concat(", The");
    } else if (title.startsWith("A")) {
      return title.slice(2).concat(", A");
    }
    return title;
  };

  convertApiDateToFriendlyDate = (apiDate) => {
    let date = new Date(apiDate);
    return date.toLocaleDateString();
  }

  render() {
    const columns = [{
      Header: "Name",
      accessor: 'name',
      filterMethod: commonFilter
      // filterMethod: (filter,row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
    },{
      Header: "Region",
      accessor: 'region',
      filterMethod: commonFilter
    },{
      Header: "Current Lord",
      accessor: 'currentLord',
      filterable: false
    }];
    return (
      <div className="house-container">
        <ReactTable
          data={Object.values(this.props.houses)}
          columns={columns}
          loading={this.props.fetchingHouses}
          showFilters={true}
          filterable={true}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.changePageSize}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>
    );
  }
  componentDidMount = () => {
    if (this.props.lastPageRequested < 1)
      this.props.fetchHouses({ page: 1 });      
  };
  componentDidUpdate = () => {
  }
}
const mapStateToProps = state => {
  return {
    houses: state.houses.list,
    lastPageRequested: state.houses.lastPageRequested,
    fetchingHouses: state.houses.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHouses: payload => dispatch({ type: houseActions.HOUSES_FETCH_START, payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseContainer);
