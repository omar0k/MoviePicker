import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";

const MovieDetails = () => {
  let posterUrl = "https://image.tmdb.org/t/p/w342/";
  let baseUrl = "https://api.themoviedb.org/3/";
  const [movieDetails, setMovieDetails] = useState({});
  const { id, movieName } = useParams();
  useEffect(() => {
    axios
      .get(baseUrl + `movie/${id}?api_key=${KEY}&language=en-US`)
      .then((response) => {
        setMovieDetails(response.data);
      });
  }, [id]);
  return (
    <div>
      <Search />
      <h3>{movieDetails.original_title}</h3>
      <img
        src={posterUrl + movieDetails.poster_path}
        alt={movieDetails.original_title}
      />
      <div>
        <p>{movieDetails.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
