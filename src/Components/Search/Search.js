import React, { useEffect, useState, useTransition } from "react";
import "./Search.css";
import KEY from "../Key";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { removeSpacesFromTitle } from "../Utils/Utils";
let posterUrl = `https://image.tmdb.org/t/p/`;

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
      // console.log("first", searchTerm, "--", first);
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" value={wordEntered} onChange={handleFilter} />
        </form>
        <div className="searchIcon">
          {wordEntered.length == 0 ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="searchResults">
          {filteredData.map((value, key) => {
            return (
              <Link
                key={key}
                className="dataItem"
                to={`${value.mediaType == "tv" ? "tv" : "movie"}/${
                  value.id
                }--${removeSpacesFromTitle(
                  value.title || value.name || value.original_name
                )}`}
              >
                <img
                  src={
                    value.poster_path
                      ? posterUrl + "w45" + value.poster_path
                      : "https://via.placeholder.com/45x68?text=Movie+Poster+Not+Available"
                  }
                  alt={value.title}
                />
                <p>{value.title || value.name || value.original_name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
// let baseUrl = "https://api.themoviedb.org/3/";
//   const [movie, setMovie] = useState("");
//   useEffect(() => {
//     axios
//       .get(baseUrl + `trending/all/day?api_key=${KEY}&page=3`)
//       .then((response) => {
//         setMovieList(response.data.results);
//       });
//   }, []);
//
export default Search;
