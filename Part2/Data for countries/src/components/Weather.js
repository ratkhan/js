import React, {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({city}) => {
    const [weatherData, setWeatherData] = useState([{'temperature':0}]);
    const [displayWeather, setDisplayWeather] = useState(false);

    useEffect(() => {
        const api_key = 'secret';
        const request_statement =`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`;
        axios.get(request_statement).then(response => {
            setWeatherData(response.data.current);
            setDisplayWeather(true);
        });
    }, [city]);
    console.log(weatherData)
    return (
        <div>
            {!displayWeather?(
                    <p>Please wait</p>) :
                (
                    <div>
                        <p>temperature {weatherData.temperature}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Weather