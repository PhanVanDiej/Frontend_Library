import React from 'react'
import Header from './Components/Header_Register'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import LoginPage from './Pages/Login'
import SignupPage from './Pages/Signup'
import User_Information from './Pages/User_Information'
import HistoryAction from './Pages/HistoryAction'
import Announcement from './Pages/Announcement'
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
import LibrarianInformation from './Pages/LibrarianManagement'
import CreateLibrarian from './Pages/CreateLibrarianAccount'
import Cart from './Pages/Cart'
import AllotPage from './Pages/Allot'
import WorkDateTable from './Pages/LibrarianWork'
import Borrow_Slip from './Pages/Borrow_Slip'
import BookManagementPage from './Pages/BookManagement'
import PenaltyPage from './Pages/PenaltyPage'
import BuyBookHistoryPage from './Pages/BuyBookHistory'
import SellBookBillPage from './Pages/SellBookBillHistory'
import ChangeNormalInfo from './Pages/ChangeNormalInfo'
import EditEmail from './Pages/EditEmail'
import BorrowingDetailPage from './Pages/BorrowingDetailPage'
import RenewalRequestPage from './Pages/RenewalRequest'
import BorrowOfflinePage from './Pages/BorrowingOffline'
import PenaltyList from './Pages/PenaltyListPage'
import ForgetPassword from './Pages/ForgetPassword'
import RegulationPage from './Pages/Regulation'
import UpdateRegulationPage from './Pages/UpdateRegulation'
import PenaltyHistoryPage from './Pages/PenaltyHistoryPage'
import CreatePenalty from './Pages/CreatePenaltyPage'
import BookTypeManagement from './Pages/BookTypeManagement'
function App(){
  
  return (
    <>
     <div className='container'>
          <Routes>
              <Route path='/' element={<Navigate to='/login'/>}/>
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
              <Route path="/librarian_management" element={<LibrarianInformation></LibrarianInformation>}/> 
              <Route path='/create_librarian' element={<CreateLibrarian></CreateLibrarian>}/>
              <Route path='/book_detail/:id' element={<Book_Detail></Book_Detail>}/>
              <Route path='/cart' element={<Cart></Cart>}/> 
              <Route path="/allot" element={<AllotPage></AllotPage>}/>
              <Route path="/librarian_work_day" element={<WorkDateTable></WorkDateTable>}/>  
              <Route path="/borrow_slip" element={<Borrow_Slip></Borrow_Slip>}/> 
              <Route path="/book_management" element={<BookManagementPage></BookManagementPage>}/>
              <Route path="/penalty/:id" element={<PenaltyPage></PenaltyPage>}/> 
              <Route path="/buy_book_history" element={<BuyBookHistoryPage></BuyBookHistoryPage>}/> 
              <Route path="/sell_book_history" element={<SellBookBillPage></SellBookBillPage>}/> 
              <Route path="/edit_normal_info" element={<ChangeNormalInfo></ChangeNormalInfo>}/> 
              <Route path="/edit_email" element={<EditEmail></EditEmail>}/> 
              <Route path="/all_borrow_detail" element={<BorrowingDetailPage></BorrowingDetailPage>}/> 
              <Route path="/renewal_request" element={<RenewalRequestPage></RenewalRequestPage>}/> 
              <Route path="/borrow_offline" element={<BorrowOfflinePage></BorrowOfflinePage>}/>
              <Route path="/penalty_list" element={<PenaltyList></PenaltyList>}/> 
              <Route path="/forgetPassword" element={<ForgetPassword></ForgetPassword>}/> 
              <Route path="/regulation" element={<RegulationPage></RegulationPage>}/>
              <Route path="/update_regulation" element={<UpdateRegulationPage></UpdateRegulationPage>}/> 
              <Route path="/penalty_history" element={<PenaltyHistoryPage></PenaltyHistoryPage>}/>  
              <Route path="/book_type_management" element={<BookTypeManagement></BookTypeManagement>}/>
              <Route path="/create_penalty" element={<CreatePenalty></CreatePenalty>}/> 
              <Route path='/borrow_offline' element={<BorrowOfflinePage></BorrowOfflinePage>}/>
              
          </Routes>
     </div>
    </>
  )
}

export default App
