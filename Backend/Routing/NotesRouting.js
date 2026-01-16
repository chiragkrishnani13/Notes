const express = require('express')
const router = express.Router()
const Note = require('../models/NoteMode')
const {getNotes,createNote,updateNote,deleteNote} = require('../controller/NoteController')

router.get('/notes',getNotes)
router.post('/notes',createNote)
router.put('/notes/:id',updateNote)
router.delete('/notes/:id',deleteNote)

module.exports = router