import React from "react";

const PenaltyItem=({item,index,onDelete})=>{
    return(
        <div className="penalty-item object-item">
            <p>{index}</p>
            <p>{item.id}</p>
            <p>{item.reader.userId}</p>
            <p>{item.reader.fullname}</p>
            <p>{item.money}</p>
            <p>{item.content}</p>
        </div>
    )
}
export default PenaltyItem