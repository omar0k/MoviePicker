import React, { useState } from "react";
import "./Search.css";
import KEY from "../Key";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";

const Search = () => {
  const baseUrl = "https://api.themoviedb.org/3/";
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  let mediaTypeArray = [];
  const handleFilter = (e) => {
    const searchTerm = e.target.value;
    setWordEntered(searchTerm);
    let combinedArray = [];
    if (searchTerm.length >= 1) {
      axios
        .all([
          axios.get(
            baseUrl + `search/multi?api_key=${KEY}&query=${searchTerm}&page=1`
          ),
          axios.get(
            baseUrl + `search/multi?api_key=${KEY}&query=${searchTerm}&page=2`
          ),
        ])
        .then(
          axios.spread((...responses) => {
            let firstPage = responses[0].data.results;
            let secondPage = responses[1].data.results;
            combinedArray = [...firstPage, ...secondPage];
            let filtered = combinedArray.filter((value) => {
              return !value.media_type.includes("person");
            });
            filtered.sort(
              (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
            );
            mediaTypeArray = filtered.map((value, index) => {
              return value.media_type;
            });
            setFilteredData(filtered);
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
          onBlur={() => {
            setTimeout(() => {
              document.getElementById("dropdown") &&
                (document.getElementById("dropdown").style.display = "none");
            }, 80);
          }}
          onFocus={() => {
            setTimeout(() => {
              document.getElementById("dropdown") &&
                (document.getElementById("dropdown").style.display = "inline");
            }, 80);
          }}
          autoComplete="off"
          id="search-bar"
          type="text"
          placeholder="Type Movie or TV Show name"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="search-icon">
          {wordEntered.length === 0 ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
        {filteredData.length !== 0 && (
          <div className="search-results" id="dropdown">
            <ul id="search_results">
              {filteredData.map((value, key) => {
                return (
                  <SearchResult
                    movie={value}
                    mediaType={mediaTypeArray[key]}
                    key={key}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
