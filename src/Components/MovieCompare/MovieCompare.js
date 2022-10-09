import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";
import "./MovieCompare.css";

const MovieCompare = () => {
  let posterUrl = "https://image.tmdb.org/t/p/w342/";
  let baseUrl = "https://api.themoviedb.org/3/";
  const [MovieCompare, setMovieCompare] = useState({});
  const { id, movieName } = useParams();
  useEffect(() => {
    axios
      .all([
        axios.get(baseUrl + `movie/${id}?api_key=${KEY}&language=en-US`),
        axios.get(baseUrl + `tv/${id}?api_key=${KEY}&language=en-US`),
      ])
      .then(
        axios.spread((...responses) => {
          console.log(responses);
        })
      );
  }, [id]);
  return (
    <div>
      <Search />
      <h3>{MovieCompare.original_title}</h3>
      <img
        src={posterUrl + MovieCompare.poster_path}
        alt={MovieCompare.original_title}
      />
      <div>
        <p>{MovieCompare.overview}</p>
      </div>
    </div>
  );
};

export default MovieCompare;
