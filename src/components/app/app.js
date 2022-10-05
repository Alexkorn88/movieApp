/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Spin, Tabs } from 'antd';

import SwapiService from '../servises/swapiServis';
import MoviesGrid from '../moviesGrid';
import './app.css';
import ErrorIndicator from '../errorIndicator/errorIndacator';
import Footer from '../footer';

// eslint-disable-next-line import/order
import debounce from 'lodash.debounce';

import Search from '../search';
import Rated from '../rated';
import GenreContext from '../context/context';

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    pageItems: {},
    items: [],
    loading: true,
    error: false,
    label: 'return',
    pagesCount: null,
    totalPages: 0,
    genresArr: [],
  };

  componentDidMount() {
    this.updateMovies();
    this.updatePages();
    this.updateGenres();
  }

  onError = () => {
    this.setState({ error: true, loading: false, totalPages: 0 });
  };

  onLabelChange = debounce((e) => {
    this.setState({ pagesCount: 1 });
    this.updateMovies(e.target.value, 1);
    this.updatePages();
    this.updateGenres();
  }, 500);

  onChangeTab = (value) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ tabCount: value });
  };

  handlePageClick = (value) => {
    this.setState({ pagesCount: value });
    this.updateMovies(this.state.label, value);
  };

  updateMovies(label, page) {
    const _label = label && label?.length ? label : 'return';
    const _page = page ?? this.state.pagesCount;
    this.swapiService
      .getValueAsRequest(_label, _page)
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
          label: _label,
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

  render() {
    const { items, loading, error, label, pageItems, pagesCount, totalPages, genresArr } = this.state;

    const hasData = !(loading || error);
    const errorMassage = error ? <ErrorIndicator /> : null;
    const spin = loading ? <Spin size="large" /> : null;
    const moviesGrid = hasData ? <MoviesGrid items={items} loading={loading} error={error} /> : null;

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
                  label: 'Search',
                  key: '1',
                  children: (
                    <>
                      <Search onLabelChange={this.onLabelChange} label={label} />
                      {errorMassage}
                      {spin}
                      {moviesGrid}
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
                  label: 'Rated',
                  key: '2',
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
