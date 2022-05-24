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


export const fetchMovie=(name)=> {

  return (dispatch) => {
    const key = "5a4341b1"
    return axios.get(`http://www.omdbapi.com?s=${name}&apikey=${key}`)
      .then((res) => dispatch(searchMovie(res.data.Search)))
  }
} 