import React from "react";

const Person = ({id, name, number, changeNumber}) => {
    return (
        <div>
            <li className={'person'} id={id}>{name} {number} {' '}
                <button onClick={changeNumber}>delete</button>
            </li>
        </div>
    )
}
export default Person