import React from "react";
import close from '../assets/Icons/redClose.png';
import check from '../assets/Icons/greenCheck.png';
import formatDate from "../Env/FormatDate";

function RenewalItem({item,index,onReject,onAccept}){
    return(
        <div className="renewal-item">
            <p>{index+1}</p>
            <p>{item.borrowingCardDetail.service.reader.userId}</p>
            <p>{item.borrowingCardDetail.service.reader.fullname}</p>
            <p>{item.borrowingCardDetail.service.serviceId}</p>
            <p>{item.borrowingCardDetail.book.id}</p>
            <p>{item.borrowingCardDetail.book.title.name}</p>
            <p>{formatDate(item.borrowingCardDetail.service.implementDate)}</p>
            <p>{formatDate(item.newExpireDate)}</p>
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