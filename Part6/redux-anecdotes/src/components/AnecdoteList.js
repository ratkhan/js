import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {notificationChange} from "../reducers/notificationReducer";

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

    const vote = (id) => {
        return {
            type:'VOTE',
            id: id
        }
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <div>{anecdotes.map(anecdote =>
               <Anecdote key = {anecdote.id} anecdote={anecdote} handleClick={() => {
                   dispatch(vote(anecdote.id))
                   dispatch(notificationChange("voted"))
                   setTimeout(() => {
                       dispatch(notificationChange(''));
                   }, 5000);

               return}} />
            )}
            </div>
        </div>
    )}
export default AnecdoteList;