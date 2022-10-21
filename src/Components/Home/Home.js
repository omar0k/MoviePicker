import axios from "axios";
import { TbMovie } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import MovieList from "../MovieList/MovieList";
import KEY from "../Key";
import Search from "../Search/Search";
import "./Home.css";
const baseUrl = "https://api.themoviedb.org/3/";

const Home = () => {
  axios.get(baseUrl + `tv/top_rated?api_key=${KEY}`).then((response) => {
    console.log(response.data.results);
  });
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [showsAiring, setShowsAiring] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topShows, setTopShows] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get(baseUrl + `trending/all/day?api_key=${KEY}`),
        axios.get(baseUrl + `movie/now_playing?api_key=${KEY}`),
        axios.get(baseUrl + `tv/airing_today?api_key=${KEY}`),
        axios.get(baseUrl + `movie/popular?api_key=${KEY}`),
        axios.get(baseUrl + `tv/popular?api_key=${KEY}`),
        axios.get(baseUrl + `movie/top_rated?api_key=${KEY}`),
        // axios.get(baseUrl + `tv/top_rated?api_key=${KEY}`),
      ])
      .then(
        axios.spread((...responses) => {
          setMoviesTrending(responses[0].data.results);
          setMoviesNowPlaying(responses[1].data.results);
          setShowsAiring(responses[2].data.results);
          setPopularMovies(responses[3].data.results);
          setPopularShows(responses[4].data.results);
          setTopMovies(responses[5].data.results);
          // setTopShows(responses[6].data.results);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(topShows);
  return (
    <>
      <div id="site-info">
        <TbMovie id="movie-icon" />
        <p id="site-name">Movie Picker</p>
      </div>
      <Search />
      <div id="choose-text">
        <h2>or choose from the lists below</h2>
      </div>
      <div className="suggestions-container">
        <MovieList movieList={moviesTrending} listTitle={"Trending Movies"} />
        <MovieList
          movieList={moviesNowPlaying}
          listTitle={"Movies Now Playing"}
        />
        <MovieList movieList={showsAiring} listTitle={"Shows Airing Today"} />
        <MovieList movieList={popularMovies} listTitle={"Popular Movies"} />
        <MovieList movieList={popularShows} listTitle={"Popular Shows"} />
        <MovieList movieList={topMovies} listTitle={"Top Rated Movies"} />
        {/* <MovieList movieList={topShows} listTitle={"Top Rated Shows"} /> */}
      </div>
    </>
  );
};

export default Home;
