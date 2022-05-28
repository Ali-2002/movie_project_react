import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./ListPage.css";

class ListPage extends Component {
  state = {
    movies: [],
    title: "",
  };
  componentDidMount() {
    const apiKey = "5a4341b1";
    const id = this.props.match.params.id;
    console.log(id);
    // TODO: запрос к сервер на получение списка
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ title: data.title });
        data.movies.forEach((elem) => {
          fetch(`http://www.omdbapi.com/?i=${elem}&apikey=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
              this.setState({ movies: [...this.state.movies, data] });
            });
        });
      });
    // TODO: запросы к серверу по всем imdbID
  }
  render() {
    return (
      <div>
        <Header />
        <div className="list-page">
          <h1 className="list-page__title">{this.state.title}</h1>
          <ul className="main_info_container">
            {this.state.movies.map((item) => {
              return (
                <li key={item.imdbID} className="list-page__single-movie">
                  <img
                    src={item.Poster}
                    className="single-movie__poster"
                    alt={item.Title}
                  />
                  <div className="info">
                    <h3 className="movie-item__title">{item.Title}</h3>
                    <h4 className="movie-item__about">About film:</h4>
                    <div className="list-page__details">
                      <div className="list-page__details-title">Year:</div>
                      <div className="list-page__details-value">
                        {item.Year}
                      </div>
                    </div>
                    <div className="list-page__details">
                      <div className="list-page__details-title">Country:</div>
                      <div className="list-page__details-value">
                        {item.Country}
                      </div>
                    </div>
                    <div className="list-page__details">
                      <div className="list-page__details-title">Genre</div>
                      <div className="list-page__details-value">
                        {item.Genre}
                      </div>
                    </div>
                    <div className="list-page__details-value">
                      <ul className="movie-item__info-list">
                        <li id="movie-item__info-item">
                          <button className="movie-item__add-button link-imdb">
                            <a
                              href={`https://www.imdb.com/title/${item.imdbID}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="list-page__link-imdb"
                            >
                              Watch more on IMDB
                            </a>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListPage;
