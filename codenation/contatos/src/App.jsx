import React from "react";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import Contacts from "./components/Contacts";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      contactsToShow: [], //contacts to show in the list
      contactsFromApi: [], //original list of contacts to be used in filter function
      sortBy: "", //name of the field used to sort the list
      sortDescending: true, //order of the sort - false = ascending; true - descending
    };
  }

  /**
   * Sort the elements of array passed as parameter, using the filter to select
   * the property of contact to be used.
   */
  sortData = (array, filter, sortDescending) => {
    const temp = [...array];
    const greater = sortDescending ? 1 : -1;
    const lower = greater * -1;
    const equal = 0;
    temp.sort((a, b) =>
      a[filter] === b[filter] ? equal : a[filter] > b[filter] ? greater : lower
    );
    this.setState({
      contactsToShow: temp,
      sortBy: filter,
      sortDescending: sortDescending,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          contactsFromApi: data,
        });
        this.sortData(data, "name", true);
        this.setState({ isLoading: false });
      })
      .catch((err) => console.error(err));
  }

  handleSearchFilter = ({ target: { value: filter } }) => {
    //if the filter has value, the original list will be filtered using the
    //the selected property used to sort the list. Otherwise, it will return
    //all the contacts.
    const found = filter
      ? this.state.contactsFromApi.filter((contact) =>
          contact[this.state.sortBy].match(new RegExp(filter, "gi"))
        )
      : this.state.contactsFromApi;
    this.sortData(found, this.state.sortBy, this.state.sortDescending);
  };

  handleSort = (filter) => {
    const sortDescending =
      this.state.sortBy === filter ? !this.state.sortDescending : true;
    this.sortData(this.state.contactsToShow, filter, sortDescending);
  };

  render() {
    return (
      <React.Fragment>
        <Topbar />
        <Filters
          onSearch={this.handleSearchFilter}
          onOrderRequest={this.handleSort}
          sortBy={this.state.sortBy}
          sortOrder={this.state.sortDescending ? "down" : "up"}
        />
        <Contacts
          contacts={this.state.contactsToShow}
          isLoading={this.state.isLoading}
        />
      </React.Fragment>
    );
  }
}

export default App;
