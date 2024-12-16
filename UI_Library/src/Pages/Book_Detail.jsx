import React, { useEffect, useState } from 'react'
import Header_Main from '../Components/Header_Main'
import { useParams } from "react-router-dom";
import '../Styles/Pages/BookDetail.css'
import cover from '../assets/Book_Cover/rezero.png'
import bag from '../assets/Icons/bag.png'
import ScrollList from '../Components/ScrollList_Book';
import BE_ENDPOINT from '../Env/EndPont'; 
import displayImageURL from '../Env/DisplayImage';
import { useNavigate } from "react-router-dom";

const Book_Detail = () => {
    const bookId= useParams();  
    console.log(bookId.id);
    const [bookDetail, setBookDetail] = useState({}); 
    useEffect(()=>{
      async function fetchToServer(bookId) 
      { 
        const response= await fetch(BE_ENDPOINT+"book-titles/details/"+bookId);
        if(!response.ok) 
        {
          return;
        }  
        const responseData= await response.json();
        console.log(responseData);
        setBookDetail(responseData)
        
      } 
      fetchToServer(bookId.id);
      console.log("Fetch")
    },[]);
    async function handleAddToCart() 
    {
        const data= {
          bookTitleId:bookId.id
        }; 
        console.log(data);
        const response = await fetch(BE_ENDPOINT+"reader/addToCart",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
          body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
          alert("Them vao gio sach that bai");
        } 
        navigate("/cart");
        
    }
    const suggestBook = [
      {id:0, name:"Product 0", image:""},
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
    ]
    // fetch data tai day
    const remain=3;
    const navigate=useNavigate();
    const handleOnClickBorrowBtn=()=>{
      navigate('/cart');
    }
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='wrapping-content'>
        <div className='path'>
           <h3>{bookDetail?.type?.name}</h3>
           <br></br>
        </div>
        <div className='book-detail-container'>
            <div className='request-area'>
                <img className='book-cover' src={displayImageURL(bookDetail?.imageData)} alt={'Book'+bookId.id}></img>
                <div className='request-btn'>
                  <button type='submit' className='btn-border'>
                    <div onClick={handleAddToCart}>
                      <img src={displayImageURL(bookDetail?.imageData)} alt='Bag'></img>
                      <p>Thêm vào giỏ</p>
                    </div>
                  </button>
                  <button type='submit' className='btn-fill' onClick={handleOnClickBorrowBtn}>
                      Mượn sách
                  </button>
                </div>
                
            </div>
            <div className='book-information'>
                <div className='mark-book'>
                  <h1 className='book-title'>{bookDetail?.name} </h1>
                  <div className='row-defined'>
                    
                    <p><span style={{color:"#A27430"}}>Tác giả :</span>{bookDetail?.author}</p>
                  </div>
                  <div className='row-defined'>
                    <p><span style={{color:"#A27430"}}>Trạng thái :</span>Còn {bookDetail?.amountRemaining} trên kệ</p>
                    <p><span style={{color:"#A27430"}}>Tổng số lượng : </span>{bookDetail?.amount}</p>
                  </div>
                </div>
                <div className='detail-information'>
                  <h3>Thông tin chi tiết</h3>
                  <p><span style={{color:"#8F8F8F"}}>Mã sách : </span>REZ2023428</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Nhà xuất bản : </span>{bookDetail?.nxb}</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Tác giả : </span>{bookDetail?.author}</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Năm xuất bản : </span>{bookDetail?.year}</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Ngôn ngữ : </span>{bookDetail?.language}</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Số trang : </span>{bookDetail?.pageAmount}</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Thể loại : </span>{bookDetail?.type?.name}</p>
                </div>
                <div className='book-summary'>
                  <h3>Mô tả nội dung</h3>
                  <p>{bookDetail?.review}</p>
                </div>
            </div>
        </div>
        <div className='suggest-related-book-scroll'>
            
        </div>
      </div>
    </div>
  )
}

export default Book_Detail
