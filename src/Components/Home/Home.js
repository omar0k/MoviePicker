import axios from "axios";
import ThemeToggle from "../ThemeToggleButton";
import { TbMovie } from "react-icons/tb";
import Search from "../Search/Search";

import React, { useState, useEffect, useContext } from "react";
import MovieList from "../MovieList/MovieList";
import KEY from "../Key";
import { ThemeContext } from "../../ThemeContext";
const baseUrl = "https://api.themoviedb.org/3/";

const Home = () => {
  const { theme } = useContext(ThemeContext);

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
        axios.get(baseUrl + `tv/top_rated?api_key=${KEY}`),
      ])
      .then(
        axios.spread((...responses) => {
          setMoviesTrending(responses[0].data.results);
          setMoviesNowPlaying(responses[1].data.results);
          setShowsAiring(responses[2].data.results);
          setPopularMovies(responses[3].data.results);
          setPopularShows(responses[4].data.results);
          setTopMovies(responses[5].data.results);
          setTopShows(responses[6].data.results);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-darkBg" : "bg-lightBg"
      } flex flex-col items-center`}
    >
      <div className="flex flex-col gap-5 justify-center items-center mb-5">
        <ThemeToggle />
        <TbMovie className="text-[10rem] text-primary" />
        <p className="text-[3rem]">Movie Picker</p>
        <Search />
        <div className="opacity-70 text-2xl">
          <h2>or choose from the lists below</h2>
        </div>
      </div>
      <div className="flex  container gap-10 flex-wrap justify-center">
        <MovieList
          theme={theme}
          movieList={moviesTrending}
          listTitle={"Trending Movies"}
          listMediaType={"movie"}
        />
        <MovieList
          theme={theme}
          movieList={moviesNowPlaying}
          listTitle={"Movies Now Playing"}
          listMediaType={"movie"}
        />
        <MovieList
          theme={theme}
          movieList={showsAiring}
          listTitle={"Shows Airing Today"}
          listMediaType={"tv"}
        />
        <MovieList
          theme={theme}
          movieList={popularMovies}
          listTitle={"Popular Movies"}
          listMediaType={"movie"}
        />
        <MovieList
          theme={theme}
          movieList={popularShows}
          listTitle={"Popular Shows"}
          listMediaType={"tv"}
        />
        <MovieList
          theme={theme}
          movieList={topMovies}
          listTitle={"Top Rated Movies"}
          listMediaType={"movie"}
        />
        <MovieList
          theme={theme}
          movieList={topShows}
          listTitle={"Top Rated Shows"}
          listMediaType={"tv"}
        />
      </div>
    </div>
  );
};

export default Home;
