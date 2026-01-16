const {Schema,model} = require('mongoose')
const noteSchema = new Schema({
    tittle:{
        type:String,
        required:true,
        maxlength:50,
        match: /^(?=.*\S)[\s\S]{1,200}$/
    },
    content:{
        type:String,
        required:true,
        match:/^(?=.*\S)[\s\S]{1,10000}$/
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
})
const NoteModel = model("Notes",noteSchema)
module.exports = NoteModel