import React from "react";
import Statistics from "./Components/Statistics";

const App = ({store}) => {
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }

    const ok = () => {
        store.dispatch({
            type:'OK'
        })
    }

    const bad = () => {
        store.dispatch({
            type:'BAD'
        })
    }

    const zero = () => {
        store.dispatch({
            type:'ZERO'
        })
    }


    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={good}>good</button>
            <button onClick={ok}>neutral</button>
            <button onClick={bad}>bad</button>
            <button onClick={zero}>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>neutral {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
            <Statistics store={store} />
        </div>
    )
}

export default App;