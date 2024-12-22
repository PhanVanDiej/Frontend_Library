import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
function BuyBookHistoryPage() 
{ 
    const [listBuyBookDetail, setListBuyBookDetail] = useState([]);
    useEffect(()=>{ 
        async function getDetailFromServer() 
        {
            const response = await fetch(BE_ENDPOINT+"admin/getBuyBookBill",{
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
    return (  
        <div>
        <Header_Main></Header_Main>
        <div>
            <h2>Lich su mua sach</h2>
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>STT</th> 
                            <th>Ma phieu nhap</th> 
                            <th>Ma thu thu</th> 
                            <th>Ten thu thu</th> 
                            <th>Ma dau sach</th> 
                            <th>Ten dau sach</th> 
                            <th>So luong</th> 
                            <th>Don gia</th> 
                            <th>Ngay mua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBuyBookDetail.map((item, index)=>{ 
                                return (
                                    <tr>
                                        <td>{index+1}</td> 
                                        <td>{item.buyBookBill.buyBookBillId}</td> 
                                        <td>{item.buyBookBill.librarianId.userId}</td> 
                                        <td>{item.buyBookBill.librarianId.fullname}</td> 
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