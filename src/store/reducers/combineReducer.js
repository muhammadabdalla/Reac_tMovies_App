import { combineReducers } from "redux";
import addFavoriteReducer from "./favorite";
import moviesReducer from "./movies";

export default combineReducers({
  favorites: addFavoriteReducer,
  movies: moviesReducer,
});
