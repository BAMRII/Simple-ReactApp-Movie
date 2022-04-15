import React from 'react'
import{useEffect, useState} from 'react';
import SearchIcon from '../search.svg';
import '../App.css';

const API_KEY = process.env.REACT_APP_API_KEY

function Container() {

const [movieTitle,setMovieTitle]=useState('Batman');  
const [movies,setMovies]=useState([]);  


 const searchMovies= async(title) => {
 const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`);
 const data = await response.json();
 setMovies(data.results);
}

useEffect(() => {
  searchMovies(movieTitle);
},[movieTitle]);
  return (
      <div>
    <div>
    <h1>Movie React App</h1>
    <div className="search">
      <input onChange={(prevMovie)=>{
        prevMovie.target.value.length >0 ?
        setMovieTitle(prevMovie.target.value) : setMovieTitle("avengers")
      }} 
        placeholder="Search for movies"
        />
      <img src={SearchIcon} alt="search"/>
    </div>
    </div>

    <div className="container">
      
      {movies.filter((movie)=>movie.vote_count >1000).map((movie)=>{
        
      return(
        <div className="movie" key={movie.id}>
          <div>
          <p>{movie.release_date}</p> 
          </div>
          <div>         
          <img src={movie.poster_path !==null ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://via.placeholder.com/400'} alt={movie.title} />
          </div>
          <div>
          <h3>{movie.title}</h3>
          </div>
        </div>
      )}
      )}
     </div>
    </div>
  )
}

export default Container