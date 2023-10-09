import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"; // Import your icon components

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    // Toggle the theme based on the current value
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={` text-2xl shadow-lg p-3 rounded-lg ${
        theme === "dark"
          ? "bg-darkAccent text-darkText"
          : "bg-lightAccent border  text-lightText"
      }  border-md`}
    >
      {theme === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
    </button>
  );
}

export default ThemeToggle;
