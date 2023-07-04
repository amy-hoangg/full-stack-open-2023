import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserForBlog = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('loggedBlogappUser'))

        console.log('Fetched user:', storedUser)
        // Do something with the user data
        setUser(storedUser)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUserForBlog()
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleToggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes+1 }
      await blogService.update(blog.id, updatedBlog)

      // Update the blogs state with the updated blog
      const updatedBlogs = blogs
        .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      setBlogs(updatedBlogs)
    }
    catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmed) {
      return
    }

    try {
      await blogService.remove(blog.id)

      // Update the blogs state with the updated blog
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={handleToggleDetails} className="toggle-button">
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>

      {showDetails && (
        <div className="details">
          <div className="url">{blog.url}</div>
          <div className="likes">
            Likes: {blog.likes}
            <button onClick={handleLike} className="like-button">
              Like
            </button>
          </div>
          {user && <div className="user">{user.name}</div>}
          <div>
            <button onClick={handleDelete} className="delete-button">
              remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
