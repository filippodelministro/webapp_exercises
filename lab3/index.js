const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const filmDao = require('./dao-films'); // module for accessing the films table in the DB

const app = express();
app.use(morgan('dev'));
app.use(express.json());


/*** Films APIs ***/

// 1. Retrieve the list of all the available films.
// GET /api/films
// This route also handles "filter=?" (optional) query parameter, accessed via  req.query.filter
app.get('/api/films', 
  (req, res) => {
    // get films that match optional filter in the query
    filmDao.listFilms()
      .then(films => res.json(films))
      .catch((err) => res.status(500).json(err)); // always return a json and an error message
  }
);



// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
