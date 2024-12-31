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
            <div className="main-content">
                <h2 className="title-page">Lich su ban sach</h2> 
                <div className="content-table">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th>  
                                <th>Ma phieu ban</th>
                                <th>Ma sach</th> 
                                <th>Ten sach</th> 
                                <th>Ma thu thu</th> 
                                <th>Ten thu thu</th> 
                                <th>Gia ban</th> 
                                <th>Ngay ban</th>
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
                                        <td>{item.sellBookBill.librarian.userId}</td> 
                                        <td>{item.sellBookBill.librarian.fullname}</td> 
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