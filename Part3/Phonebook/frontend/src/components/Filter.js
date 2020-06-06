import React from "react";

const Filter = ({searchValue, handleFilter}) => {
    return (
        <form>
            <div>
                filter shown with
                <input value = {searchValue}
                       onChange={handleFilter}/>
            </div>
        </form>
    )
}

export default Filter