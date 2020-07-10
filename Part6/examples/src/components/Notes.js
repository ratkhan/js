import React from 'react'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
    return(
        <li onClick={handleClick}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = (props) => {
    const dispatch = useDispatch()




    return(
        <ul>
            {props.notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>
                        props.toggleImportanceOf(note.id)
                    }
                />
            )}
        </ul>
    )
}
const mapDispatchToProps = {
    toggleImportanceOf,
}
const mapStateToProps = (state) => {
    if ( state.filter === 'ALL') {
        return {
            notes: state.notes
        }
    }

    return state.filter  === 'IMPORTANT'
        ? {notes : state.notes.filter(note => note.important)}
        : {notes : state.notes.filter(note => !note.important)}


}
const ConnectedNotes = connect(
    mapStateToProps,
    mapDispatchToProps)(Notes)

export default ConnectedNotes