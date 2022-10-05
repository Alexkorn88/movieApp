/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Button, Rate } from 'antd';
import { format } from 'date-fns';
import { FileImageOutlined } from '@ant-design/icons';

import GenreContext from '../context/context';

export default class MovieCard extends Component {
  render() {
    const { poster_path, title, release_date, overview, vote_average, genre_ids, id, item } = this.props;
    const titleMovie = (string) => {
      if (string.length > 52) {
        return `${string.substring(0, 54)}...`;
      }
      return string;
    };

    const date = (release_date) => {
      if (!release_date) {
        return 'no date';
      }
      return format(new Date(release_date), 'MMMM dd, yyyy');
    };
    const posterPath = (poster_path) => {
      if (!poster_path) {
        return <FileImageOutlined className="image__off" />;
      }
      return <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="movies__img" className="movies__img" />;
    };

    const showGenres = (value) => {
      const genres = value
        .filter((e) => genre_ids.findIndex((i) => i === e.id) !== -1)
        .map((item) => {
          const { id, name } = item;
          return (
            <Button key={id} size="small">
              {name}
            </Button>
          );
        });
      if (genres.length > 3) {
        return genres.slice(0, 3);
      }
      return genres;
    };

    const onChangeSession = (value, id) => {
      const arr = JSON.parse(localStorage.getItem('items')) ?? [];
      if (arr.length) {
        const elem = arr.find((el) => el.id === id);
        if (elem) {
          arr.map((el) => (el.id === id ? { ...el, rateValue: value } : el));
        } else {
          arr.push({ ...item, rateValue: value });
        }
        localStorage.setItem('items', JSON.stringify(arr));
        return;
      }

      arr.push({ ...item, rateValue: value });
      localStorage.setItem('items', JSON.stringify(arr));
    };

    const saveRate = () => {
      if (localStorage.getItem('items')) {
        return JSON.parse(localStorage.getItem('items')).filter((e) => e.rateValue && e.id === id)?.[0]?.rateValue;
      }
      return 0;
    };

    return (
      <div className="movies__card">
        {posterPath(poster_path)}
        <div className="movies__container">
          <div className="movies__title">
            <h2>{titleMovie(title)}</h2>
            <div
              className="average"
              style={{
                borderColor:
                  vote_average <= 3
                    ? '#E90000'
                    : vote_average > 3 && vote_average <= 5
                    ? '#E97E00'
                    : vote_average > 5 && vote_average <= 7
                    ? '#E9D100'
                    : '#66E900',
              }}
            >
              <span className="average__span">{vote_average}</span>
            </div>
          </div>
          <div className="movies__date">{date(release_date)}</div>
          <div className="buttons">
            <GenreContext.Consumer>{showGenres}</GenreContext.Consumer>
          </div>
          <span className="movies__info">{overview}</span>
          <Rate
            className="movies__stars"
            allowHalf
            count={10}
            defaultValue={saveRate()}
            onChange={(value) => onChangeSession(value, id)}
          />
        </div>
      </div>
    );
  }
}
