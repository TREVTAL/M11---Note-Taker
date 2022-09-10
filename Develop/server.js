const express = require('express');
const path = require('path');
const uuid = require('./public/assets/helpers/uuid');
const db = require('./db/db.json');
const PORT = 3001 ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

//Publish index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Publish notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//POST request for save btn
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring items in req.body
    const { title, text } = req.body;
  
    // If all properties are present
    if (title && text ) {
      // Variable for the object to save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });












app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

