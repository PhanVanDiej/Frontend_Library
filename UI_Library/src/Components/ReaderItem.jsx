import React from "react";

function ReaderItem({item,index,onEnable,onDisable}){
    return(
        <div className="reader-item object-item" style={{backgroundColor: index%2==0? "white":"#d9d9d9"}}>
            <p>{index+1}</p>
            <p>{item.userId}</p>
            <p>{item.fullname}</p>
            <p>{item.email}</p>
            <p>{item.phoneNumber}</p>
            <p>{item.penaltyTime}</p>
            <div className="user-action-btn">
                <button className={!item.enable? "switch-btn enable-btn":"switch-btn disable-btn"} onClick={()=>{
                    if(item.enable) 
                    {
                         onDisable()
                    } 
                    else
                    {
                        onEnable();
                    }
                }}>
                    {item.enable? "Vô hiệu hoá":"Mở khoá"}
                </button>
            </div>
        </div>
    )
}

export default ReaderItem