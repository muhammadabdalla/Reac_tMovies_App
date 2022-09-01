import React from "react";
import { useSelector } from "react-redux";

import Movie from "./Movie";

export default function Favorites(props) {
  const movies = useSelector((state) => state.favorites.favorites);

  return (
    <>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}
