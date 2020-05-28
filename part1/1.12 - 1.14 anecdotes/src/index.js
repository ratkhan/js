import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

    const handleNextAnecdote = () => {
        const randomValue = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomValue);

    }

    const handleVote = () => {
        const votes = [...vote];
        votes[selected]++;
        setVote(votes);
    }


    const mostVotedAnecdoteIndex = vote.indexOf(Math.max(...vote));

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>

            <p>
                <Button onClick={handleVote} text={'vote'} />
                <Button onClick={handleNextAnecdote} text={'next anecdote'} />
            </p>

            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[mostVotedAnecdoteIndex]}</p>
            <p>has {vote[mostVotedAnecdoteIndex]} votes</p>
        </div>
    )
}

const Button = (props) => (
    <button onClick={props.onClick}>
        {props.text}
    </button>
)



const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project make it later!',
    'The first 90 percent of the code account for the first 90 percent of the development time...The remaining 10 percent of the code account for the other 90 percent of the development time',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand',
    'Premature optimization is the root of all evil',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it'
    ]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)