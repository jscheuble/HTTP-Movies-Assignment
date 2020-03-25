import React, { useState } from "react";

const initial = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const AddMovie = () => {
  const [newMovie, setNewMovie] = useState(initial);

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

  return (
    <form>
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
    </form>
  );
};

export default AddMovie;
