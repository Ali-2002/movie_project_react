import React, { Component } from 'react';
import './MovieItem.css';
import { connect} from "react-redux"
import {addToList} from "../../redux/actions/actions"

class MovieItem extends Component {
    render() {
        const { Title, Year, Poster,imdbID,addMovie,disabled } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={() => addMovie(imdbID)} disabled={disabled}>Add to the list</button>
                </div>
            </article>
        );
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
      addMovie: (id) => dispatch(addToList(id)),
    };
  };
  
export default connect(null, mapDispatchToProps)(MovieItem);
  