import { Link } from "react-router-dom"
import { useMemo } from "react"
import moment from "moment";
export const Days = ({ weather }) => {

  const results = [];
  const weekOfDay = (item) => {
    return moment(item).format('dddd')
  };

  const MemoArr = useMemo(() => {
    for (const item of Object.keys(weather)) {
      results.push(
        <div className="card" key={weather[item][0].dt}>
          <img src={`http://openweathermap.org/img/w/${weather[item][0].weather[0].icon}.png`} alt="sun" />
          <div>{weekOfDay(item)}</div>
          <h3>{Math.floor(weather[item][0].main.temp_max) - 273} &#8451; - {Math.floor(weather[item][0].main.feels_like) - 273} &#8451;</h3>
          <p><Link to={`/Weather-App-React/${item}`}>View Details</Link></p>
        </div>
      )
    }
    return results
  }, [weather])

  if (results) {
    return (
      <div className="container">
        {results.map((elem, index) => {
          return (
            <div key={index}>{elem}</div>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )
  }
}
