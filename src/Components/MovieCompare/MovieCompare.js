import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";
import "./MovieCompare.css";
import Movie from "../Movie/Movie";
import { TbMovie } from "react-icons/tb";

const MovieCompare = () => {
  let baseUrl = "https://api.themoviedb.org/3/";
  const [MovieCompare, setMovieCompare] = useState([]);
  const { id, mediatype } = useParams();

  useEffect(() => {
    mediatype === "tv"
      ? axios.get(baseUrl + `tv/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        })
      : axios.get(baseUrl + `movie/${id}?api_key=${KEY}`).then((response) => {
          setMovieCompare([...MovieCompare, response.data]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  let unique = [
    ...new Map(MovieCompare.map((item) => [item["id"], item])).values(),
  ];
  if (unique.length > 5) {
    alert("Too many movies");
    unique.length = 5;
  }
  return (
    <>
      <div className="top-nav">
        <Link to={"/"}>
          <button className="buttons" id="home">
            <TbMovie />
          </button>
        </Link>
        <Search />
      </div>
      {unique.length <= 5 && (
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
