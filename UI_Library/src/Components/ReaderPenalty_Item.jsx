import React from "react";
import formatDate from "../Env/FormatDate"; 

const ReaderPenalty_Item=({item,index})=>{
    return(
        <div className="buyBookHistory-item object-item">
            <p>{index}</p>
            <p>{formatDate(item.implementDate)}</p>
            <p>{item.content}</p>
            <p>{item.money}</p>
        </div>
    )
}
export default ReaderPenalty_Item