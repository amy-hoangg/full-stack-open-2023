//cai nay no chi can link thoi con cai router t khong biet no vut xo di dau nua
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes, vote }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
          <div>has {anecdote.votes} vote</div>
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </li>
        )
        }
      </ul>
    </div>
  )
export default AnecdoteList
//nen nho la cai nay no can pass tat ca cac blog list 
//nen no se dung map de moi cai no bien thanh li va co link wrap 