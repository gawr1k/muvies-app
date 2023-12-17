import 'macro-css';
import './Card.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { Rate } from 'antd';
import { postAddRating } from '../../ApiClient/ApiClient';
import DataContext from '../../context/DataContext';

export default function Card({
  item = {},
  voteAverage = 0,
  posterPath = '',
}) {
  const { guestSessionId } = React.useContext(DataContext);
  const PLACEHOLDER_IMAGE = './noPhoto.jpeg';
  const BASE_URL = 'https://image.tmdb.org/t/p/original';
  const imgSrc = posterPath ? `${BASE_URL}${posterPath}` : PLACEHOLDER_IMAGE;

  const getBorderColor = () => {
    if (voteAverage < 3) {
      return '#E90000';
    } if (voteAverage >= 3 && voteAverage < 5) {
      return '#E97E00';
    } if (voteAverage >= 5 && voteAverage < 7) {
      return '#E9D100';
    }
    return '#66E900';
  };

  const {
    original_title: title,
    release_date: releaseDate,
    overview,
    id,
  } = item;

  return (
    <div className="card">
      <div className="card__img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="card__description ">
        <h1 className="card__description__title">
          {title || 'N/A'}
        </h1>
        <div
          className="card__description__rating"
          style={{ borderColor: getBorderColor() }}
        >
          {voteAverage ? voteAverage.toFixed(1) : 'N/A'}
        </div>
        <h3 className="card__description__release__date">
          {releaseDate || 'N/A'}
        </h3>
        <p>{overview || 'N/A'}</p>
        <div className="card__description__rate">
          <Rate
            count={10}
            allowHalf
            onChange={(value) => {
              postAddRating(id, value, guestSessionId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    id: PropTypes.number,
  }),
  voteAverage: PropTypes.number,
  posterPath: PropTypes.string,
};

Card.defaultProps = {
  item: {},
  voteAverage: 0,
  posterPath: '',
};
