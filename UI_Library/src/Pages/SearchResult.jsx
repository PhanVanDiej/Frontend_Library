import React from 'react'
import SideBar_Left from '../Components/SideBar_Left'
import '../Styles/Pages/SearchResult.css'
import Header_Main from '../Components/Header_Main'
import BookGrid from '../Components/Book_Grid'
import { useParams } from "react-router-dom";
const SearchResult = () => {
  const {id}=useParams();
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='wrapping-content'>
          <div className='SearchResult-wrapping-content'>
            <SideBar_Left/>
            <BookGrid></BookGrid>
          </div>
      </div>
    </div>
  )
}
export default SearchResult
