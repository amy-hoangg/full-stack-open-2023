import AnecdoteForm from './components/AnecdoteFrom';
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter';
import Notification from './components/Notification';
import { useEffect } from 'react'
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {  
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])
  return (
    <div>
      <Notification/>
      <VisibilityFilter/>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  );
};

export default App;
