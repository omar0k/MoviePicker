import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";
import "./MovieCompare.css";
import Movie from "../Movie/Movie";

const MovieCompare = () => {
  let baseUrl = "https://api.themoviedb.org/3/";
  const [MovieCompare, setMovieCompare] = useState([]);
  const { id, mediatype } = useParams();
  const removeObjectWithId = (arr, id) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);

    return arr;
  };
  useEffect(() => {
    mediatype === "tv"
      ? axios.get(baseUrl + `tv/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        })
      : axios.get(baseUrl + `movie/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        });
  }, [id]);
  const unique = [
    ...new Map(MovieCompare.map((item) => [item["id"], item])).values(),
  ];
  // console.log(unique, similarMoviesShows);
  return (
    <>
      <Search />
      {unique.length >= 5 ? (
        alert("Maximum number reached")
      ) : (
        <div className="movies-container">
          {unique.map((item, index) => {
            return <Movie movie={item} key={index} mediaType={mediatype} />;
          })}
        </div>
      )}
    </>
  );
};

export default MovieCompare;
