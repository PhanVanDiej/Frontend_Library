import React from "react";
import formatDate from "../Env/FormatDate"; 

const BuyBookHistoryItem=({item,index})=>{
    return(
        <div className="buyBookHistory-item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index}</p>
            <p>{item.buyBookBill.buyBookBillId}</p>
            <p>{item.bookTitle.id}</p>
            <p>{item.bookTitle.name}</p>
            <p>{item.amount}</p>
            <p>{item.price}</p>
            <p>{formatDate(item.buyBookBill.implementDate)}</p>
        </div>
    )
}
export default BuyBookHistoryItem