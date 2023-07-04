import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateNew from './createNew'

describe('CreateNew Component', () => {
  test('calls the event handler with the right details when a new blog is created', () => {
    const mockHandleCreate = jest.fn()
    const mockHandleTitleChange = jest.fn()
    const mockHandleAuthorChange = jest.fn()
    const mockHandleUrlChange = jest.fn()

    render(
      <CreateNew
        handleCreate={mockHandleCreate}
        newTitle=""
        newAuthor=""
        newUrl=""
        handleTitleChange={mockHandleTitleChange}
        handleAuthorChange={mockHandleAuthorChange}
        handleUrlChange={mockHandleUrlChange}
      />
    )

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')
    const createButton = screen.getByText('create')

    const newTitle = 'New Blog Title'
    const newAuthor = 'John Doe'
    const newUrl = 'https://example.com'

    fireEvent.change(titleInput, { target: { value: newTitle } })
    fireEvent.change(authorInput, { target: { value: newAuthor } })
    fireEvent.change(urlInput, { target: { value: newUrl } })
    fireEvent.click(createButton)

    expect(mockHandleTitleChange).toHaveBeenCalledWith(expect.any(Object))
    expect(mockHandleTitleChange.mock.calls[0][0].target.value).toBe(newTitle)

    expect(mockHandleAuthorChange).toHaveBeenCalledWith(expect.any(Object))
    expect(mockHandleAuthorChange.mock.calls[0][0].target.value).toBe(newAuthor)

    expect(mockHandleUrlChange).toHaveBeenCalledWith(expect.any(Object))
    expect(mockHandleUrlChange.mock.calls[0][0].target.value).toBe(newUrl)

    expect(mockHandleCreate).toHaveBeenCalledWith(expect.any(Object))
    expect(mockHandleCreate.mock.calls[0][0].preventDefault).toBeDefined()
  })
})
