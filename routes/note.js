const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const noteController = require('../controllers/note');

router.post('/addnote/:id', authenticate, noteController.addNote);
router.get('/getnotes/:id', authenticate, noteController.getAllNotes);
router.delete('/deletenote/:id', authenticate, noteController.deleteNote);
router.put('/updatenote/:id', authenticate, noteController.updateNote);

module.exports = router;