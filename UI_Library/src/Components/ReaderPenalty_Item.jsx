import React from "react";
import formatDate from "../Env/FormatDate"; 

const ReaderPenalty_Item=({item,index})=>{
    return(
        <div className="readerPenalty-item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index}</p>
            <p>{formatDate(item.implementDate)}</p>
            <p>{item.content}</p>
            <p>{item.money}</p>
        </div>
    )
}
export default ReaderPenalty_Item