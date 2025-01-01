import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate"; 
//import "../Styles/Pages/BuyBookHistory.css"
import permissionLibrarian from "../Env/PermissionLibrarian";
import BuyBookHistoryItem from "../Components/BuyBookHistory_Item.jsx";
function BuyBookHistoryPage() 
{ 
    const [listBuyBookDetail, setListBuyBookDetail] = useState([]);
    useEffect(()=>{ 
        async function getDetailFromServer() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/getBuyBookDetail",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json();
            console.log(responseData); 
            setListBuyBookDetail(responseData.reverse());
        }
        getDetailFromServer();
    },[]) 
    permissionLibrarian();
    return (  
        <div>
        <Header_Main></Header_Main>
        <div className="main-content">
            <h2 className="title-page">Lịch sử mua sách</h2>
            <div className="content-table">
                {/* <table border={1}>
                    <thead>
                        <tr>
                            <th>STT</th> 
                            <th>Mã phiếu nhập</th> 
                            <th>Mã tựa sách</th> 
                            <th>Tên tựa sách</th> 
                            <th>Số lượng</th> 
                            <th>Đơn giá</th> 
                            <th>Ngày mua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBuyBookDetail.map((item, index)=>{ 
                                return (
                                    <tr>
                                        <td>{index+1}</td> 
                                        <td>{item.buyBookBill.buyBookBillId}</td> 
                                        
                                        <td>{item.bookTitle.id}</td> 
                                        <td>{item.bookTitle.name}</td> 
                                        <td>{item.amount}</td> 
                                        <td>{item.price}</td> 
                                        <td>{formatDate(item.buyBookBill.implementDate)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> */}
                <div className="buyBookHistory-list-header object-list-header">
                    <div className="STT">STT</div>
                    <div className="bill-id">Mã phiếu nhập</div>
                    <div className="bookTitle-id">Mã tựa sách</div>
                    <div className="bookTitle-name">Tên tựa sách</div>
                    <div className="amount">Số lượng</div>
                    <div className="price">Đơn giá</div>
                    <div className="implementDate">Ngày mua</div>
                </div>
                <div className="header-border-line"></div>
                <div className="object-list-data buyBookHistory-list-data">
                    {listBuyBookDetail.map((item, index)=>(
                        <BuyBookHistoryItem
                        index={index+1}
                        item={item}/>
                    ))}
                </div>
            </div>
        </div> 
        </div>
    )
} 
export default BuyBookHistoryPage