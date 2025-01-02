import React from "react";
import formatDate from "../Env/FormatDate"; 

const SellBookHistoryItem=({item,index})=>{
    return(
        <div className="sellBookHistory-item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index}</p>
            <p>{item.sellBookBill.sellBookBillId}</p>
            <p>{item.book.id}</p>
            <p>{item.book.title.name}</p>
            <p>{item.price}</p>
            <p>{formatDate(item.sellBookBill.implementDate)}</p>
        </div>
    )
}
export default SellBookHistoryItem