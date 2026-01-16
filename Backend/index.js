
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT

const connectDB = require('./config/db')
const NotesRouting = require('./Routing/NotesRouting')

app.use(cors())
app.use(express.json())
app.use('/api',NotesRouting)
connectDB()
app.get("/health", (req, res) => {
  res.json({ status: "Backend OK" });
});

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(port)
module.children = app
