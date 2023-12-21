import 'macro-css'
import _ from 'lodash'
import './Card.scss'
import PropTypes from 'prop-types'
import React from 'react'
import { Rate } from 'antd'

import { postAddRating } from '../../ApiClient/ApiClient'
import DataContext from '../../context/DataContext'
import UIContext from '../../context/UIContext'

export default function Card({ item, voteAverage, posterPath }) {
  const { guestSessionId } = React.useContext(DataContext)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const { genresList, ratedMovies, setError } = React.useContext(UIContext)
  const PLACEHOLDER_IMAGE = './assets/img/noPhoto.jpeg'
  const BASE_URL = 'https://image.tmdb.org/t/p/original'
  const imgSrc = posterPath ? `${BASE_URL}${posterPath}` : PLACEHOLDER_IMAGE

  const getBorderColor = () => {
    if (voteAverage < 3) {
      return '#E90000'
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      return '#E97E00'
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      return '#E9D100'
    }
    return '#66E900'
  }

  const getGenresByIds = (genreIds, externalGenresList) => {
    const selectedGenres = externalGenresList.genres.filter((genre) => {
      const isIncluded = genreIds.includes(genre.id)
      return isIncluded
    })
    return selectedGenres.map((genre) => <div key={genre.id}>{genre.name}</div>)
  }

  const currentRating = ratedMovies.find((movie) => movie.id === item.id)
  const ratingValue = currentRating ? currentRating.rating : 0

  const debouncedPostAddRating = _.debounce(async (id, value, sessionId) => {
    if (value === 0) {
      return
    }
    if (isSubmitting) {
      return
    }
    try {
      setSubmitting(true)
      await postAddRating(id, value, sessionId)
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }, 500)

  const {
    original_title: title,
    release_date: releaseDate,
    genre_ids: genreIds,
    overview,
    id,
  } = item

  return (
    <div className="card">
      <div className="card__img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="card__description ">
        <h1 className="card__description__title">{title || 'N/A'}</h1>
        <div
          className="card__description__rating"
          style={{ borderColor: getBorderColor() }}
        >
          {voteAverage ? voteAverage.toFixed(1) : 'N/A'}
        </div>
        <h3 className="card__description__release__date">
          {releaseDate || 'N/A'}
        </h3>
        <div className="card__description__genre d-flex">
          {getGenresByIds(genreIds, genresList)}
        </div>
        <p>{overview || 'N/A'}</p>
        <div className="card__description__rate">
          <Rate
            defaultValue={ratingValue}
            count={10}
            allowHalf
            onChange={(value) => {
              debouncedPostAddRating(id, value, guestSessionId)
            }}
          />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    id: PropTypes.number,
    rating: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }),
  voteAverage: PropTypes.number,
  posterPath: PropTypes.string,
}

Card.defaultProps = {
  item: {},
  voteAverage: 0,
  posterPath: '',
}
