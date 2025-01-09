import React, { useEffect, useState } from 'react'
import Header_Main from '../Components/Header_Main'
import { useParams } from "react-router-dom";
import '../Styles/Pages/BookDetail.css'
import BE_ENDPOINT from '../Env/EndPont'; 
import displayImageURL from '../Env/DisplayImage';
import { useNavigate } from "react-router-dom";
import permissionReader from '../Env/PermissionReader';
import ScrollList from '../Components/ScrollList_Book';
import Swal from 'sweetalert2';

const Book_Detail = () => {  
 
  function displayFeature() 
  {
    if(localStorage.getItem("role_user")=="0") 
      {
        return "Thêm vào danh sách muốn mượn"
      } 
      return "Chỉnh sửa"
  } 
  function displayDeleteOrBorrow() 
  {
    if(localStorage.getItem("role_user")=="0") 
      {
        return "Mượn ngay"
      } 
      return "Xoá tựa sách"
  }
  
  
    const bookId= useParams();  
    console.log(bookId.id);
    const [bookDetail, setBookDetail] = useState({}); 
    const [suggestBook, setSuggestBook] = useState([]);
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
        setBookDetail(responseData);
        const listSuggestBook= await fetch(BE_ENDPOINT+"book-titles/get/byBookType/"+responseData.type.id);
        let listSuggestBookData = await listSuggestBook.json(); 
        listSuggestBookData= listSuggestBookData.filter((item)=>{
          return item.id!=responseData.id;
        });
        console.log(listSuggestBookData);
        setSuggestBook(listSuggestBookData);
        
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
          alert("Thêm vào danh sách muốn mượn thất bại");
        } 
        
        
    }
    
    const navigate=useNavigate();
    const handleOnClickBorrowBtn=async ()=>{ 
      console.log("Click");
      if(localStorage.getItem("role_user")!=0) 
      {
        navigate('/edit_book_title/'+bookId.id);
      } 
      else {  
        
        const data = {
          bookTitleId:bookId.id
        }
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
          Swal.fire({
            title:"Thất bại",
            text:"Thêm vào danh sách muốn mượn thất bại",
            icon:"fail"
          })
          return;
        } 
        Swal.fire({
          title:"Thành công",
          text:"Thêm vào danh sách muốn mượn thành công",
          icon:"success"
        })
      
      }
    }
    async function onBorrowOneBook() 
    {
      if(localStorage.getItem("role_user")!=0) 
      {
        Swal.fire({
          title:"Xóa tựa sách?",
          text:"Bạn có chắc muốn xóa tựa sách này?",
          icon:"warning"
        }).then( async (result)=>{
          if(result.isConfirmed) 
          {
            const response = await fetch(BE_ENDPOINT+"librarian/delete_book_title/"+bookId.id,{
              method:"DELETE",
              headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
            });
            if(!response.ok) 
            {
              Swal.fire({
                title:"Thất bại",
                text:"Hiện tại không thể xóa tựa sách do đang có độc giả đặt mượn",
                icon:"fail"
              });
              return;
            } 
            Swal.fire({
              title:"Thành công",
              text:"Xóa tựa sách thành công",
              icon:"success"
            });
            return;
          }
        })
        return;
      }
      const response= await fetch(BE_ENDPOINT+"reader/borrowOneBook/"+bookId.id,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }); 
      if(!response.ok) 
        {
            alert(" Thất bại");
            return;
        } 
        const responseData= await response.json();
        console.log(responseData);
        if(responseData.message=="Not enough"){
        let messageString = "Không đủ sách ";
        for(let i=0;i<responseData.listResponse.length;i++) 
        {
            messageString+=responseData.listResponse[i]+",";
        } 
        messageString+="vui lòng điều chỉnh lại số lượng";
        alert(messageString); 
        return;
        }
        alert("Mượn sách thành công"); 
        navigate("/history");
    }


    async function onMoveToBookPage() 
    {
        
    }
    permissionReader();
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='wrapping-content-detail'>
        <div className='path'>
           <h3 className='title-page'>{bookDetail?.type?.name}</h3>
           <br></br>
        </div>
        <div className='book-detail-container'>
            <div className='request-area'>
                <img className='book-cover' src={displayImageURL(bookDetail?.imageData)} alt={'Book'+bookId.id}></img>
                <div className='request-btn'>
                  <button type='submit' className='btn-border' onClick={(e)=>{ 
                    e.preventDefault();
                    handleOnClickBorrowBtn()}}>
                    <div >
                      <img src={displayImageURL(bookDetail?.imageData)} alt='Bag'></img>
                      <p>{displayFeature()}
                       </p>
                    </div>
                  </button>
                  <button type='submit' className='btn-fill' onClick={(e)=>{
                    e.preventDefault();
                    onBorrowOneBook();
                  }}>
                      { 
                      displayDeleteOrBorrow()
                      }
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
                  <p><span style={{color:"#8F8F8F"}}>Mã sách : </span>{bookDetail.id}</p>
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
        
            <ScrollList products={suggestBook}></ScrollList>
        
        </div>
      </div>
    </div>
  )
}

export default Book_Detail
