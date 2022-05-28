import {
  SEARCH_MOVIE
} from "./actions-type"
import axios from "axios"

export function searchMovie(movies) {
  return {
    type: "SEARCH_MOVIE",
    payload: {
      movies: movies
    }
  }
}

export function addToList(id) {
  return {
    type: "ADD_TO_LIST",
    payload: {
      id: id,
    },
  }
}

export function removeFromList(id) {
  return {
    type: "REMOVE_FROM_LIST",
    payload: {
      id: id,
    }
  }
}

export function getMovieInfoToState(movieDetails) {
  return {
    type: "GET_MOVIE_INFO_INTO_STATE",
    payload: {
      movieDetails: movieDetails,
    },
  };
}

export function getMovieInfoByImdbID(movies) {
  return function (dispatch) {
    let movieDetailsArray = [];
    movies.forEach((e) => {
      fetch(`http://www.omdbapi.com/?i=${e}&apikey=bfa19603`)
        .then((res) => res.json())
        .then((data) => {
          movieDetailsArray = [...movieDetailsArray, { ...data }];
          dispatch(getMovieInfoToState(movieDetailsArray));
        });
    });
  };
}



export const fetchMovie=(name)=> {

  return (dispatch) => {
    const key = "5a4341b1"
    return axios.get(`http://www.omdbapi.com?s=${name}&apikey=${key}`)
      .then((res) => dispatch(searchMovie(res.data.Search)))
  }
} 