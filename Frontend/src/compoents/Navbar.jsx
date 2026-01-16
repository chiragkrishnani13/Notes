import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaStickyNote } from 'react-icons/fa'
import { useState } from 'react';
import Modal from 'react-modal'


const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="fixed top-0 left-0 w-full h-[10%] bg-gray-900 text-gray-100 shadow-sm z-30">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaStickyNote className="text-2xl text-blue-400" />
          <span className="font-semibold text-lg">Notes Saver</span>
        </div>

        <div className="flex items-center gap-3">
          <NavLink to="/" end className={({isActive}) => `h-[20%] px-4 flex items-center rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 !text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}`}>
            <FaHome className="inline mr-2 text-current" /> <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/notes" className={({isActive}) => `h-full px-4 flex items-center rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 !text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}`}>
            <FaStickyNote className="inline mr-2 text-current" /> <span className="hidden sm:inline">All Notes</span>
          </NavLink>
          <div>
          
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
