import React, { Component } from "react";
import "./App.css";
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={};

    this.performSearch("Tomme Tønner");
  }

  performSearch(sok){
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + sok;
    $.ajax({
        url: urlString,
        success: (searchResults) => {
          console.log("fikk daten");
          const results = searchResults.results
          var movieRows = []

          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
            // console.log(movie.poster_path)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)
          })
  
          this.setState({rows: movieRows})
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })
    }

    searchChangeHandler(event) {
      console.log(event.target.value)
      const boundObject = this
      const searchTerm = event.target.value
      boundObject.performSearch(searchTerm)
    }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="icon" width="50" src="image2vector.svg" />
              </td>

              <td>
                <h1>Filmer og Russisk Helligdag</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input className="inputtern" onChange={this.searchChangeHandler.bind(this)} placeholder="Skriv filmen du ønsker" />
        {this.state.rows}
      </div>
    );
  }
}

export default App;
