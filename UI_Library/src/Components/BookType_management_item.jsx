import React from "react";
import DeleteImg from '../assets/Icons/recycle_bin.png';
import EditIcon from '../assets/Icons/edit.png';
import displayImageURL from "../Env/DisplayImage"; 
import "../Styles/Pages/BookTypeManagement.css"
function BookTypeManagementItem({bookType,index,onDelete,onEdit}){
    return(
        <div className="bookType-item">
            <p>{index+1}</p>
            <p>{bookType.id}</p>
            <img width={40} height={40} src={displayImageURL(bookType.imageData)} alt="Ảnh minh hoạ"></img>
            <p>{bookType.name}</p>
           
            <div className="user-action-btn">
                <button className="edit-btn-item" onClick={onEdit}>
                    <img width={20} height={20} src={EditIcon} alt="Edit" />
                </button>
                <button className="delete-btn-item" onClick={onDelete}>
                    <img width={20} height={20} src={DeleteImg} alt="Delete" />
                </button>
            </div>
        </div>
    )
}

export default BookTypeManagementItem