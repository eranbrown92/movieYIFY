import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import "./styles.css";

function App() {
  const [movies, setMovies] = useState([]);

  const hook = () => {
    axios("https://yts.lt/api/v2/list_movies.json")
      .then(res => setMovies(res.data.data.movies))
      .catch(e => console.log(e));
  };

  useEffect(hook, []);

  const renderMovies = movies.map(movie => (
    <div key={movie.id}>
      <p>{movie.title_long}</p>
      <ul>
        <li>Rated: {movie.mpa_rating ? movie.mpa_rating : "No rating"}</li>
        <li>Rating: {movie.rating}</li>
        <li>Runtime: {movie.runtime} minutes</li>
      </ul>
      <img src={movie.medium_cover_image} alt="movie" />
      <p>{movie.summary}</p>
      <hr />
    </div>
  ));

  return (
    <div className="App">
      <h1>Movies</h1>
      <h2>There are {movies.length} movies</h2>
      {renderMovies}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
