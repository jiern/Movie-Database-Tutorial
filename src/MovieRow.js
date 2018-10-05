import React from "react";
import $ from "jquery";

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHoliday: ""
    };
  }

  performHolidayCheck(datoen) {
    const urlDate = "https://datazen.katren.ru/calendar/day/" + datoen + "/";
    console.log(urlDate);
    $.ajax({
        url: urlDate,
        success: (searchDate) => {
          const results = searchDate.holiday;
          console.log(results)
          if(results){
            console.log("Det er true")
          this.setState({isHoliday: "Vodka! Det er en russisk helligdag!"})
        }else{
          this.setState({isHoliday: "Niet, ingen russisk helligdag!"})
        }
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })
  }

  render() {
    return (
      <table key={this.props.movie.id}>
        <tbody>
          <tr>
            <td>
              <img alt="bildet til filmen" src={this.props.movie.poster_src} />
            </td>
            <td>
              <h3>{this.props.movie.title}</h3>

              <p className="dato">{this.props.movie.release_date}</p>

              <button
                onClick={(event) => this.performHolidayCheck(
                  this.props.movie.release_date
                )}
              >
                Helligdag?
              </button>

              <p>{this.state.isHoliday}</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MovieRow;
