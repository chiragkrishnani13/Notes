import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowLeft, FaEdit, FaTrash, FaCopy } from 'react-icons/fa'
import toast from 'react-hot-toast'

const ViewNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notes.notes) ?? []
  const note = notes.find((item) => item._id == id)

  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return isNaN(d) ? iso : d.toLocaleString()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note?.content ?? '')
      toast.success('Copied note content')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDelete = () => {
    if (!window.confirm('Delete this note?')) return
    dispatch(removeFromNotes(note._id))
    toast.success('Note deleted')
    navigate('/notes')
  }

  if (!note) {
    return (
      <div className="max-w-5xl mx-auto p-6 pt-20 text-center h-[100%]">
        <p className="text-gray-400 text-lg mb-4">Note not found.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/notes')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaArrowLeft className="inline mr-2" /> Back to Notes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/notes')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            aria-label="Back to notes"
          >
            <FaArrowLeft /> Back
          </button>

          <button
            onClick={() => navigate(`/?noteId=${note._id}`)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            aria-label="Edit note"
          >
            <FaEdit /> Edit
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            <FaCopy /> Copy
          </button>
          <button onClick={handleDelete} className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <article className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-lg">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{note?.tittle ?? 'Untitled'}</h1>
          <div className="text-sm text-gray-400 mt-1">Created: {formatDate(note?.create_at)}</div>
        </header>

        <div className="mt-6 text-gray-100 leading-7 whitespace-pre-wrap break-words text-base md:text-lg">
          {note?.content || ''}
        </div>
      </article>
    </div>
  )
}

export default ViewNote
