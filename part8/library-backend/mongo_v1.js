const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

mongoose.set('strictQuery', false);

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
      },
      {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
      },
      {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
      },
      { 
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
      },
      { 
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
      },
  
];

Author.insertMany(authors)
  .then(savedAuthors => {
    console.log('Authors saved!');

//save book
const books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: '64b1a941c9160ae6dc693c8d',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
      },
      {
        title: 'Agile software development',
        published: 2002,
        author: '64b1a941c9160ae6dc693c8d',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
      },
      {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: '64b1a941c9160ae6dc693c8e',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
      },
      {
        title: 'Refactoring to patterns',
        published: 2008,
        author: '64b1a941c9160ae6dc693c90',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
      },  
      {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: '64b1a941c9160ae6dc693c91',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
      },
      {
        title: 'Crime and punishment',
        published: 1866,
        author: '64b1a941c9160ae6dc693c8f',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
      },
      {
        title: 'The Demon ',
        published: 1872,
        author: '64b1a941c9160ae6dc693c8f',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
      },  
];
return Book.insertMany(books);
})
.then(savedBooks => {
console.log('Books saved!');

//close
mongoose.connection.close();
})
.catch(error => {
console.error('Error saving data:', error);
mongoose.connection.close();
});
