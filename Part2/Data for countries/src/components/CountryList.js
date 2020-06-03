import React from "react";
import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

const CountryList = ({ countries, setCountry, setWeatherData, weatherData}) => {

    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else if (countries.length === 1) {
        return (
            <DetailedCountry country={countries[0]} setWeatherData={setWeatherData} weatherData={weatherData}/>
        );
    } else if (countries.length > 1) {
        return countries.map(country => (
            <Country
                key={country.name}
                country={country}
                setCountry={setCountry}
            />
        ));
    } else {
        return <div>No countries match your search.</div>;
    }
};

export default CountryList;