import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import "./App.css";
import MovieCompare from "./Components/MovieCompare/MovieCompare";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:mediatype/:id--:movieName" element={<MovieCompare />} />
    </Routes>
  );
};

export default App;
