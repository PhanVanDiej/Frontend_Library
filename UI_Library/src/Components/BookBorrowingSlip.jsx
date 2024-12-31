import React from "react"; 
import Header_Main from "./Header_Main";
function BookBorrowingSlip({bookBorrowingDetail}) 
{
    return (
        <div>
            <p>Mã sách: {bookBorrowingDetail?.bookResponse?.id}</p> 
            <p>Ngày mượn: {bookBorrowingDetail?.service?.implementDate}</p>
            <p>Ngày trả: {bookBorrowingDetail?.expireDate}</p> 
            <button>Xem chi tiết</button>
        </div>
    );
} 
export default BookBorrowingSlip;

