import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))
  
    return (
      <div style={{ marginBottom: 10 }}>
        <h3>{anecdote.content} by {anecdote.author}</h3>
  
        <div>has {anecdote.votes} votes</div>
        <div>for more info <a href='{anecdote.info}'>{anecdote.info}</a></div>
      </div>
    )
  }
  export default Anecdote