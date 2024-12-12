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
import Book_Detail from './Pages/Book_Detail'
import BookBorrowingSlipList from './Pages/BookBorrowingSlipList'
import RegisterNewBookTitleForm from './Pages/RegisterNewBookTitle'
import RegisterNewBookTypeForm from './Pages/RegisterNewBookType'
import EditBookTitleForm from './Pages/EditBookTitle'
import EditBookTypeForm from './Pages/EditBookType'
import BuyBookForm from './Pages/BuyBook'
import SellBookForm from './Pages/SellBook'
import ReaderManagement from './Pages/ReaderManagement'
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
              <Route path='/book_detail/:id' element={<Book_Detail></Book_Detail>}/> 
              <Route path="/book_borrowing_slip_list" element={<BookBorrowingSlipList></BookBorrowingSlipList>}/> 
              <Route path="/register_book_title" element={<RegisterNewBookTitleForm></RegisterNewBookTitleForm>}/>
              <Route path="/register_book_type" element={<RegisterNewBookTypeForm></RegisterNewBookTypeForm>}/>
              <Route path="/edit_book_title/:id" element={<EditBookTitleForm></EditBookTitleForm>}/> 
              <Route path="/edit_book_type/:id" element={<EditBookTypeForm></EditBookTypeForm>}/> 
              <Route path="/buy_book" element={<BuyBookForm></BuyBookForm>}/> 
              <Route path="/sell_book" element={<SellBookForm></SellBookForm>}/>
              <Route path="/reader_management" element={<ReaderManagement></ReaderManagement>}/>
          </Routes>
     </div>
    </>
  )
}

export default App
