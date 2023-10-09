import React, { useContext } from "react";
import { removeSpacesFromTitle } from "./Utils/Utils";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const MovieCard = ({
  mediaType,
  movieTitle,
  movieYear,
  movieRating,
  moviePoster,
  movieID,
  listMediaType,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`transition-colors ${
        theme === "dark" ? "text-darkText" : "text-lightText"
      } text-gray-300 hover:text-black hover:bg-primary pl-1 rounded-md duration-300   w-full`}
    >
      <Link
        className="w-full flex py-2"
        to={`/c/${
          mediaType ? (mediaType === "movie" ? "movie" : "tv") : listMediaType
        }/${movieID}--${removeSpacesFromTitle(movieTitle)}`}
      >
        <div className="min-w-[45px]">
          <img src={moviePoster} alt={movieTitle} />
        </div>
        <div
          className={`pl-2  flex flex-col justify-center items-start ${
            theme === "dark" ? "text-darkText" : "text-lightText"
          }`}
        >
          <h5 className="">{movieTitle}</h5>
          <span className="text-sm opacity-70">{movieYear}</span>
          <span className="font-extrabold text-sm text-orange-400 font-awesome before:content-['\f005'] ">
            {" "}
            {movieRating}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
