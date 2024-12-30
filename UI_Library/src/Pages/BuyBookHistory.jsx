import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate"; 
//import "../Styles/Pages/BuyBookHistory.css"
import permissionLibrarian from "../Env/PermissionLibrarian";
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
        <div>
            <h2>Lịch sử mua sáchsách</h2>
            <div>
                <table border={1}>
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
                </table>
            </div>
        </div> 
        </div>
    )
} 
export default BuyBookHistoryPage