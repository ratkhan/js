import React from "react";
import Person from "./Person";
const PersonDisplay = ({peopleFiltered, changeNumber}) => {
    return peopleFiltered.map(person =>
        <Person id={person.id} name={person.name} number={person.number} changeNumber={() => changeNumber(person.id)} />)
}

export default PersonDisplay