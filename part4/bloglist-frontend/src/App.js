import { useState, useEffect } from 'react'
import Blog from './components/Blog' //model blog
import blogService from './services/blogs' //cai service thi thuong la response.
import loginService from './services/login'
import Notification from './components/Notification'
import CreateNew from './components/createNew'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setIsSuccess(false)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload() // Reload the page to trigger a re-render
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('create with', newTitle, newAuthor, newUrl)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
    setIsSuccess(true)
    setErrorMessage('a new blog added!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  // Sort blogs by number of likes in descending order
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in
        <button type="submit" onClick={handleLogout}>
        logout
        </button>
      </div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}/>
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} isSuccess={isSuccess}/>
      {user !== null && (
        <>
          {blogDisplay()}
          <Togglable buttonLabel="new blog">
            <CreateNew
              handleCreate = {handleCreate}
              newTitle = {newTitle}
              newAuthor = {newAuthor}
              newUrl = {newUrl}
              handleTitleChange = {({ target }) => setNewTitle(target.value)}
              handleAuthorChange = {({ target }) => setNewAuthor(target.value)}
              handleUrlChange = {({ target }) => setNewUrl(target.value)}
            />
          </Togglable>
        </>
      )}
      {user === null &&
      <Togglable buttonLabel="log in">
        <LoginForm
          handleLogin = {handleLogin}
          username = {username}
          password = {password}
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
        />
      </Togglable>}
    </div>
  )
}

export default App