import React from 'react'
import '../Styles/Pages/Home.css'
import Footer from '../Components/Footer'
<<<<<<< HEAD
import Header_Main from '../Components/Header_Main'
import ScrollList from '../Components/ScrollList_Book'
export default function Home(){
    const products = [
        { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
        { id: 5, name: "Product 5", image: "https://via.placeholder.com/150" },
        { id: 6, name: "Product 6", image: "https://via.placeholder.com/150" },
        { id: 7, name: "Product 6", image: "https://via.placeholder.com/150" },
        { id: 8, name: "Product 6", image: "https://via.placeholder.com/150" },
        { id: 9, name: "Product 6", image: "https://via.placeholder.com/150" },
        { id: 10, name: "Product 6", image: "https://via.placeholder.com/150" },
      ];
=======
export default  function Home(){
>>>>>>> FetchToServer
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