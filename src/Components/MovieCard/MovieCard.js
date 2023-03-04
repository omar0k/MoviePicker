import React from "react";
import { removeSpacesFromTitle } from "../Utils/Utils";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({
  mediaType,
  movieTitle,
  movieYear,
  movieRating,
  moviePoster,
  movieID,
  listMediaType,
}) => {
  // console.log(mediaType);
  return (
    <div className="movie-info">
      <Link
        className="movie-link"
        to={`/c/${
          mediaType ? (mediaType === "movie" ? "movie" : "tv") : listMediaType
        }/${movieID}--${removeSpacesFromTitle(movieTitle)}`}
      >
        <div>
          <img src={moviePoster} alt={movieTitle} />
        </div>
        <div className="movie-details">
          <h5 id="title">{movieTitle}</h5>
          <span id="date">{movieYear}</span>
          <span id="movie-rating"> {movieRating}</span>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
