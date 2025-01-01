import React from "react";
import DeleteImg from '../assets/Icons/recycle_bin.png';

function BookManagementItem({book,index,onDelete}){
    return(
        <div className="book-item">
            <p>{index+1}</p>
            <p>{book[0].id}</p>
            <p>{book[0].title.name}</p>
            <p>{book[0].title.type.name}</p>
            <p>{book[0].status.name}</p>
            <button className="delete-btn-item" onClick={onDelete}>
                <img width={20} height={20} src={DeleteImg} alt="Delete" />
            </button>
        </div>
    )
}

export default BookManagementItem