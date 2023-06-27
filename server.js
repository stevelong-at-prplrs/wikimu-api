
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Define a document schema
const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  parent: String
});

// Define a document model
const Document = mongoose.model('Document', documentSchema);

app.use(express.json());

// Enable CORS middleware
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT');

    next();
});
  
// GET route to fetch the contents of a document by ID
app.get('/documents/:id', async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
  
// PUT route to update the contents of a document
app.put('/documents/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/documents', (req, res) => {
  Document.find({}).then((documents) => {
    res.json(documents);
  });
});

//   // POST route to create a new document
//   app.post('/documents', async (req, res) => {
//     try {
//       const document = new Document(req.body);
//       const savedDocument = await document.save();
//       res.status(201).json(savedDocument);
//     } catch (error) {
//       console.error('Error creating document:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
  
//   // DELETE route to delete a document
//   app.delete('/documents/:id', async (req, res) => {
//     try {
//       const document = await Document.findByIdAndDelete(req.params.id);
//       if (!document) {
//         return res.status(404).json({ error: 'Document not found' });
//       }
//       res.json({ message: 'Document deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting document:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

  // GET route to fetch all documents


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});