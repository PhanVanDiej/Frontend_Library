import React, { useEffect, useState } from 'react'
import '../Styles/Pages/Home.css'
import Footer from '../Components/Footer'
import Header_Main from '../Components/Header_Main'
import ScrollList from '../Components/ScrollList_Book'
import BE_ENDPOINT from '../Env/EndPont'
export default function Home(){ 
    const [products, setProducts] = useState([]);
   async function fetchBookType() 
   { 
        const response= await fetch(BE_ENDPOINT+"book-types"); 
        
        const responseData= await response.json();
        setProducts(responseData);
   } 
   useEffect(()=>{ 
    fetchBookType();
   },[])
    return (
        <div>
            <Header_Main></Header_Main>
            <div className='introduce-wrapper'>
                <h1 className='welcome-sentence'>SOME SENTENCES GO HERE</h1>
            </div>
            <div className='list-book-type'>
                <h2>CÁC THỂ LOẠI SÁCH</h2>
                <ScrollList products={products}></ScrollList>
            </div>
            <div className='bottom-background'>
            </div>
            <Footer></Footer>
        </div>
    )
}