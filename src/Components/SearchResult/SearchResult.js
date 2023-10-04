import React from "react";
import { Link } from "react-router-dom";
import { removeSpacesFromTitle } from "../Utils/Utils";

const SearchResult = ({ movie }) => {
  let posterUrl = `https://image.tmdb.org/t/p/`;
  return (
    <div>
      <li>
        <Link
          className="data-item w-full p-1  h-[50px] hover:bg-primary border-b-gray-500 border-b flex text-black"
          to={`/c/${movie.media_type === "tv" ? "tv" : "movie"}/${
            movie.id
          }--${removeSpacesFromTitle(
            movie.title || movie.name || movie.original_name
          )}`}
        >
          <img
          className="mr-3"
            src={
              movie.poster_path
                ? posterUrl + "w45" + movie.poster_path
                : "https://via.placeholder.com/45x68?text=Movie+Poster+Not+Available"
            }
            alt={movie.title}
          />
          <p>{movie.title || movie.name || movie.original_name}</p>
        </Link>
      </li>
    </div>
  );
};

export default SearchResult;
