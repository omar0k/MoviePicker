import React from "react";
import axios from "axios";
import KEY from "../Key";
import { useState, useEffect } from "react";

let baseUrl = "https://api.themoviedb.org/3/";

const MovieCard = () => {
  useEffect(() => {
    axios.get(baseUrl + `trending/all/day?api_key=${KEY}`).then((response) => {
      console.log(response.data);
    });
  });
  return <div>MovieCard</div>;
};
export default MovieCard;
