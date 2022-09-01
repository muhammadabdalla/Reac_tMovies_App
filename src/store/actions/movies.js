import axios from "axios";
import { favorites } from "../../components/Movie";

export const GET_MOVIES = "GET_MOVIES";

const getMovies =
  ({ API, page, language }) =>
  (dispatch) => {
    if (page <= 0) {
      return;
    }

    return axios
      .get(API, { params: { page: page, language } })
      .then((res) => res.data.results.map((obj) => ({ ...obj, active: false })))
      .then((res) => {
        console.log(favorites.length);
        return res.map((movie) => {
          for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === movie.id) {
              movie.active = true;
            }
          }
          return movie;
        });
      })
      .then((res) =>
        dispatch({
          type: GET_MOVIES,
          payload: res,
        })
      )
      .catch((err) => console.log(err));
  };

export default getMovies;
