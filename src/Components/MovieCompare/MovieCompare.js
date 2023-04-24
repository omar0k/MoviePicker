import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import KEY from "../Key";
import Search from "../Search/Search";
import "./MovieCompare.css";
import Movie from "../Movie/Movie";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { TbMovie } from "react-icons/tb";
import { ThemeContext } from "../../ThemeContext";

const MovieCompare = () => {
  let baseUrl = "https://api.themoviedb.org/3/";
  const [MovieCompare, setMovieCompare] = useState([]);
  const { id, mediatype } = useParams();
  const { theme, setTheme } = useContext(ThemeContext);
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
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      <div className={`top-nav ${theme}`}>
        <Link to={"/"}>
          <button className="buttons" id="home">
            <TbMovie />
          </button>
        </Link>
        <Search />
        <button onClick={toggleTheme} id="dark-mode-toggle">
          {theme === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
        </button>
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
