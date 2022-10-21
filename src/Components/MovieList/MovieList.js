import { React } from "react";
import "./MovieList.css";
import { dateToMonthYear } from "../Utils/Utils";
import MovieCard from "../MovieCard/MovieCard";
let posterUrl = "https://image.tmdb.org/t/p/w45/";

const MovieList = ({ movieList, listTitle, backgroundColor, boxShadow }) => {
  return (
    <div
      className="movie-list"
      style={{
        backgroundColor: backgroundColor,
        boxShadow: boxShadow,
      }}
    >
      <h5 id="list-title">{listTitle}</h5>
      {movieList.slice(0, 5).map((movie, index) => {
        return (
          <MovieCard
            {...movie}
            key={index}
            mediaType={movie.media_type}
            movieTitle={movie.name || movie.title}
            movieYear={
              movie.first_air_date
                ? dateToMonthYear(movie.first_air_date)
                : movie.release_date
                ? dateToMonthYear(movie.release_date)
                : ""
            }
            moviePoster={
              movie.poster_path
                ? posterUrl + movie.poster_path
                : "https://via.placeholder.com/45x68?text=Movie+Poster+Not+Available"
            }
            movieID={movie.id}
            movieRating={movie.vote_average.toFixed(1)}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
