import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import KEY from "./Key";
import Search from "./Search";
import Movie from "./Movie";
import { TbMovie } from "react-icons/tb";
import { ThemeContext } from "../ThemeContext";
import ThemeToggle from "./ThemeToggleButton";

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

  return (
    <div className={`flex flex-col justify-center items-center bg-${theme}Bg`}>
      <div
        className={`bg-${theme} flex relative justify-evenly container items-center my-5 `}
      >
        <Link to={"/"}>
          <button className="bg-gradient-to-br p-2  from-primary to-white rounded-md text-4xl">
            <TbMovie />
          </button>
        </Link>
        <Search />
        <ThemeToggle />
      </div>
      {unique.length <= 5 && (
        <div className="flex w-full h-full text-center overflow-x-auto justify-center items-center">
          {unique.map((item, index) => {
            return <Movie movie={item} key={index} mediaType={mediatype} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MovieCompare;
