import React, { Component } from "react";
import SwapiService from "../servises/swapiServis";
import { Spin } from "antd";

import MoviesGrid from "../moviesGrid";

import "./app.css";
import ErrorIndicator from "../errorIndicator/errorIndacator";
import Header from "../header";
import Footer from "../footer";
import debounce from "lodash.debounce";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    pageItems: {},
    items: [],
    loading: true,
    error: false,
    label: "return",

    offset: 0,
    currentPageElements: [],
    pagesCount: null,
    totalPages: 0,
    totalElementsCount: 0,
  };

  componentDidMount() {
    this.updateMovies();
    this.updatePages();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.label !== prevState.label) {
      this.updateMovies();
      this.updatePages();
    }
  }
  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  updateMovies() {
    this.swapiService
      .getValueAsRequest(this.state.label, this.state.pagesCount)
      .then((res) => {
        this.setState({
          items: res.results,
          loading: false,
          totalPages: res.total_pages,
          totalElementsCount: res.total_results,
        });
      })
      .catch(this.onError);
  }

  updatePages() {
    this.swapiService
      .getValueAsRequest(this.state.label, this.state.pagesCount)
      .then((res) => {
        this.setState({
          pageItems: res,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  onLabelChange = debounce((e) => {
    this.setState({
      label: e.target.value,
    });
  }, 500);

  handlePageClick = (value) => {
    this.setState({ pagesCount: value });
    //console.log(this.state.pagesCount);
  };

  render() {
    const { items, loading, error, label, pageItems, pagesCount, totalPages } =
      this.state;

    const hasData = !(loading || error);
    const errorMassage = error ? <ErrorIndicator /> : null;
    const spin = loading ? <Spin size="large" /> : null;
    const moviesGrid = hasData ? (
      <MoviesGrid items={items} loading={loading} error={error} />
    ) : null;
    const startMassage = !label ? <span>Введите запрос</span> : moviesGrid;

    return (
      <div className="wrapper">
        <div className="container">
          <Header onLabelChange={this.onLabelChange} label={label} />
          {errorMassage}
          {spin}
          {moviesGrid}
          {startMassage}

          <Footer
            pageItems={pageItems}
            pagesCount={pagesCount}
            totalPages={totalPages}
            handlePageClick={this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}
