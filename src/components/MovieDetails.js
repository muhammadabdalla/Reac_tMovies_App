import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../context/language";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};
export default function MovieDetails() {
  const [details, setDetails] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const { contextLang } = useContext(LanguageContext);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=fa850c6679d86dbe6ace698462bf066b`,
        { params: { language: contextLang } }
      )
      .then((res) => setDetails(res.data))
      .catch((error) => console.log(error));
  }, [contextLang, params.id]);
  return (
    <>
      <div className="movie" style={{ width: "600px", marginLeft: "300px" }}>
        <img
          src={
            details.poster_path
              ? IMG_API + details.poster_path
              : "https://media.istockphoto.com/photos/popcorn-and-clapperboard-picture-id1191001701?b=1&k=20&m=1191001701&s=170667a&w=0&h=uVqDpnXNtnfbhB-F4sWac_t3oL_YSrDuHeCKdaJGS3U="
          }
          alt={details.title}
        />
        <div className="movie-info">
          <h3>{details.title}</h3>
          <span className={`tag ${setVoteClass(details.vote_average)}`}>
            {details.vote_average}
          </span>
        </div>
        <div className="movie-over">
          <h2>Overview:</h2>
          <p>{details.overview}</p>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
    </>
  );
}
