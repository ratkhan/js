import anecdoteService from '../services/anecdotes'

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    console.log(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const likeAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToLike = await anecdoteService.find(id);
    const anecdoteSaved = await anecdoteService.update(id, {...anecdoteToLike, votes : anecdoteToLike.votes + 1});
    dispatch({
      type: 'VOTE',
      data: anecdoteSaved
    })
  }
}




const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data.sort(function(a, b) {
      return a.votes - b.votes;
    })
    case 'VOTE': {
      const id = action.data.id;
      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : action.data
      ).sort(function(a, b) {
        return a.votes - b.votes;
      })
    }
    default:
      return state;
  }
}

export default reducer