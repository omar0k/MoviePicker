import React, { useEffect, useState, useTransition } from "react";
import "./Search.css";
import KEY from "../Key";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchResult from "../SearchResult/SearchResult";

const Search = ({ setMovieList }) => {
  const baseUrl = "https://api.themoviedb.org/3/";
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const searchTerm = e.target.value;
    setWordEntered(searchTerm);
    let combinedArray = [];
    if (searchTerm.length >= 1) {
      const first = baseUrl + `search/movie?api_key=${KEY}&query=${searchTerm}`;
      const second = baseUrl + `search/tv?api_key=${KEY}&query=${searchTerm}`;
      axios
        .all([axios.get(first), axios.get(second)])
        .then(
          axios.spread((...responses) => {
            let moviesArray = responses[0].data.results;
            let showsArray = responses[1].data.results;
            combinedArray = [...moviesArray, ...showsArray];
            combinedArray.sort(
              (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
            );
            console.log(combinedArray);
            const newFilter = combinedArray.filter((value) => {
              return (
                value.title ||
                value.name ||
                value.original_title ||
                value.original_name
              )
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            });
            if (searchTerm === "") {
              setFilteredData([]);
            } else {
              setFilteredData(newFilter);
            }
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      setFilteredData([]);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="search-inputs">
        <input
          autoComplete="off"
          id="search-bar"
          type="text"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="search-icon">
          {wordEntered.length == 0 ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
        {filteredData.length != 0 && (
          <div className="search-results">
            <ul id="search_results">
              {filteredData.map((value, key) => {
                return <SearchResult movie={value} />;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
