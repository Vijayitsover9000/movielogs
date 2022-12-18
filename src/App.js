// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import Heading from "./components/Heading";
import SearchBar from "./components/SearchBar";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourite";

function App() {
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieList = () => {
    const getMov = async () => {
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=53679964`;
      const response = await fetch(url);

      const respJson = await response.json();
      if (respJson.Search) setList(respJson.Search);
    };
    getMov();
  };

  const addToFav = (movie)=>{
    const newfav = [...favourites,movie];

    setFavourites(newfav);
    saveToLocalStorage(newfav);
  };
  const removeFromFav = (movie)=>{
    const newfav = favourites.filter((mov)=>mov.imdbID!==movie.imdbID);
    setFavourites(newfav);
    saveToLocalStorage(newfav);
  };
  useEffect(getMovieList, [searchValue]);
  useEffect( ()=>{
    const FavMovieFromStore = JSON.parse(localStorage.getItem('fav-local-storage-movie'));
    setFavourites(FavMovieFromStore);
  },[]);

  const saveToLocalStorage = (items)=>{
    localStorage.setItem('fav-local-storage-movie',JSON.stringify(items));
  }
  return (
    <div className="container-fluid App">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading title="Movies" />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList
          movies={list}
          favouriteComponent={AddFavourite}
          handleFavouriteClick={addToFav}
        />
      </div>
      <div className="row">
        <Heading title="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          favouriteComponent={RemoveFavourite}
          handleFavouriteClick={removeFromFav}
        />
      </div>
    </div>
  );
}

export default App;
