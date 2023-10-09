import React, { useState } from "react";
// import "./Search.css";
import KEY from "./Key";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import SearchResult from "./SearchResult";

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
    <div className="w-[600px]">
      <div className="search-inputs  relative flex ">
        <input
          className="rounded-md text-black border-primary border focus:outline-primary flex-1 px-4 py-2 "
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
        <div className="absolute right-0 pr-2 top-0 bottom-0 flex items-center pl-3 text-black">
          {wordEntered.length === 0 ? (
            <AiOutlineSearch className="text-2xl" />
          ) : (
            <AiOutlineClose
              className="text-2xl cursor-pointer"
              onClick={clearInput}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="absolute  h-[200px] w-[600px]  py-2 overflow-y-scroll bg-white z-10  ">
          <ul>
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
  );
};
export default Search;
