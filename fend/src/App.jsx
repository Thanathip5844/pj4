import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Register from './component/Register'
import Login from './component/Login'
import Admin from './component/Admin'
import AddData from './component/AddData'

export const UseContext = createContext();

function App() {
  const [token, setToken] = useState("");

  return (  
    <BrowserRouter>
      <UseContext.Provider value={{ token, setToken }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/:token' element={<Admin />} />
          {/* <Route path='/adddata/:token' element={<AddData />} /> */}
          <Route path='/adddata' element={<AddData />} />
          <Route path='/adddata/:id' element={<AddData />} />
        </Routes>
      </UseContext.Provider>
    </BrowserRouter>
  )
}

export default App
