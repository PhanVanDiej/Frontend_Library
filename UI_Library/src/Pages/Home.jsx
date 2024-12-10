import React from 'react'
import '../Styles/Pages/Home.css'
import BooksType_Carousel from '../Components/BooksType_Carousel'
import Footer from '../Components/Footer'
import Header_Main from '../Components/Header_Main'
export default function Home(){
    return (
        <div>
            <Header_Main></Header_Main>
            <div className='introduce-wrapper'>
                <h1 className='welcome-sentence'>SOME SENTENCES GO HERE</h1>
            </div>
            <div className='list-book-type'>
                <h2>CÁC THỂ LOẠI SÁCH</h2>
                <BooksType_Carousel></BooksType_Carousel>
            </div>
            <div className='bottom-background'>
            </div>
            <Footer></Footer>
        </div>
    )
}