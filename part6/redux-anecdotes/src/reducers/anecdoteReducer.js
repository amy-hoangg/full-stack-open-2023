import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const anecdotesAtStart = [
]

const getId = () => 
  (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) //lai con co ca kieu nay co ma lau nay minh khong biet 

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)

    },
    vote(state, action) {
      const id = action.payload.id;
      const newState = state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
      console.log('New State:', newState[1].votes);
      return newState;
    },
    appendAnecdote(state, action) { //why do it exist 
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
});


export const { createAnecdote, appendAnecdote, setAnecdote} = anecdoteSlice.actions
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export default anecdoteSlice.reducer
//the createSLice function name param no define nhung ciai prefix cai ma 
//mot slice la mot man code 
//logic, actions, action creators 

//name:m used as the prefix for the generated action types
//initial state: initial sate value for the slide

//depp freeze thi nghe cai tu la da biet roi dung khong 

/**    vote(state, action) {
      const id = action.payload.id;
      const newState = state.map((anecdote) =>
        anecdote.id === id 
          ? { ...anecdote, votes: anecdote.votes + 1 } 
          : anecdote
      );
      console.log('New State:', newState);
      return newState;
       */
