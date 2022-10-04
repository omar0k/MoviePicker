import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Search from "./Components/Search/Search";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/movie/:id--:movieName" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;
