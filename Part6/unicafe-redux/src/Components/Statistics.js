import React from 'react';

const Statistics = ({store}) => {
    return(
        <div>
            <h1>statistics</h1>
            {  (store.getState().good + store.getState().bad + store.getState().ok) > 0 ?
                <div>
                    <p>good {store.getState().good}</p>
                <p>neutral {store.getState().ok}</p>
                <p>bad {store.getState().bad}</p>
                <p>all {(store.getState().good + store.getState().bad + store.getState().ok)}</p>
                <p>average {store.getState().good + store.getState().bad > 0 ?
                (store.getState().good - store.getState().bad)
                / (store.getState().good + store.getState().bad + store.getState().ok)
                : 0}</p>
                <p>positive {store.getState().good > 0 ?
                (store.getState().good / (store.getState().good + store.getState().bad + store.getState().ok)) * 100
                : 0}%</p>
                </div>
                : <p>No feedback given</p>
            }
        </div>)
}
export default Statistics;