import React from "react";
import Languages from "./Languages";
import Weather from "./Weather";
//obtaining country (init state)
const DetailedCountry = ({ country , setWeatherData, weatherData}) => {
    return (
        <div className={country}>
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>
                    <span >capital </span>
                    {country.capital}
                </p>
                <p>
                    <span>population </span>{" "}
                    {country.population}
                </p>
            </div>
            <div>
                <h2>Languages </h2>
                <Languages country={country} />
            </div>
            <img
                src={country.flag}
                alt={`${country.name}'s flag`}
                height="250"
                width="140"
            />
            <div>
                <Weather city={country.capital} setWeatherData={setWeatherData} weatherData={weatherData}/>
            </div>
        </div>
    );
};

export default DetailedCountry;