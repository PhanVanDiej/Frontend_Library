import React from 'react'
import SideBar_Left from '../Components/SideBar_Left'
import '../Styles/Pages/SearchResult.css'
import Header_Main from '../Components/Header_Main'
import BookGrid from '../Components/Book_Grid'
import { useParams } from "react-router-dom";
import permissionReader from '../Env/PermissionReader'
const SearchResult = () => {
  const {id}=useParams();
  permissionReader();
  return (
    <div className='wrapping-content'>
        <Header_Main></Header_Main>
        <div className='SearchResult-wrapping-content'>
          <SideBar_Left/>
          <BookGrid id={id}></BookGrid>
        </div>
    </div>
    
  )
}
export default SearchResult
