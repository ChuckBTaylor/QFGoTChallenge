import React, { Component } from "react";
import 'react-table/react-table.css';
import { connect } from "react-redux";
import { houseActions, characterActions } from "../constants/constants";
import ReactTable from "react-table";
import { commonFilter, getIdFromUrlString, commonSort } from "../utils/utils";
import CallApiButton from '../components/general/CallApiButton';

class HouseContainer extends Component {

  state = { 
    houseFilter: "",
    pageSize: 20
  }

  getMoreHouses = () => {
    this.props.fetchHouses({ page: (+this.props.lastPageRequested + 1) });
  };

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

  convertApiDateToFriendlyDate = apiDate => {
    let date = new Date(apiDate);
    return date.toLocaleDateString();
  }

  resolveHouseData = houseData => {
    let lordId = getIdFromUrlString(houseData.currentLord);
    if (this.props.characters[lordId])
      houseData.lordName = this.props.characters[lordId].name;
    return houseData;
  }

  tdProps = (state, rowInfo, column, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        console.log("A Td Element was clicked!");
        console.log("it produced this event:", e);
        console.log("It was in this column:", column);
        console.log("It was in this row:", rowInfo);
        console.log("It was in this table instance:", instance);
        if (handleOriginal) {
          handleOriginal();
        }
      }
    }

  }

  render() {
    const columns = [{
      Header: "Name",
      accessor: 'name',
      filterMethod: commonFilter
    }, {
      Header: "Region",
      accessor: 'region',
      filterMethod: commonFilter,
      sortMethod: commonSort,
      Cell: region => (<span>{region.value ? region.value : 'Region unknown'}</span>)
    }, {
      Header: "Current Lord link",
      accessor: 'currentLord',
      filterable: false,
      show: false
    }, {
      Header: "Current Lord",
      accessor: 'lordName',
      filterable: true,
      Cell: lordName => (<span>{lordName.value ? lordName.value : "Name unknown"}</span>),
      filterMethod: commonFilter
    }];
    return (
      <div className="house-container">
        <div className="table-drilldown-container">
          <ReactTable
            data={Object.values(this.props.houses)}
            resolveData={data => data.map(this.resolveHouseData)}
            columns={columns}
            loading={this.props.fetchingHouses}
            showFilters={true}
            filterable={true}
            pageSize={this.state.pageSize}
            onPageSizeChange={this.changePageSize}
            getTdProps={this.tdProps}
          />
        </div>
        <CallApiButton
          onClick={this.getMoreHouses}
          buttonName={"Get More Houses"}
        />
      </div>
    );
  }
  componentDidMount = () => {
    if (this.props.lastPageRequested < 1)
      this.props.fetchHouses({ page: 1 });
  };

  componentDidUpdate = () => {
    Object.values(this.props.houses).filter(house => house.currentLord && !house.lordName).forEach(house => this.props.fetchCharacter({ id: getIdFromUrlString(house.currentLord) }));
  }
}
const mapStateToProps = state => {
  return {
    houses: state.houses.list,
    lastPageRequested: state.houses.lastPageRequested,
    fetchingHouses: state.houses.fetching,
    characters: state.characters.list
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHouses: payload => dispatch({ type: houseActions.HOUSES_FETCH_START, payload }),
    fetchCharacter: payload => dispatch({ type: characterActions.FETCH_CHARACTER_START, payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseContainer);
