import React from "react";
import DeleteImg from '../assets/Icons/recycle_bin.png';

const BorrowOff_Item=({item,index,onDelete})=>{
    return(
        <div className="borrowOff-item object-item">
            <p>{index}</p>
            <p>{item.id}</p>
            <p>{item.title.name}</p>
            <button className="delete-btn-item" onClick={onDelete}>
                <img width={20} height={20} src={DeleteImg} alt="Delete" />
            </button>
        </div>
    )
}
export default BorrowOff_Item