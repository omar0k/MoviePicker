import React from "react";
import { removeSpacesFromTitle } from "../Utils/Utils";
import { Link } from "react-router-dom";

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
    <div className="movie-info transition-colors text-gray-500 hover:text-black hover:bg-primary pl-1 rounded-md duration-300  font-extrabold ">
      <Link
        className="w-full flex py-2"
        to={`/c/${
          mediaType ? (mediaType === "movie" ? "movie" : "tv") : listMediaType
        }/${movieID}--${removeSpacesFromTitle(movieTitle)}`}
      >
        <div>
          <img src={moviePoster} alt={movieTitle} />
        </div>
        <div className="pl-2">
          <h5 id="title">{movieTitle}</h5>
          <span className="text-sm opacity-70">{movieYear}</span>
          <span className="text-orange-400 font-awesome before:content-['\f005'] ">
            {" "}
            {movieRating}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
