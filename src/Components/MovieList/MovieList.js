import { React, useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
let posterUrl = "https://image.tmdb.org/t/p/w342/";
const dateToMonthYear = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(6, 7);
  const dateObj = new Date();
  dateObj.setMonth(month);
  month = dateObj.toLocaleDateString("en-US", { month: "long" });
  return [month + " " + year];
};

const MovieList = ({ movieList }) => {
  return (
    <div className="movie-list">
      {movieList.map((movie, index) => {
        return (
          <MovieCard
            {...movie}
            key={index}
            movieTitle={movie.name || movie.title}
            movieYear={
              movie.first_air_date
                ? dateToMonthYear(movie.first_air_date)
                : dateToMonthYear(movie.release_date)
            }
            moviePoster={
              movie.poster_path
                ? posterUrl + movie.poster_path
                : "https://via.placeholder.com/342x513?text=Movie+Poster+Not+Available"
            }
            movieID={movie.id}
            movieRating={movie.vote_average}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
