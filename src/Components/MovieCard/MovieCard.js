import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const removeSpacesFromTitle = (title) => {
  title = title.replace(/\s+/g, "_");
  return title;
};
const MovieCard = ({
  movieTitle,
  movieYear,
  movieRating,
  moviePoster,
  movieID,
}) => {
  return (
    <Link to={`movie/${movieID}--${removeSpacesFromTitle(movieTitle)}`}>
      <div className="movie-info">
        <h3>{movieTitle}</h3>
        <img src={moviePoster} alt={movieTitle} />
        <div>
          <span>{movieYear}</span>
          <span> {movieRating}</span>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
