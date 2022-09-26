import React, { Component } from "react";
import { Button } from "antd";
import { Rate } from "antd";
import { format } from "date-fns";
import { FileImageOutlined } from "@ant-design/icons";

//import "./app.css";

export default class MovieCard extends Component {
  render() {
    const { poster_path, title, release_date, overview, vote_average } =
      this.props;
    const titleMovie = (string) => {
      if (string.length > 52) {
        return `${string.substring(0, 54)}...`;
      } else {
        return string;
      }
    };

    const date = (release_date) => {
      if (!release_date) {
        return "no date";
      } else {
        return format(new Date(release_date), "MMMM dd, yyyy");
      }
    };
    const posterPath = (poster_path) => {
      if (!poster_path) {
        return <FileImageOutlined className="image__off" />;
      } else {
        return (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movies__img"
            className="movies__img"
          />
        );
      }
    };
    return (
      <>
        <div className="movies__card">
          {posterPath(poster_path)}
          <div className="movies__container">
            <div className="movies__title">
              <h2>{titleMovie(title)}</h2>
              <Button shape="circle" size="large">
                {vote_average}
              </Button>
            </div>

            <div className="movies__date">{date(release_date)}</div>
            <div className="buttons">
              <Button size="small">Action</Button>
              <Button size="small">Dramma</Button>
            </div>
            <span className="movies__info">{overview}</span>
            <Rate
              className="movies__stars"
              allowHalf
              count={10}
              defaultValue={0}
            />
          </div>
        </div>
      </>
    );
  }
}
