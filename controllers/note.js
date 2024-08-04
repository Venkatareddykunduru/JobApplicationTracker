const Note = require('../models/note');
const JobApplication = require('../models/jobapplication');

exports.addNote = async (req, res) => {
    try {
        const jobApplicationId = parseInt(req.params.id,10);
        const { content } = req.body;

        const jobApplication = await JobApplication.findByPk(jobApplicationId);
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const note = await jobApplication.createNote({ content });
        res.status(201).json(note);
    } catch (error) {
        console.log('Error adding note:', error);
        res.status(500).json({ error: 'Failed to add note' });
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const jobApplicationId = parseInt(req.params.id,10);

        const jobApplication = await JobApplication.findByPk(jobApplicationId);
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const notes = await jobApplication.getNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.log('Error getting notes:', error);
        res.status(500).json({ error: 'Failed to get notes' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const noteId = parseInt(req.params.id,10);

        const note = await Note.findByPk(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.destroy();
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.log('Error deleting note:', error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const noteId = parseInt(req.params.id,10);
        const { content } = req.body;

        const note = await Note.findByPk(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.content = content;
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        console.log('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
};
