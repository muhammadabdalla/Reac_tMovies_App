import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/actions/favorite";
import getMovies from "../store/actions/movies";
import SearchContext from "../context/search";
import LanguageContext from "../context/language";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=fa850c6679d86dbe6ace698462bf066b&query=";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=fa850c6679d86dbe6ace698462bf066b";
const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};
export let newMovies = [];
export let favorites = [];
const Movie = ({ title, vote_average, id, poster_path, active }) => {
  favorites = useSelector((state) => state.favorites.favorites);
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const { searchTerm } = useContext(SearchContext);
  const { contextLang } = useContext(LanguageContext);

  function activation() {
    newMovies = movies.map((movie) => {
      if (movie.id === id) {
        movie.active = true;
      }
      return movie;
    });

    favorites.push({ title, vote_average, id, poster_path, active });
    dispatch(addFavorite(favorites));
    if (searchTerm) {
      dispatch(
        getMovies({ API: SEARCH_API + searchTerm, language: contextLang })
      );
    } else {
      dispatch(getMovies({ API: FEATURED_API, language: contextLang }));
    }
  }

  function deletion() {
    newMovies = movies.map((movie) => {
      if (movie.id === id) {
        movie.active = false;
      }
      return movie;
    });

    favorites = favorites.filter((movie) => {
      return movie.id !== id;
    });

    dispatch(addFavorite(favorites));

    if (searchTerm) {
      dispatch(
        getMovies({ API: SEARCH_API + searchTerm, language: contextLang })
      );
    } else {
      dispatch(getMovies({ API: FEATURED_API, language: contextLang }));
      console.log(favorites);
    }
  }

  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://media.istockphoto.com/photos/popcorn-and-clapperboard-picture-id1191001701?b=1&k=20&m=1191001701&s=170667a&w=0&h=uVqDpnXNtnfbhB-F4sWac_t3oL_YSrDuHeCKdaJGS3U="
        }
        alt={title}
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
        <Link to={`/movies/${id}`} className="btn btn-primary">
          <button style={{ backgroundColor: "yellow", color: "black" }}>
            Go to details
          </button>
        </Link>

        <i
          id={id}
          className={active ? "fa-solid fa-star" : "fa-regular fa-star"}
          onClick={() => {
            if (!active) {
              active = true;
              activation();
            } else {
              active = false;
              deletion();
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default Movie;
