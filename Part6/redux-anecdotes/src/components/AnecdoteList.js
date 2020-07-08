import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {notificationChange, setNotification } from "../reducers/notificationReducer";
import { likeAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        } else {
            const filterSearch = state.filter.toString().toLowerCase();
            return state.anecdotes.filter(state => state.content.toString().toLowerCase().includes(filterSearch))
        }
    })

    return (
        <div>
            <h2>Anecdotes</h2>
            <div>{anecdotes.map(anecdote =>
                <Anecdote key = {anecdote.id} anecdote={anecdote} handleClick={() => {
                    dispatch(likeAnecdote(anecdote.id))
                    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))

                    return}} />
            )}
            </div>
        </div>
    )}
export default AnecdoteList;