import React, { Component } from "react";
import SwapiService from "../servises/swapiServis";
import { Spin } from "antd";

import MoviesGrid from "../moviesGrid";

import "./app.css";
import ErrorIndicator from "../errorIndicator/errorIndacator";
import Footer from "../footer";
import debounce from "lodash.debounce";
import { Tabs } from "antd";
import Search from "../search";
import Rated from "../rated";
import GenreContext from "../context/context";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    pageItems: {},
    items: [],
    loading: true,
    error: false,
    label: "return",
    //offset: 0,
    currentPageElements: [],
    pagesCount: null,
    totalPages: 0,
    totalElementsCount: 0,
    tabCount: null,
    genresArr: [],
  };

  componentDidMount() {
    this.updateMovies();
    this.updatePages();
    this.updateGenres();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.pagesCount !== prevState.pagesCount) {
  //     //this.updateMovies(this.state.label);
  //     this.updatePages();
  //   }
  // }
  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  updateMovies(label) {
    const _label = label && label?.length ? label : "return";
    this.swapiService
      .getValueAsRequest(_label, this.state.pagesCount)
      .then((res) => {
        if (!res.results.length) {
          this.setState({
            error: true,
            loading: false,
          });
          return;
        }
        this.setState({
          error: false,
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

  updateGenres() {
    this.swapiService.getResponseGenreMovieDB().then((res) => {
      this.setState({
        genresArr: res.genres,
      });
    });
  }
  onLabelChange = debounce((e) => {
    this.updateMovies(e.target.value);
    this.updatePages();
    this.updateGenres();
  }, 500);

  onChangeTab = (value) => {
    this.setState({ tabCount: value });
  };

  handlePageClick = (value) => {
    this.setState({ pagesCount: value });
  };

  render() {
    const {
      items,
      loading,
      error,
      label,
      pageItems,
      pagesCount,
      totalPages,
      genresArr,
    } = this.state;

    const hasData = !(loading || error);
    const errorMassage = error ? <ErrorIndicator /> : null;
    const spin = loading ? <Spin size="large" /> : null;
    const moviesGrid = hasData ? (
      <MoviesGrid items={items} loading={loading} error={error} />
    ) : null;
    //const startMassage = !moviesGrid ? <span>Введите запрос</span> : moviesGrid;

    return (
      <div className="wrapper">
        <div className="container">
          <GenreContext.Provider value={genresArr}>
            <Tabs
              defaultActiveKey="1"
              centered
              onChange={this.onChangeTab}
              items={[
                {
                  label: "Search",
                  key: "1",
                  children: (
                    <>
                      <Search
                        onLabelChange={this.onLabelChange}
                        label={label}
                      />

                      {errorMassage}
                      {spin}
                      {moviesGrid}
                      {/* {startMassage} */}
                      <Footer
                        pageItems={pageItems}
                        pagesCount={pagesCount}
                        totalPages={totalPages}
                        handlePageClick={this.handlePageClick}
                      />
                    </>
                  ),
                },
                {
                  label: "Rated",
                  key: "2",
                  children: <Rated />,
                },
              ]}
            />
          </GenreContext.Provider>
        </div>
      </div>
    );
  }
}
