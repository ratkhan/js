import React from 'react'
import {createAnecdote} from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'
import {notificationChange} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault();
        if (event.target.anecdote.value) {
            const content = event.target.anecdote.value;
            event.target.anecdote.value = '';
            dispatch(createAnecdote(content));
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