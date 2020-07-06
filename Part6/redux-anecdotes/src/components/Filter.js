import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {filterChange} from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store)
    const handleChange = (event) => {
        event.preventDefault();
        const filterValue = event.target.value;
        dispatch(filterChange(filterValue))
        console.log(store)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter