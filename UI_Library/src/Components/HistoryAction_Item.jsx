import React from "react";
import formatDate from "../Env/FormatDate"; 

const HistoryAction_Item=({item,index,displayAction,displayStatus})=>{
    return(
        <div className="actionHistory-item object-item">
            <p>{index}</p>
            <p>{item.service.serviceId}</p>
            <p>{item.book.id}</p>
            <p>{item.book.title.name}</p>
            <p>{formatDate(item.service.implementDate)}</p>
            <p>{formatDate(item.expireDate)}</p>
            <p>{displayStatus}</p>
            <div>{displayAction}</div>
        </div>
    )
}
export default HistoryAction_Item