import { useField } from "../hooks"
import { useNavigate } from "react-router-dom"

const CreateNew = ({ notifyWith, addNew }) => {
    const author = useField('text')
    const content = useField('text')
    const info = useField('text')

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        //duung ham notify
        notifyWith(`A new anecdote ${content.value} created`)
        navigate('/')
        //dung ham navigate 
    }
  
    const handleReset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...content.props}  />
          </div>
          <div>
            author
            <input name='author' {...author.props}  />
          </div>
          <div>
            url for more info
            <input name='info' {...info.props} />
          </div>
          <button>create</button>
        </form>
        <button onClick={handleReset} >reset</button>
      </div>
    )
  }

  export default CreateNew
