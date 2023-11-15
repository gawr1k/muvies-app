import 'macro-css';
import './Card.scss'
import React from 'react';
import { Rate } from 'antd';

const Card = ({item, id, original_title, overview, release_date, poster_path, genre_ids, vote_average, getGenreNamesByIds, ratedMoviesIds, setRatedMoviesIds }) => {
  const genreNames = getGenreNamesByIds(genre_ids);
  const PLACEHOLDER_IMAGE = './noPhoto.jpeg';
  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  


  let imgSrc;

  const handleRate = (value) => {
    setRatedMoviesIds(prev => [...prev, item]);
  }

  if (poster_path) {
    imgSrc = `${BASE_URL}${poster_path}`; 
  } else {
    imgSrc = PLACEHOLDER_IMAGE;
  }

    return(
        <div className='card d-flex justify-between'>
            <div className='card__img'>
              <img width={183} height={281}src={imgSrc} alt="" />
            </div>
            <div className='card__description '>
              <h1 className='card__description__title'>{original_title}</h1>
              <div className='card__description__rating'>{vote_average.toFixed(1)}</div>
              <h3 className='card__description__release__date'>{release_date}</h3>
              <div className='card__description__genre d-flex'> 
                {genreNames.map((genre, index) => (
                    <div key={index}>{genre}</div>
                ))}
              </div>
              <p>{overview}</p>
              <div className='card__description__rate'>
              <Rate
                count={10}
                allowHalf
                defaultValue={0}
                onChange={handleRate}
              />
              </div>
            </div>
        </div>
    )
}

export default Card;