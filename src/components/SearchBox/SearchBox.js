import React, { Component } from 'react';
import './SearchBox.css';
import { connect } from "react-redux"
import { fetchMovie}  from "../../redux/actions/actions"

class SearchBox extends Component {
    state = {
        searchLine: ""
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        this.props.dispatch(fetchMovie(this.state.searchLine))
    }
    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}
 
export default connect(mapStateToProps)(SearchBox);