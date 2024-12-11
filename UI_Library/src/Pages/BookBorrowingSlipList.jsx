import React, { useState, useEffect } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import BookBorrowingSlip from "../Components/BookBorrowingSlip";

function BookBorrowingSlipList() 
{
    const [borrowCard, setBorrowCard] = useState([]);
    
    useEffect(()=>{
        async function fetchToServer() 
        {
            console.log(localStorage.getItem("token"));
            const borrowCardResponse= await fetch(BE_ENDPOINT+"librarian/getAllBorrowing",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!borrowCardResponse.ok) 
            {
                return;
            }
            const borrowCardData = await borrowCardResponse.json();
            console.log(borrowCardData); 
            setBorrowCard(borrowCardData); 
            
        }
        fetchToServer();
    },[])
    return (
        <div>
            <Header_Main></Header_Main> 
            <div>
                { 
                    
                    borrowCard.map((item)=>{
                         return <BookBorrowingSlip bookBorrowingDetail={item}></BookBorrowingSlip>
                    })
                }
            </div>
        </div>
    )
} 
export default BookBorrowingSlipList;
