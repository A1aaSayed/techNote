const notesModel = require('../models/notesModel');

// @desc    Create note
// @rout    POST    /notes
// @access  Private
exports.createNote = async (req, res) => {
    const note = new notesModel({
        title: req.body.title,
        ticket: req.body.ticket,
        content: req.body.content,
    });
    try {
      const newNote = await note.save();
      res.status(201).json({newNote: newNote});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// @desc    Get all notes
// @rout    GET    /notes
// @access  Public
exports.getNotes = async (req, res) => {
    const note = await notesModel.find({});
    res.status(200).json({ NotesNumber: note.length, Notes: note });
}

// @desc    Get note by id
// @rout    GET    /notes/:id
// @access  Public
exports.getNoteById = async (req, res) => {
    const id = req.params.id;
    const note = await notesModel.findById(id);
    
    if (!note) {
        res.status(404).json(`No note for this id ${id}`);
    }
    res.status(200).json({ Note: note });
}

// @desc    Update a note
// @rout    PUT    /notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    const note = await notesModel.findById(id);
    if (!note) {
        res.status(404).json({ Error: `No Note for this id ${id}` });
    }

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();
    res.status(200).send({ Note_has_been_updated: updatedNote });
}

// @desc    Delete a note
// @rout    DELETE    /notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
    const id = req.params.id;
    const note = await notesModel.findByIdAndDelete(id);
    if (!note) {
        req.status(500).json(`No note for this id ${id}`);
    }
    res.status(200).json('The note has been deleted');
}