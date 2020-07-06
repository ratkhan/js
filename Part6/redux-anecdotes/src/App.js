import React, {useEffect} from 'react'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdotes"
import {initializeAnecodotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        anecdoteService.getAll()
            .then( anecdotes => dispatch(initializeAnecodotes(anecdotes)));
    }, [dispatch]);

    return (
        <div>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />

        </div>
    )
}

export default App