const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

mongoose.set('strictQuery', false);

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

// Save books
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

Book.insertMany(books)
  .then(savedBooks => {
    console.log('Books saved!');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error saving books:', error);
    mongoose.connection.close();
  });
