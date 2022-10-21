import { Link, useParams } from "react-router-dom";
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
    const newArr = arr.filter((obj) => {
      return obj.id !== id;
    });
    console.log(newArr);
    return newArr;
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
  return (
    <>
      <div className="top-nav">
        <Link to={"/"}>
          <button className="buttons" id="home">
            Home
          </button>
        </Link>
        <Search />
        <button className="buttons" id="reset">
          Reset
        </button>
      </div>
      {unique.length <= 5 && (
        <div className="movies-container">
          {unique.map((item, index) => {
            return (
              <Movie
                movie={item}
                key={index}
                mediaType={mediatype}
                movieArray={unique}
                removeMovie={removeObjectWithId}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default MovieCompare;
