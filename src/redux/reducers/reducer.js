import {
    SEARCH_MOVIE,
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
} from "../actions/actions-type"


const initialState = {
    movies: [],
    moviesList:[],
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_MOVIE:
            return {
                ...state,
                movies: action.payload.movies
            }
        case ADD_TO_LIST:
            let bol=true
            const movie = state.movies.find((item) => item.imdbID === action.payload.id);
            state.moviesList.forEach((item)=>{
                if(action.payload.id===item.imdbID){
                    bol=false
                }
            })
            const moviesList = [...state.moviesList, { ...movie }];
            if(bol){
                return {
                    ...state,
                    moviesList: moviesList
                }
            }
            else{
                return state
            }
            
        case REMOVE_FROM_LIST:
            const newMoviesList = state.moviesList.filter((item) => item.imdbID !== action.payload.id);
              return { ...state, moviesList: newMoviesList };
        default:
            return state
    }
}

export default reducer