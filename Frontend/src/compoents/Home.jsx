import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { createNote, updateNote } from '../features/notesslice/notesSlice'
import toast from 'react-hot-toast';


const Home = () => {
  const [tittle, setTittle] = useState('')
  const [value, setValue] = useState('')
  const [params, setparams] = useSearchParams()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes) ?? []

  const noteId = params.get('noteId')

  useEffect(() => {
    if (noteId) {
      const note = notes.find((item) => item._id == noteId)
      if (note) {
        setTittle(note.tittle ?? '')
        setValue(note.content ?? '')
      } else {
        setTittle('')
        setValue('')
      }
    } else {
      setTittle('')
      setValue('')
    }
  }, [noteId, notes])

  function create() {
    const note = {
      tittle: tittle,
      content: value
    }
    if(!tittle.trim() || !value.trim()){
        toast.error("You need to write something in Title and Content")
        return
    }
    if (noteId) {
      dispatch(updateNote({
        id: noteId,
        data:note
      }))
    } else {
      dispatch(createNote(note))
    }

    

    setTittle('')
    setValue('')
    setparams({})
  }



  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <div className="bg-gray-800 border  border-gray-700 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <label className="sr-only" htmlFor="note-title">Title</label>
            <input
              id="note-title"
              className="bg-gray-900 text-gray-100 border border-gray-700 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={tittle}
              placeholder="Title"
              onChange={(e) => setTittle(e.target.value)}
            />
            <div className="mt-1 text-sm text-gray-400 flex justify-between items-center">
            </div>
          </div>

          <div className="flex flex-col items-stretch md:items-end gap-3">
            <button
              onClick={create}
              title="Create or update note"
              className={`px-4 py-2 rounded-2xl font-semibold text-white transition-transform duration-75 `}
            >
              {noteId ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="sr-only" htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={12}
            placeholder="Write your note here…"
            className="bg-gray-900 text-gray-100 border border-gray-700 rounded-2xl mt-0 w-full p-4 min-h-[220px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          />
          <div className="mt-2 flex justify-between items-center text-sm">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
