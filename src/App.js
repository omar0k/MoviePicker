import React from "react";
import {
  Routes,
  Route,
  Link,
  Router,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import "./App.css";
import MovieCompare from "./Components/MovieCompare/MovieCompare";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="c">
        <Route exact path=":mediatype/:id--:moviename" element={<MovieCompare />} />
      </Route>
    </Routes>
  );
};

export default App;
