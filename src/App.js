import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import "./App.css";
import MovieCompare from "./Components/MovieCompare/MovieCompare";
import { ThemeContext } from "./ThemeContext";
const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="c">
          <Route
            exact
            path=":mediatype/:id--:moviename"
            element={<MovieCompare />}
          />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  );
};

export default App;
