export const ADD_FAVORITE = "ADD_FAVORITE";

export const addFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload,
  };
};
