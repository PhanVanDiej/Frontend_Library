import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import permissionLibrarian from "../Env/PermissionLibrarian";
function SellBookBillPage() 
{ 
    const [listSellBook, setListSellBook] = useState([]);
    useEffect(()=>{
        async function getAllListSellBook() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/getSellBookBill",{
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
            setListSellBook(responseData.reverse());
            console.log(responseData);

        } 
        getAllListSellBook();
    },[]) 
    permissionLibrarian();
    return (
        <div>
            <Header_Main></Header_Main> 
            <div>
                <h2>Lịch sử thanh lý</h2> 
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th>  
                                <th>Mã phiếu thanh lý:</th>
                                <th>Mã sách:</th> 
                                <th>Tên tựa sách:</th> 
                                
                                <th>Giá thanh lý</th> 
                                <th>Ngày thanh lýlý</th>
                            </tr>
                        </thead> 
                        <tbody>
                           {
                            listSellBook.map((item, index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td> 
                                        <td>{item.sellBookBill.sellBookBillId}</td> 
                                        <td>{item.book.id}</td> 
                                        <td>{item.book.title.name}</td> 
                                        <td>{item.price}</td> 
                                        <td>{formatDate(item.sellBookBill.implementDate)}</td>
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
export default SellBookBillPage;