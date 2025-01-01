import React from "react";
import close from '../assets/Icons/redClose.png';
import check from '../assets/Icons/greenCheck.png';

function RenewalItem({item,index,onReject,onAccept}){
    return(
        <div className="renewal-item">
            <p>{index}</p>
            <p>{item.reader_ID}</p>
            <p>{item.reader_fullname}</p>
            <p>{item.slipID}</p>
            <p>{item.bookID}</p>
            <p>{item.bookName}</p>
            <p>{item.expireDate}</p>
            <p>{item.newExpireDate}</p>
            <div className="user-action-btn">
                <button className="accept-btn" onClick={onAccept}>
                    <img width={20} height={20} src={check} alt="accept" />
                </button>
                <button className="reject-btn" onClick={onReject}>
                    <img width={20} height={20} src={close} alt="reject" />
                </button>
            </div>
        </div>
    )
}

export default RenewalItem