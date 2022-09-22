import React, { Component } from "react";
import SwapiService from "../servises/swapiServis";
import { Spin } from "antd";

import MoviesGrid from "../moviesGrid";

import "./app.css";
import ErrorIndicator from "../errorIndicator/errorIndacator";
import Header from "../header";
import Footer from "../footer";
import debounce from "lodash.debounce";
import { Alert } from "antd";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    items: [],
    loading: true,
    error: false,
    errorRequest: false,
    label: "return",
  };

  componentDidMount() {
    this.updateMovies();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.label !== prevState.label) {
      this.updateMovies();
    }
  }
  onError = (err) => {
    this.setState({ error: true, loading: false });
  };

  onErrorRequest = (err) => {
    this.setState({ errorRequest: true });
  };

  updateMovies() {
    this.swapiService
      .getValueAsRequest(this.state.label)
      .then((res) => {
        this.setState({
          items: res.results,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  onLabelChange = debounce((e) => {
    this.setState({
      label: e.target.value,
    });
    // console.log(this.state.label);
  }, 500);

  render() {
    const { items, loading, error, label, errorRequest } = this.state;

    const hasData = !(loading || error || errorRequest);
    const errorMasage = error ? <ErrorIndicator /> : null;
    const spin = loading ? <Spin size="large" /> : null;
    const moviesGrid = hasData ? (
      <MoviesGrid items={items} loading={loading} error={error} />
    ) : null;
    // const errorReq = errorRequest ? (
    //   <Alert
    //     message="Что-то пошло не так"
    //     description="Пожалуйста проверьте запрос"
    //     type="info"
    //   />
    // ) : null;
    return (
      <div className="wrapper">
        <div className="container">
          <Header onLabelChange={this.onLabelChange} label={label} />
          {errorMasage}
          {spin}
          {moviesGrid}
          {/* {errorReq} */}
          <Footer />
        </div>
      </div>
    );
  }
}
