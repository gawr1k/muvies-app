import "macro-css";
import "./Card.scss";
import React from "react";
import { Rate, Spin } from "antd";

const Card = ({
  item,
  poster_path,
  getGenreNamesByIds,
  ratedMoviesIds,
  setRatedMoviesIds,
  vote_average,
}) => {
  const PLACEHOLDER_IMAGE = "./noPhoto.jpeg";
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const [loading, setLoading] = React.useState(true);
  let imgSrc;

  const handleRate = (id, newRate, item) => {
    const isCardRated = ratedMoviesIds.some((movie) => movie.id === id);

    if (isCardRated) {
      setRatedMoviesIds((prevRatedMoviesIds) => {
        return prevRatedMoviesIds.map((movie) =>
          movie.id === id ? { ...movie, rate: newRate } : movie
        );
      });
    } else {
      setRatedMoviesIds((prevRatedMoviesIds) => [
        ...prevRatedMoviesIds,
        {
          id,
          original_title: item.original_title,
          overview: item.overview,
          release_date: item.release_date,
          poster_path: item.poster_path,
          genre_ids: item.genre_ids,
          vote_average: item.vote_average,
          rate: newRate,
        },
      ]);
    }
  };

  if (poster_path) {
    imgSrc = `${BASE_URL}${poster_path}`;
  } else {
    imgSrc = PLACEHOLDER_IMAGE;
  }

  const getBorderColor = () => {
    if (vote_average < 3) {
      return "red";
    } else if (vote_average < 7) {
      return "#E9D100";
    } else {
      return "green";
    }
  };

  return (
    <div className="card">
      <div className="card__img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="card__description ">
        <h1 className="card__description__title">
          {item?.original_title || "N/A"}
        </h1>
        <div
          className="card__description__rating"
          style={{ borderColor: getBorderColor() }}
        >
          {item?.vote_average ? item.vote_average.toFixed(1) : "N/A"}
        </div>
        <h3 className="card__description__release__date">
          {item?.release_date || "N/A"}
        </h3>
        <div className="card__description__genre d-flex">
          {getGenreNamesByIds(item?.genre_ids).map((genre, index) => {
            // что то нужно придумать
            console.log(getGenreNamesByIds(item.genre_ids)); // Добавьте эту строку
            return <div key={index}>{genre}</div>;
          })}
        </div>
        <p>{item?.overview || "N/A"}</p>
        <div className="card__description__rate">
          <Rate
            count={10}
            allowHalf
            defaultValue={
              (ratedMoviesIds.find((movie) => movie.id === item?.id) || {})
                .rate || 0
            }
            onChange={(newRate) => handleRate(item?.id, newRate, item)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
