import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";
import "./MovieCompare.css";

const MovieCompare = () => {
  let posterUrl = "https://image.tmdb.org/t/p/w342/";
  let baseUrl = "https://api.themoviedb.org/3/";
  const [MovieCompare, setMovieCompare] = useState([]);
  const { id, mediatype } = useParams();
  useEffect(() => {
    mediatype === "tv"
      ? axios.get(baseUrl + `/tv/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        })
      : axios.get(baseUrl + `/movie/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        });
  }, [id]);
  const unique = [
    ...new Map(MovieCompare.map((item) => [item["id"], item])).values(),
  ];
  console.log(unique);
  return (
    <div>
      <Search />
      {unique.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.original_title}</h3>

            <img src={posterUrl + item.poster_path} alt={item.original_title} />

            <div>
              <p>{item.overview}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCompare;
