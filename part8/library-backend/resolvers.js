const Author =require('./models/author')
const Book = require('./models/book')

let bookCache = null

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments, //bay gio khong the deal voi chinh no ma can deal voi database
      authorCount: async () => Author.collection.countDocuments,
      allBooks: async (root, {author, genre}) => {
        const query = {} //nay object sau se co key author: id, genres: genre
  
          if (author) {
            const authorInDatabase = await Author.findOne({name: author})
            query.author = authorInDatabase.id
          }
          if ( genre ) {
            query.genres = genre
          }
          return Book.find(query).populate('author');
        },
  
      allAuthors: async (root, args, context, query) => {
        const fieldsNames = query.fieldNodes[0].selectionSet.selections.map(f => f.name.value)
        if (fieldsNames.includes('bookCount') ) {
          bookCache = await Book.find({})
        }
        return Author.find({})
      },
  
      me: (root, args, { currentUser }) => {
        return currentUser
      }
    },
  
    Author : {
      bookCount: async (root) => {
        if (bookCache) {
          return bookCache.filter(b => b.author.toString() === root.id).length
        }
        return Book.countDocuments({ author: root.id })
      }
    },
    
    Mutation: {
      addBook: async (root, { title, author, published, genres }, { currentUser }) => {
        //neu chua dang nhap
        if (!currentUser) {
          throw new GraphQLError('Must be signed in', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
        
        let book = new Book({ title, published, genres })
        let authorInDb = await Author.findOne({ name: author })
       
        if (!authorInDb) {
          authorInDb = new Author({ name: author })
          try {
            await await authorInDb.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: { author },
                error
              }
            })
          }
        }
    
        book.author = authorInDb.id
    
        try {
          await book.save()
        } 
        catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: { title, published, genres },
              error: error.errors.title
            }
          })
        }
    
        book = await Book.findById(book.id).populate('author')
        return book
      },
  
      editAuthor: async (root, { name, setBornTo }, {currentUser}) => {
  
        if (!currentUser) {
          throw new GraphQLError('Must be signed in', {
            extensions: { code: 'BAD_USER_INPUT' }
          })
        }
      
  
        let authorToEdit = await Author.findOne({ name: name });
      
        if (authorToEdit) {
          authorToEdit.born = setBornTo;
          try {
            await authorToEdit.save();
          } 
          catch (error) {
            throw new GraphQLError('Updating author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: { name, setBornTo },
                error: error.errors.title
              },
            });
          }
        }
        return authorToEdit;
      },
      
      createUser: async (root, { username, favoriteGenre }) => {
        const user = new User({ username, favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
  
      login: async (root, {username, password}) => {
        const user = await User.findOne({ username: username })
    
        if ( !user || password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    }
  }
  module.exports = resolvers