import React from 'react'
import '../Styles/Pages/Home.css'
import Footer from '../Components/Footer'
import Header_Main from '../Components/Header_Main'
import ScrollList from '../Components/ScrollList_Book'
export default function Home(){
    const products = [
        { id: 1, name: "Product 1", image: "" },
        { id: 2, name: "Product 2", image: "" },
        { id: 3, name: "Product 3", image: "" },
        { id: 5, name: "Product 5", image: "" },
        { id: 6, name: "Product 6", image: "" },
        { id: 7, name: "Product 6", image: "" },
        { id: 8, name: "Product 6", image: "" },
        { id: 9, name: "Product 6", image: "" },
        { id: 10, name: "Product 6", image: "" },
        { id: 4, name: "Product 4", image: "" },
      ];
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