import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './features/notesslice/notesSlice'
export default configureStore({
  reducer: {
    notes:notesReducer
  },
})