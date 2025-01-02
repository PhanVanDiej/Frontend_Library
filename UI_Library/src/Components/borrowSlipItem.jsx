import React from "react";
import formatDate from "../Env/FormatDate";

const BorrowSlipItem=({item,index,display})=>{
    //console.log(item);
    return(
        <div className="borrowSlip-Item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index}</p>
            <p>{item.service.serviceId}</p>
            <p>{item.book.id}</p>
            <p>{item.book.title.name}</p>
            <p>{item.service.reader.userId}</p>
            <p>{item.service.reader.fullname}</p>
            <p>{formatDate(item.service.implementDate)}</p>
            <p>{formatDate(item.expireDate)}</p>
            <div>{display(item)}</div>
        </div>
    )
}
export default BorrowSlipItem