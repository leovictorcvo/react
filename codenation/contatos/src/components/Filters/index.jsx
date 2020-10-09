import React from "react";

import "./styles.scss";

class Filters extends React.Component {
  handleSort = (field) => {
    this.props.onOrderRequest(field);
  };

  render() {
    const { onSearch, sortBy, sortOrder } = this.props;
    const filters = {
      name: "Nome",
      country: "País",
      company: "Empresa",
      department: "Departamento",
      admissionDate: "Data de admissão",
    };

    return (
      <div className="container" data-testid="filters">
        <section className="filters">
          <div className="filters__search">
            <input
              type="text"
              className="filters__search__input"
              placeholder="Pesquisar"
              onChange={onSearch}
            />

            <button className="filters__search__icon">
              <i className="fa fa-search" />
            </button>
          </div>

          {Object.keys(filters).map((filter) => (
            <button
              key={filter}
              className={`filters__item ${
                sortBy === filter ? "is-selected" : ""
              }`}
              onClick={() => this.handleSort(filter)}
            >
              {filters[filter]}
              {sortBy === filter && (
                <i className={`fas fa-sort-${sortOrder}`} />
              )}
            </button>
          ))}
        </section>
      </div>
    );
  }
}

export default Filters;
