import React from 'react'
import Header from './Components/Header_Register'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/Signup'
import User_Information from './Pages/User_Information'
import HistoryAction from './Pages/HistoryAction'
import Announcement from './Pages/Announcement'
import Header_Main from './Components/Header_Main'
import SearchResult from './Pages/SearchResult'
function App(){
  return (
    <>
     <div className='container'>
          <Routes>
              <Route path='/' element={<Navigate to='login'/>}/>
              <Route path='/login' element={<LoginPage></LoginPage>}/>
              <Route path='/signup' element={<SignupPage></SignupPage>}/>
              <Route path='/home' element={<Home></Home>}/>
              <Route path='/user_information' element={<User_Information></User_Information>}/>
              <Route path='/history' element={<HistoryAction></HistoryAction>}/>
              <Route path='/announcement' element={<Announcement></Announcement>}/>
              <Route path='/search_result/:id' element={<SearchResult></SearchResult>}/>
          </Routes>
     </div>
    </>
  )
}

export default App
