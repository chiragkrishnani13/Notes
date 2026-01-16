import { useState } from 'react'
import './App.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Navbar from './compoents/Navbar'
import Home from './compoents/Home'
import Notes from './compoents/Notes'
import ViewNote from './compoents/viewNote'
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#161616] to-[#0f0f0f] !text-white">
    <Navbar />
    <main className="max-w-7xl mx-auto px-6 py-10">
      {children}
    </main>
  </div>
)
const router = createBrowserRouter([
  {
    path:'/',
    element:
    <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:'/notes',
    element:
    <div>
      <Navbar/>
      <Notes/>

    </div>
  },
  {
    path:'/notes/:id',
    element:
    <div> 
      <Navbar/>
      <ViewNote/>
    </div>
  }
])

function App() {
  

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
