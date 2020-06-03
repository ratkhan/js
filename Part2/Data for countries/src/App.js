import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [chosenCountry, setChosenCountry] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            setCountries(response.data);
        });
    }, []);

    const handleFilterChange = event => {
        setChosenCountry(event.target.value);
    };

    const countriesToShow = countries.filter(country =>
        country.name.toLowerCase().includes(chosenCountry.toLowerCase())
    );

    return (
        <div >
            <Filter
                chosenCountry={chosenCountry}
                handleFilterChange={handleFilterChange}
            />
            <CountryList countries={countriesToShow} setCountry={setChosenCountry} />
        </div>
    );
};

export default App;