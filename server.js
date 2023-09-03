const express = require('express');     // Import Express
const fs = require('fs'); // Import 'fs' File System
const path = require('path'); // Import path module for resolving file paths
const { v4: uuidv4 } = require('uuid'); // Helper method for generating unique ids

const app = express();  // Initialize an instance of Express.js
const PORT = process.env.PORT || 3742;  // Set port to either system or default 3001

// Static middleware pointing to the public folder
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// JSON Path
const dbPath = path.join(__dirname, 'Develop', 'db', 'db.json');

// Create Express.js Routes 
app.get('/', (req, res) => {
        console.log("🎉 Party time! Someone's checking out the homepage! ");     // console log message
        // send index.html
        res.sendFile(path.join(__dirname, 'Develop', 'public', 'index.html'));
    });
    
    app.get('/notes', (req, res) => {
        console.log("📝 Woohoo! Someone's about to jot down some genius!");    // console log message
        // send notes.html
        res.sendFile(path.join(__dirname, 'Develop', 'public', 'notes.html'));
    });

// API Routes:

// APP.GET ( Get all notes )
app.get('/api/notes', (req, res) => {
        // Read and parse notes from file
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        // Send notes as JSON
        res.json(notes);
      });
      
      // APP.POST ( Create New Note )
      app.post('/api/notes', (req, res) => {
        // Read and parse existing notes from file
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        // Create new note with unique ID
        const newNote = { ...req.body, id: uuidv4() }; 
        // Add new note to list
        notes.push(newNote);
        // Save updated notes to file
        fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
        // Send new note as JSON
        res.json(newNote);
      });
      
      // DELETE note by id
      app.delete('/api/notes/:id', (req, res) => {
        // Read and parse notes from file
        const notes = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        // Remove note with given ID
        const newNotes = notes.filter(note => note.id !== req.params.id);
        // Save updated Notes to File
        fs.writeFileSync(dbPath, JSON.stringify(newNotes, null, 2));
        // Send updated notes as JSON
        res.json(newNotes);
      });

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

