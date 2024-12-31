import React from "react";
import DeleteImg from '../assets/Icons/recycle_bin.png';

function BookManagementItem({book,index,onDelete}){
    return(
        <div className="book-item">
            <p>{index}</p>
            <p>{book.id}</p>
            <p>{book.title}</p>
            <p>{book.type}</p>
            <p>{book.status}</p>
            <button className="delete-btn-item" onClick={onDelete}>
                <img width={20} height={20} src={DeleteImg} alt="Delete" />
            </button>
        </div>
    )
}

export default BookManagementItem