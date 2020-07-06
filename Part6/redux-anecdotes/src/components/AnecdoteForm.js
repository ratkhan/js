import React from 'react'
import {createAnecdote} from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'
import {notificationChange} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault();
        if (event.target.anecdote.value) {
            const content = event.target.anecdote.value;
            event.target.anecdote.value = '';
            const newAnecdote = await anecdoteService.createNew(content);
            dispatch(createAnecdote(newAnecdote));
            dispatch(notificationChange("added new anecdote"))
            setTimeout( () => {
                dispatch(notificationChange(''));
            }, 5000);
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>)

}

export default AnecdoteForm;