import React from 'react';
import ReactDOM from 'react-dom'
import noteReducer from "./reducers/noteReducer";
import './App.css';
import { createStore } from 'redux';



const store = createStore(noteReducer);

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})


function App() {
  return (
      <div className="App">
          <ul>
              {store.getState().map(note =>
                <li key = {note.id}>
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
              )}
          </ul>
      </div>
  );
}

export default App;
