import React from "react";
const MovieList = (props) => {
    const Favourite=props.favouriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          style={{ width: "200px" }}
          className="image-container d-flex justify-content-start m-3"
          key={movie.imdbID}
        >
          <img src={movie.Poster} alt="poster"></img>
          <div onClick={()=>props.handleFavouriteClick(movie)}
            className="overlay d-flex align-items-center justify-content-center">
            <Favourite/>
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieList;
