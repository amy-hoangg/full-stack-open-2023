import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

import { useNotification, useInitialization, useClearUser } from './hooks/index'

import { SmallButton, Page, Navigation } from './components/styled'

const App = () => {

  const blogFormRef = useRef()
  const stateInitializer = useInitialization()
  const notifyWith = useNotification()

  const clearUser = useClearUser()//minh khong the dung truc tiep ma phai tao ra mot cai instance cua n

  const user = useSelector(({ user }) => user)

  //co nghia la gio bat dau thang code thi minh goi ham nay luon
  useEffect(() => {
    stateInitializer()
  }, [])

  const logout = async () => {
    clearUser() //day la ham ma minh can implement 
    notifyWith('logged out')
  }

  //day la mot truong hop return 
  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    //the span de apply style 
    //tiep theo la nhung cai link nhung ma minh chua biet no den element g
    <Page>

      <Navigation>
        <span style={padding}><strong>Blog app</strong></span>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>{user.name} logged in</span>
        <span style={padding}>
          <SmallButton onClick={logout}>logout</SmallButton>
        </span>
      </Navigation>

      <Notification />

      <Routes>
        <Route path="/users" element={ <Users />}></Route>
        <Route path="/users/:id" element={ <User />}></Route>
        <Route path="/blogs/:id" element={ <Blog />}></Route>
        <Route path="/" element={ <Blogs />}></Route>
      </Routes>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog hideMe={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
    </Page>
  )
}

export default App