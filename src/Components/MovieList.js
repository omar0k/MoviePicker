import { React, useContext } from "react";
import { dateToMonthYear } from "../Utils/Utils";
import MovieCard from "./MovieCard";
import { ThemeContext } from "../ThemeContext";
let posterUrl = "https://image.tmdb.org/t/p/w45/";

const MovieList = ({
  movieList,
  listTitle,
  listMediaType,
  backgroundColor,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`transition-all duration-300 min-w-[300px]  ${
        listTitle === "Related" ? "mt-10" : ""
      } ${
        backgroundColor === "transparent" ? `bg-transparent text-white` : ""
      } ${
        theme === "dark"
          ? "bg-darkAccent text-darkText"
          : "bg-lightAccent text-lightText "
      } max-w-[350px] w-full p-5 shadow-2xl  backdrop-blur-lg bg-opacity-70 rounded-xl`}
    >
      <h5 className="mb-3 font-semibold text-lg">{listTitle}</h5>
      {movieList.slice(0, 5).map((movie, index) => {
        return (
          <MovieCard
            listMediaType={listMediaType}
            backgroundColor={backgroundColor}
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
