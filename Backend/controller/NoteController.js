
const Note = require('../models/NoteMode')

const getNotes = async (req,res)=>{
     try{
        const notes = await Note.find()
        if(!notes || notes.length == 0){
            return res.status(200).json({
                success:true,
                notes: []
            })
        }
        return res.status(200).json({
            success:true,
            notes:notes
        })
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
const createNote = async (req,res)=>{
    try{
        const tittle =  req.body.tittle?.trim()
        const content =  req.body.content?.trim()
        const notes = await Note.find()
        const isvalidTittle = await Note.findOne({tittle})
        if (!tittle || !content) {
            return res.status(400).json({ message: "Fields cannot be empty" })
        }
        else if(isvalidTittle){
            return res.status(400).json({ message: "Tittle Already Exist" })
            
        }
        else{
            const newNote = new Note({tittle,content})
            await newNote.save()
            return res.status(200).json({
                success:true,
                note:newNote
            })
        }

    }
    catch(err){
        
        console.log("CREATE NOTE ERROR 👉", err)

        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
const updateNote = async (req,res)=>{
    try{
        const tittle =  req.body.tittle?.trim()
        const content =  req.body.content?.trim()
        const {id} = req.params;
        const notes = await Note.find()
        const note = notes.filter((item)=> item._id == id)
        const isvalidTittle =  notes.filter((elem)=>elem.tittle == tittle && elem._id != id)
        console.log(isvalidTittle)
        if(note.length == 0){
            return res.status(400).json({
                message:"Note is Not Available"
            })
        }
        else if(!tittle || !content){
            return res.status(400).json({ message: "Fields cannot be empty" })
        }
        else if(isvalidTittle.length != 0){
            return res.status(400).json({ message: "Tittle Already Exist" })
        }
        else{
            const updatedNote = await Note.findByIdAndUpdate(id,{tittle,content},{new:true})
            return res.status(200).json({
                success:true,
                note:updatedNote
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Internal Server Error"
        })
    }
}
const deleteNote = async (req,res)=>{
    try{
        const {id} = req.params
        const notes = await Note.find()
        const note = notes.filter((item)=> item._id == id)
        if(note.length == 0){
            return res.status(400).json({
                message:"Note is Not Available"
            })
        }
        else{
            const deleteNote = await Note.findByIdAndDelete(id)
            return res.status(200).json({
                success:true,
                note:deleteNote
            })
        }

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Internal Server Error"
        })
    }
}
module.exports = {getNotes,createNote,updateNote,deleteNote}