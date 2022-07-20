import { useParams } from "react-router-dom"

export const DayDetails = ({weather}) => {
	const params = useParams()


	if (weather[params.id]) {
		return (
			<div className="details-container">
				{
					weather[params.id].map(elem => {
						return (
							<div className="details" key={elem.dt}>
								<p><i className="fa-solid fa-clock"></i>{elem.dt_txt.slice(10, 16)}</p>
								<img src={`http://openweathermap.org/img/w/${elem.weather[0].icon}.png`} alt="sun" />
								<p>{Math.round(elem.main.temp_max - 273)} &#8451; - {Math.round(elem.main.feels_like - 273)} &#8451;</p>
								<p>{elem.weather[0].description}</p>
								<p>wind speed: {elem.wind.speed} meter/sec</p>
							</div>
						)
					})
				}
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
