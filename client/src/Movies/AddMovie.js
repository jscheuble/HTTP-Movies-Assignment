import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initial = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const AddMovie = props => {
  const [newMovie, setNewMovie] = useState(initial);
  const history = useHistory();

  const handleChange = e => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value
    });
  };

  const handleScore = e => {
    setNewMovie({
      ...newMovie,
      metascore: parseInt(e.target.value)
    });
    console.log(newMovie);
  };

  const handleStars = e => {
    const str = e.target.value;
    setNewMovie({
      ...newMovie,
      stars: str.split(",")
    });
  };

  const addNewMovie = e => {
    e.preventDefault();
    setNewMovie({
      ...newMovie,
      id: Date.now()
    });
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        props.setMovieList(res.data);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <form className="edit-form" onSubmit={addNewMovie}>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        placeholder="title"
        value={newMovie.title}
      />
      <input
        type="text"
        name="director"
        onChange={handleChange}
        placeholder="director"
        value={newMovie.director}
      />
      <input
        type="number"
        name="metascore"
        onChange={handleScore}
        placeholder="metascore"
        value={newMovie.metascore}
      />
      <input
        type="text"
        name="stars"
        onChange={handleStars}
        placeholder="stars"
        value={newMovie.stars}
      />
      <button>add new movie!</button>
    </form>
  );
};

export default AddMovie;
