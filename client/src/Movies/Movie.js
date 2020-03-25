import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movies, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const routeToUpdate = () => {
    history.push(`/update-movie/${match.params.id}`);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => {
        console.log("delete", res);
        const newList = movies.filter(e => {
          return e.id !== Number(match.params.id);
        });
        setMovieList(newList);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save btn" onClick={saveMovie}>
        Save
      </div>
      <div className="update btn" onClick={routeToUpdate}>
        Update
      </div>
      <div className="delete btn" onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
