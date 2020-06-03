
import React from "react";

const Filter = ({ handleFilterChange, chosenCountry }) => {
    return (
        <div>
            find countries{' '}
            <input value={chosenCountry} onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;