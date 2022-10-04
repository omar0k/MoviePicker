import axios from "axios";
import React, { useState, useEffect } from "react";
import MovieList from "../MovieList/MovieList";
import KEY from "../Key";

let baseUrl = "https://api.themoviedb.org/3/";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(baseUrl + `search/movie?api_key=${KEY}&query=${movie}`)
      .then((response) => {
        setMovieList(response.data.results);
      });
  };
  console.log(movieList);
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id="search-bar"
          placeholder="Movie name"
          onChange={(e) => setMovie(e.target.value)}
        />
      </form>
      <MovieList movieList={movieList} />
    </>
  );
};

export default Home;
