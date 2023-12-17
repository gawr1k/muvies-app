import 'macro-css';
import './Card.scss';
import React from 'react';
import { Rate, Spin } from 'antd';
import { postAddRating } from '../../ApiClient/ApiClient';

export default function Card({
  item,
  id,
  poster_path,
  getGenreNamesByIds,
  vote_average,
  loading,
  guestSessionId,
}) {
  const PLACEHOLDER_IMAGE = './noPhoto.jpeg';
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  let imgSrc;

  if (poster_path) {
    imgSrc = `${BASE_URL}${poster_path}`;
  } else {
    imgSrc = PLACEHOLDER_IMAGE;
  }

  const getBorderColor = () => {
    if (vote_average < 3) {
      return '#E90000';
    } if (vote_average >= 3 && vote_average < 5) {
      return '#E97E00';
    } if (vote_average >= 5 && vote_average < 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  if (loading) {
    return <Spin />;
  }
  return (
    <div className="card">
      <div className="card__img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="card__description ">
        <h1 className="card__description__title">
          {item?.original_title || 'N/A'}
        </h1>
        <div
          className="card__description__rating"
          style={{ borderColor: getBorderColor() }}
        >
          {item?.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
        </div>
        <h3 className="card__description__release__date">
          {item?.release_date || 'N/A'}
        </h3>
        <div className="card__description__genre d-flex">
          {getGenreNamesByIds(item?.genre_ids).map((genre, index) =>
          // что то нужно придумать
          // console.log(getGenreNamesByIds(item.genre_ids));
            <div key={index}>{genre}</div>)}
        </div>
        <p>{item?.overview || 'N/A'}</p>
        <div className="card__description__rate">
          <Rate
            count={10}
            allowHalf
            onChange={(value) => {
              // console.log(value);
              postAddRating(id, value, guestSessionId);
            }}
          />
        </div>
      </div>
    </div>
  );
}
