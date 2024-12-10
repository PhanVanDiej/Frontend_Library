import React from 'react'
import SideBar_Left from '../Components/SideBar_Left'
import '../Styles/Pages/SearchResult.css'
import Header_Main from '../Components/Header_Main'
import BookGrid from '../Components/Book_Grid'
const SearchResult = () => {
  return (
    <div className='wrapping-content'>
        <Header_Main></Header_Main>
        <div className='SearchResult-wrapping-content'>
          <SideBar_Left/>
          <BookGrid></BookGrid>
        </div>
    </div>
    
  )
}
export default SearchResult
