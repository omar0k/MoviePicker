import React from "react";
import { dateToMonthYear, getRunTimeInHours } from "../Utils/Utils";
import "./Movie.css";

const Movie = ({ movie }) => {
  let posterUrl = "https://image.tmdb.org/t/p/w154/";
  let backdropUrl = "https://image.tmdb.org/t/p/w1280/";
  return (
    <div
      id="movie-item"
      style={{
        backgroundImage: `url(${
          movie.belongs_to_collection
            ? backdropUrl + movie.belongs_to_collection.backdrop_path
            : backdropUrl + movie.backdrop_path
        })`,
      }}
    >
      <img src={posterUrl + movie.poster_path} alt={movie.original_title} />
      <div>
        <p>{movie.original_title || movie.original_name}</p>
      </div>
      <div id="rating">
        <span id="vote-average">{movie.vote_average.toFixed(1)}</span>
      </div>
      <div id="medias">
        <button>Images</button>
        <button>Vidoes</button>
      </div>
      <div id="info">
        <p id="countries">
          {movie.production_countries.map((country, index) => {
            return (
              <span key={index} id="country">
                {country.name}
              </span>
            );
          })}
        </p>
        <p id="production">
          {movie.production_companies.map((company, index) => {
            return (
              <span key={index} id="company">
                {company.name}
              </span>
            );
          })}
        </p>
        <span id="runtime">{movie.runtime?getRunTimeInHours(movie.runtime):""}</span>
        <span id="release-date">
          {movie.release_date
            ? dateToMonthYear(movie.release_date)
            : dateToMonthYear(movie.first_air_date)}
        </span>
      </div>
      <div id="genres">
        {movie.genres.map((genre, index) => {
          return (
            <span key={index} id="genre">
              {genre.name}
            </span>
          );
        })}
      </div>
      <p>
        {movie.status}
        {movie.revenue ? movie.revenue : ""}
      </p>
      <div id="overview">
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Movie;
