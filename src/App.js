import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import { useDispatch } from "react-redux";
import getMovies from "./store/actions/movies";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Favorites from "./components/Favorites";
import MovieDetails from "./components/MovieDetails";
import Error from "./components/Error";
import LanguageContext from "./context/language";
import SearchContext from "./context/search";

const FEATURED_API =
  "https://api.themoviedb.org/3/movie/popular?api_key=fa850c6679d86dbe6ace698462bf066b";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=fa850c6679d86dbe6ace698462bf066b&query=";

function App() {
  // const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contextLang, setContextLang] = useState("en");

  const dispatch = useDispatch();

  // const getMovies = (API, page, language) => {
  //   if (page <= 0) {
  //     return;
  //   }
  //   axios
  //     .get(API, { params: { page: page, language } })

  //     .then((res) => {
  //       console.log(res.data);
  //       setMovies(res.data.results);
  //     })
  //     .catch((error) => console.log(error));
  // };
  useEffect(() => {
    dispatch(getMovies({ API: FEATURED_API, language: contextLang }));
  }, [contextLang, dispatch]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(
        getMovies({ API: SEARCH_API + searchTerm, language: contextLang })
      );
    } else {
      dispatch(getMovies({ API: FEATURED_API, language: contextLang }));
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <LanguageContext.Provider value={{ contextLang, setContextLang }}>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <Header
            handleOnSubmit={handleOnSubmit}
            searchTerm={searchTerm}
            handleOnChange={handleOnChange}
          />
          <Routes>
            <Route path="/" element={<Movies />}>
              {" "}
            </Route>
            <Route path="/favorites" element={<Favorites />}>
              {" "}
            </Route>
            <Route path="/movies/:id" element={<MovieDetails />}>
              {" "}
            </Route>
            <Route path="*" element={<Error />}>
              {" "}
            </Route>
          </Routes>
        </SearchContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
