import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axios from "axios"

const initialState = {
    notes: [],
    loading: false,
    error: null
}
export const fetchNotes =  createAsyncThunk("notes/fetchNotes", async(_,thunkAPI)=>{
    try{
              console.log(import.meta.env.VITE_BACKEND_URL)

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes`)
        return res.data.notes
    }
    catch(err){
        console.log(err)

       
    }
})
export const createNote = createAsyncThunk("notes/createNote",async(noteData,thunkAPI)=>{
    try{
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notes`,noteData)
        toast.success("Note created")
        return res.data.note
    }
    catch(err){
    const message = err.response?.data?.message || "Something went wrong"
    toast.error(message)
    return thunkAPI.rejectWithValue(message || "Failed to fetch notes")
    }
    
})
export const updateNote = createAsyncThunk("notes/updateNote",async({id,data},thunkAPI)=>{
    try{
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`,data)
        toast.success("Note Updated")
        return res.data.note
    }
    catch(err){
        const message = err.response?.data?.message || "Something went wrong"
        toast.error(message)
        return thunkAPI.rejectWithValue(message || "Failed to fetch notes")
    }
    
})
export const deleteNote = createAsyncThunk("notes/deleteNote",async(id,thunkAPI)=>{
    try{
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${id}`)
        toast.success("Note Delted")
        return id 
    }
    catch(err){
        const message = err.response?.data?.message || "Something went wrong"
        toast.error(message)
        return thunkAPI.rejectWithValue(message || "Failed to fetch notes")
    }
})


export const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
      
    },
    extraReducers: (builder) => {
    builder

      // GET
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false
        state.notes = action.payload
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //  post 
      .addCase(createNote.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false
        state.notes.unshift(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    //   put
      .addCase(updateNote.pending, (state) => {
        state.loading = true
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false
        state.notes = action.payload
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //   
    .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload)
    })

    }
})

export default notesSlice.reducer