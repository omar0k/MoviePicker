import React from "react";
import { removeSpacesFromTitle } from "../Utils/Utils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
  mediaType,
  movieTitle,
  movieYear,
  movieRating,
  moviePoster,
  movieID,
}) => {
  return (
    <div className="movie-info">
      <Link
        to={`/${
          mediaType == "tv" ? "tv" : "movie"
        }/${movieID}--${removeSpacesFromTitle(movieTitle)}`}
      >
        <h3>{movieTitle}</h3>
        <img src={moviePoster} alt={movieTitle} />
        <div>
          <span>{movieYear}</span>
          <span> {movieRating}</span>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
