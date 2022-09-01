import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LanguageContext from "../context/language";
import { useDispatch } from "react-redux";
import getMovies from "../store/actions/movies";
const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=fa850c6679d86dbe6ace698462bf066b";
export default function Header(props) {
  const dispatch = useDispatch();

  const { contextLang, setContextLang } = useContext(LanguageContext);
  useEffect(() => {
    dispatch(getMovies({ API: FEATURED_API, language: contextLang }));
  }, [contextLang, dispatch]);
  return (
    <nav>
      <NavLink to="/" style={{ marginTop: "3px" }}>
        Home
      </NavLink>
      <NavLink
        to="/favorites"
        style={{ position: "absolute", marginLeft: "70px", marginTop: "3px" }}
      >
        Favorites
      </NavLink>

      <form onSubmit={props.handleOnSubmit}>
        <input
          className="search"
          type="search"
          placeholder="Search..."
          value={props.searchTerm}
          onChange={props.handleOnChange}
        />
      </form>
      <h3 style={{ marginRight: "-300px", marginBottom: "10px" }}>
        {contextLang}
      </h3>
      <button
        onClick={() => {
          setContextLang(contextLang === "en" ? "ar" : "en");
        }}
      >
        Switch lang
      </button>
    </nav>
  );
}
