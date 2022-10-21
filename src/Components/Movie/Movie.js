import axios from "axios";
import React, { useState } from "react";
import KEY from "../Key";
import MovieList from "../MovieList/MovieList";
import {
  dateToMonthYear,
  getRunTimeInHours,
  shortenNumber,
} from "../Utils/Utils";
import "./Movie.css";

const Movie = ({ movie, mediaType }) => {
  const [similarMoviesShows, setSimilarMoviesShows] = useState([]);
  let baseUrl = "https://api.themoviedb.org/3/";
  let posterUrl = "https://image.tmdb.org/t/p/w154/";
  let backdropUrl = "https://image.tmdb.org/t/p/w1280/";
  useState(() => {
    mediaType === "tv"
      ? axios
          .get(baseUrl + `tv/${movie.id}/similar?api_key=${KEY}`)
          .then((response) => {
            setSimilarMoviesShows(response.data.results);
          })
      : axios
          .get(baseUrl + `movie/${movie.id}/similar?api_key=${KEY}`)
          .then((response) => {
            setSimilarMoviesShows(response.data.results);
          });
    console.log(movie.id);
  }, [movie]);

  return (
    <div
      id="movie-item"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
          movie.belongs_to_collection
            ? backdropUrl + movie.belongs_to_collection.backdrop_path
            : backdropUrl + movie.backdrop_path
        })`,
      }}
    >
      <img
        id="poster"
        src={posterUrl + movie.poster_path}
        alt={movie.original_title}
      />
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
          {movie.production_companies.slice(0, 3).map((company, index) => {
            return (
              <span key={index} id="company">
                {company.name}
              </span>
            );
          })}
        </p>
        <span id="runtime">
          {movie.runtime ? getRunTimeInHours(movie.runtime) : ""}
        </span>
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
      <div id="revenue-statue">
        <span id="status">{movie.status}</span>
        <span id="revenue">
          {movie.revenue ? shortenNumber(movie.revenue) : ""}
        </span>
      </div>
      <div id="overview">
        <p>{movie.overview}</p>
      </div>
      <div id="related">
        {
          <MovieList
            movieList={similarMoviesShows}
            listTitle={"Related"}
            backgroundColor={"transparent"}
            boxShadow={"none"}
          />
        }
      </div>
    </div>
  );
};

export default Movie;
