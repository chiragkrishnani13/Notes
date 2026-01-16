import { useDispatch, useSelector } from "react-redux"
import { useState, useMemo ,useEffect} from 'react'
import { fetchNotes, deleteNote } from '../features/notesslice/notesSlice'
import toast from "react-hot-toast"
import { NavLink } from 'react-router-dom'
import { FaEdit, FaEye, FaTrash, FaCopy, FaSearch } from 'react-icons/fa' 

const Notes = () => {
    const notesFromStore = useSelector(state => state.notes.notes);
    const notes = Array.isArray(notesFromStore) ? notesFromStore : [];
    
    console.log(notes)
    const dispatch = useDispatch()
    const [searchTerm,setSearchTerm] = useState("");
    // console.log(notes)
    useEffect(() => {
      console.log(filterData)
      dispatch(fetchNotes())
    }, [])

    const filterData = useMemo(()=>{
        const q = (searchTerm ?? "").trim().toLowerCase();
        if(!q) return notes;
        return notes.filter((note)=>{
            const title = (note?.tittle ?? '').toLowerCase();
            const content = (note?.content ?? '').toLowerCase();
            return title.includes(q) || content.includes(q) 
        })
    },[notes, searchTerm])

    function handleDelete(noteId){
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        dispatch(deleteNote(noteId))
        toast.success("Note deleted")
    }
  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    if (isNaN(d)) return iso
    return d.toLocaleString()
  }

  return (

    <div className="max-w-4xl mx-auto px-4 mt-8 ">
        <div className="sticky z-20 bg-transparent" >
        <div className="relative">
          <input
            aria-label="Search notes"
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={searchTerm}
            placeholder="Search notes by title or content..."
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
        </div>
      </div>

      {filterData.length === 0 ? (
        <div className="mt-8 text-center text-gray-400">
          {notes.length === 0 ? "No notes yet. Create one from the Home page." : "No matches found."}
        </div>
      ) : (
        <div className=" gap-6 mt-6">
          {filterData.map(note => (
            <article key={note?._id} className="m-5 bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <header className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg text-white">{note?.tittle || 'Untitled'}</h3>
                <time className="text-xs text-gray-400">{formatDate(note?.createdAt)}</time>
              </header>

              <p className="mt-3 text-gray-300 text-sm leading-relaxed max-h-28 overflow-hidden">{note?.content || ''}</p>

              <footer className="mt-4 flex justify-end gap-2">
                <NavLink to={`/?noteId=${note?._id}`} aria-label="Edit note" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 !text-white rounded-md text-sm">
                  <FaEdit /> Edit
                </NavLink>

                <NavLink to={`/notes/${note?._id}`} aria-label="View note" className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 !text-white rounded-md text-sm">
                  <FaEye /> View
                </NavLink>

                <button onClick={() => handleDelete(note?._id)} aria-label="Delete note" className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm">
                  <FaTrash /> Delete
                </button>

                <button onClick={() => {
                  navigator.clipboard?.writeText(note?.content ?? '').then(()=> toast.success("Copied to clipboard")).catch(()=> toast.error("Copy failed"));
                }} aria-label="Copy note" className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm">
                  <FaCopy /> Copy
                </button>
              </footer>
            </article>
          ))}
        </div>
      )}

    </div>
  )
}

export default Notes
