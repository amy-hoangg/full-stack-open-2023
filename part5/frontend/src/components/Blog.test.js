import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
// Mock the axios module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
}))


describe('Blog Component', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10
    }
  })

  test('renders blog title and author, but not URL or number of likes by default', () => {
    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Test Blog')
    const authorElement = screen.getByText('John Doe')
    const urlElement = screen.queryByText('https://example.com')
    const likesElement = screen.queryByText('Likes: 10')

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test('shows blog URL and number of likes when the button is clicked', () => {
    render(<Blog blog={blog} />)

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    const urlElement = screen.getByText('https://example.com')
    const likesElement = screen.getByText('Likes: 10')

    expect(urlElement).toBeInTheDocument()
    expect(likesElement).toBeInTheDocument()
  })

  test('calls the event handler twice when the like button is clicked twice', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const viewButton = screen.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
