import React, { Component } from "react";
import { Button } from "antd";
import { Rate } from "antd";
import { format } from "date-fns";

//import "./app.css";

export default class MovieCard extends Component {
  render() {
    const { poster_path, title, release_date, overview, vote_average } =
      this.props;
    const date = format(new Date(release_date), "MMMM dd, yyyy");

    return (
      <>
        <div className="movies__card">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movies__img"
            className="movies__img"
          />
          <div className="movies__container">
            <div className="movies__title">
              <h2>{title}</h2>
              <Button shape="circle" size="large">
                {vote_average}
              </Button>
            </div>

            <div className="movies__date">{date}</div>
            <div className="buttons">
              <Button size="small">Action</Button>
              <Button size="small">Dramma</Button>
            </div>
            <span className="movies__info">{overview}</span>
            <Rate
              className="movies__stars"
              allowHalf
              count={10}
              defaultValue={vote_average}
            />
          </div>
        </div>
      </>
    );
  }
}
