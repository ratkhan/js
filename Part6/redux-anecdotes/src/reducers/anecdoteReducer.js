export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecodotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.id;
      const anecdoteToChange = state.find(n => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
      ).sort(function(a, b) {
        return a.votes - b.votes;
      })
    }
    default:
      return state;
  }
}

export default reducer