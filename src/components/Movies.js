import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import LanguageContext from "../context/language";
import getMovies from "../store/actions/movies";

import Movie from "./Movie";
let x = 1;
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=fa850c6679d86dbe6ace698462bf066b";
export default function Movies() {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const { contextLang } = useContext(LanguageContext);

  return (
    <>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <button
        style={{ marginBottom: "-50px" }}
        onClick={() => {
          dispatch(
            getMovies({ API: FEATURED_API, page: --x, language: contextLang })
          );
        }}
      >
        previous page
      </button>
      <button
        style={{ marginLeft: "1123px", width: "90px" }}
        onClick={() => {
          dispatch(
            getMovies({ API: FEATURED_API, page: ++x, language: contextLang })
          );
        }}
      >
        next page
      </button>
    </>
  );
}
