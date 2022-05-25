import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import {removeFromList} from "../../redux/actions/actions"

class Favorites extends Component {
  state = {
    title: "",
    textLink: '#',
    inputActive: true,
    linkActive: false
  };



  handleInput = (e) => {
    this.setState({title: e.target.value});
  };

  handleSaveList = () => {
    this.setState({
      inputActive: false,
      linkActive: true
    });
    this.saveMovies();
  };


  saveMovies = () => {
    fetch("https://acb-api.algoritmika.org/api/movies/list",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          "title": this.state.title,
          "movies": this.props.moviesList.map(e => e.imdbID)
        })
      })
      .then(res => res.json())
      .then(data => {
        this.setState({textLink: data.id})
      })
  };




  render() {
    return (
      <div className="favorites">
        <input value={this.state.title} onChange={this.handleInput}
              disabled={this.state.inputActive ? null : "disabled"}  className="favorites__name" placeholder="Create list" />
        <ul className="favorites__list">
          {this.props.moviesList.map((item) => {
            return (
              <li className="favorites__list--item" key={item.imdbID}>
                <p className="favorites__list--title">{item.Title} {item.Year}</p>
                <button className="favorites__list--delete" onClick={() => this.props.removeFromList(item.imdbID)}>X</button>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={() => this.handleSaveList()}
                className={`favorites__save ${this.state.linkActive ? "link__none" : null}`}>
          Save List
        </button>
        <br></br>
        <a href={`http://localhost:3000/list/${this.state.textLink}`}
           className={`link__none ${this.state.linkActive ? "link__block" : null}`}
           target="_blank" rel="noreferrer" >Share with friends</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moviesList: state.moviesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromList: (id) => dispatch(removeFromList(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);