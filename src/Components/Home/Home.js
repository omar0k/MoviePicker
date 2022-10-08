import axios from "axios";
import React, { useState, useEffect } from "react";
import MovieList from "../MovieList/MovieList";
import KEY from "../Key";
import Search from "../Search/Search";
const baseUrl = "https://api.themoviedb.org/3/";

const Home = () => {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + `trending/all/day?api_key=${KEY}&page=3`)
      .then((response) => {
        setMovieList(response.data.results);
      });
  }, []);
  return (
    <>
      <Search setMovieList={setMovieList} />
      <MovieList movieList={movieList} />
    </>
  );
};

export default Home;
