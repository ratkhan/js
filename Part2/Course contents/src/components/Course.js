import React from 'react'

const Course = ({course}) => {
    const arrayNumberExercises = course.parts.map(part => part.exercises);
    console.log(arrayNumberExercises)
    const arraySum = (a , b) => a + b;
    const sumValue = arrayNumberExercises.reduce(arraySum);
    console.log(sumValue);
    return (
        <div>
            <h1 id={course.id}> {course.name} </h1>
            <ul>
                {course.parts.map(part => <li id={part.id}>{part.name} {part.exercises}</li>)}
                <b>total of {sumValue} exercises</b>
            </ul>
        </div>
    )
}

export default Course
