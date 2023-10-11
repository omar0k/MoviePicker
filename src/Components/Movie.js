import axios from "axios";
import React, { useState } from "react";
import KEY from "./Key";
import MovieList from "./MovieList";
import {
  dateToMonthYear,
  getRunTimeInHours,
  shortenNumber,
} from "../Utils/Utils";
import { AiFillCloseCircle } from "react-icons/ai";

const Movie = ({ movie, mediaType }) => {
  const [similarMoviesShows, setSimilarMoviesShows] = useState([]);
  const baseUrl = "https://api.themoviedb.org/3/";
  const posterUrl = "https://image.tmdb.org/t/p/w154/";
  const backdropUrl = "https://image.tmdb.org/t/p/w1280/";
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
  }, [movie]);

  return (
    <div
      className="flex flex-col gap-3 text-white bg-cover bg-center bg-no-repeat w-full h-[1250px] items-center "
      style={{
        boxShadow: "60px 60px 150px black inset, -60px -60px 150px black inset",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
          movie.belongs_to_collection
            ? backdropUrl + movie.belongs_to_collection.backdrop_path
            : backdropUrl + movie.backdrop_path
        })`,
      }}
    >
      <div className="relative">
        <img
          className="rounded-lg mt-5 shadow-lg shadow-black "
          src={posterUrl + movie.poster_path}
          alt={movie.original_title}
        />
        <button className="text-2xl absolute bg-black rounded-full top-[5%] right-0 ">
          <AiFillCloseCircle className="" />
        </button>
      </div>
      <div>
        <p>{movie.original_title || movie.original_name}</p>
      </div>
      <div>
        <span className="text-orange-400 font-extrabold font-awesome before:content-['\f005'] ">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>
      {/* <div id="medias">
        <button>Images</button>
        <button>Vidoes</button>
      </div> */}
      <div>
        <p>
          {movie.production_countries.map((country, index) => {
            return (
              <span key={index} id="country">
                {country.name}
                {index < movie.production_companies.slice(0, 3).length - 1 &&
                  ","}
              </span>
            );
          })}
        </p>
        <p id="production">
          {movie.production_companies.slice(0, 3).map((company, index) => {
            return (
              <span key={index}>
                {company.name}
                {index < movie.production_companies.slice(0, 3).length - 1 &&
                  ", "}
              </span>
            );
          })}
        </p>
        <span>{movie.runtime ? getRunTimeInHours(movie.runtime) : ""}</span>
        <span>
          {movie.release_date
            ? dateToMonthYear(movie.release_date)
            : dateToMonthYear(movie.first_air_date)}
        </span>
      </div>
      <div>
        {movie.genres.map((genre, index) => {
          return (
            <span key={index} id="genre">
              {genre.name}
              {index < movie.genres.slice(0, 3).length - 1 && ", "}
            </span>
          );
        })}
      </div>
      <div id="revenue-statue">
        <span>{movie.status}</span>
        <span className="ml-5">
          {movie.revenue ? shortenNumber(movie.revenue) : ""}
        </span>
      </div>
      <div className="overflow-y-auto h-[300px] w-[250px]">
        <p>{movie.overview}</p>
      </div>
      <div>
        {
          <MovieList
            movieList={similarMoviesShows}
            listTitle={"Related"}
            backgroundColor={"transparent"}
            boxShadow={"none"}
            listMediaType={mediaType}
          />
        }
      </div>
    </div>
  );
};

export default Movie;
