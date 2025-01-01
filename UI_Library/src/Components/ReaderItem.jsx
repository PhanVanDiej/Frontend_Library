import React from "react";

function ReaderItem({item,index,onEnable,onDisable}){
    return(
        <div className="reader-item">
            <p>{index}</p>
            <p>{item.id}</p>
            <p>{item.fullname}</p>
            <p>{item.email}</p>
            <p>{item.phoneNumber}</p>
            <p>{item.penaltyTime}</p>
            <div className="user-action-btn">
                <button className={!item.status? "switch-btn enable-btn":"switch-btn disable-btn"} onClick={onEnable}>
                    {item.status? "Vô hiệu hoá":"Mở khoá"}
                </button>
            </div>
        </div>
    )
}

export default ReaderItem