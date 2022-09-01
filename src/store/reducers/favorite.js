import { ADD_FAVORITE } from "../actions/favorite";

const INITIAL_VALUE = {
  favorites: [],
};

export default function addFavoriteReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}
