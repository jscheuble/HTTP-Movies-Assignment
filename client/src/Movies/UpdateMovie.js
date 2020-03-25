import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";

const initial = {
  title: "",
  director: "",
  metascore: ""
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initial);
  const match = useRouteMatch();
  const history = useHistory();

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const movieToUpdate = props.movies.find(
      e => e.id === Number(match.params.id)
    );
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
      .then(res => {
        const newList = props.movies.map(e => {
          if (e.id === Number(match.params.id)) {
            return movie;
          } else {
            return e;
          }
        });
        props.setMovieList(newList);
        console.log(res);
        setMovie(initial);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="edit-form">
      <h2>Update Movie Info</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />
        <button>update info</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
