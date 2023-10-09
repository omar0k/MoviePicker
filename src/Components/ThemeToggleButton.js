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
    <button onClick={toggleTheme} id="dark-mode-toggle">
      {theme === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
    </button>
  );
}

export default ThemeToggle;
