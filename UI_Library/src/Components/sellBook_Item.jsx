import React from "react";
import DeleteImg from '../assets/Icons/recycle_bin.png';

const SellBookItem=({item,index,onDelete})=>{
    return(
        <div className="sellBook-item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index}</p>
            <p>{item.bookId}</p>
            <p>{item.price}</p>
            <button className="delete-btn-item" onClick={onDelete}>
                <img width={20} height={20} src={DeleteImg} alt="Delete" />
            </button>
        </div>
    )
}
export default SellBookItem