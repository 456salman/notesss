

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const port = process.env.port || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });


  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const uNote = req.body;
    uNote.id = Math.floor(Math.random() * 5000);
    notes.push(uNote);
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
      res.json(uNote);
  });
  }); 
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
 });  


app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const nNote = notes.filter(note => note.id !== parseInt(req.params.id));

   fs.writeFile('./db/db.json', JSON.stringify(nNote), (err, data) => {
     res.json({msg: 'successfully'});
  });
 });
});

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});






app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});