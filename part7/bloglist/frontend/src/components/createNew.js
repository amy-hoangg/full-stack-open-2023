const CreateNew = ({
  handleCreate,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div className="create-new">
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
            className="title-input"
          />
        </div>

        <div>
          author:
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
            className="author-input"
          />
        </div>

        <div>
          url:
          <input
            id="url"
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
            className="url-input"
          />
        </div>
        <button type="submit" className="create-button">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
