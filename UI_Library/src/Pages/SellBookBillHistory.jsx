import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import permissionLibrarian from "../Env/PermissionLibrarian";
import SellBookHistory from "../Components/SellBookHistory.jsx";
import '../Styles/Pages/SellBookHistory.css'

const example = [
    {
        sellBookBill: {
            sellBookBillId: "SB001",
            implementDate: "2025-01-01"
        },
        book: {
            id: "BK001",
            title: {
                id: "BT001",
                name: "The Hobbit"
            }
        },
        price: "15.99"
    },
    {
        sellBookBill: {
            sellBookBillId: "SB002",
            implementDate: "2025-01-02"
        },
        book: {
            id: "BK002",
            title: {
                id: "BT002",
                name: "War and Peace"
            }
        },
        price: "20.50"
    },
    {
        sellBookBill: {
            sellBookBillId: "SB003",
            implementDate: "2025-01-03"
        },
        book: {
            id: "BK003",
            title: {
                id: "BT003",
                name: "Moby Dick"
            }
        },
        price: "18.75"
    },
    {
        sellBookBill: {
            sellBookBillId: "SB004",
            implementDate: "2025-01-04"
        },
        book: {
            id: "BK004",
            title: {
                id: "BT004",
                name: "Jane Eyre"
            }
        },
        price: "14.99"
    },
    {
        sellBookBill: {
            sellBookBillId: "SB005",
            implementDate: "2025-01-05"
        },
        book: {
            id: "BK005",
            title: {
                id: "BT005",
                name: "The Catcher in the Rye"
            }
        },
        price: "12.50"
    }
];

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
                <h2 className="title-page">Lịch sử bán sách</h2>
                <div className="content-table">
                    {/* <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th>  
                                <th>Mã phiếu thanh lý:</th>
                                <th>Mã sách:</th> 
                                <th>Tên tựa sách:</th> 
                                
                                <th>Giá thanh lý</th> 
                                <th>Ngày thanh lý</th>
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
                    </table> */}
                    <div className="sellBookHistory-list-header object-list-header">
                        <div className="STT">STT</div>
                        <div className="bill-id">Mã phiếu thanh lý</div>
                        <div className="bookTitle-id">Mã sách</div>
                        <div className="bookTitle-name">Tên tựa sách</div>
                        <div className="price">Giá thanh lý</div>
                        <div className="implementDate">Ngày thanh lý</div>
                    </div>
                    <div className="header-border-line"></div>
                    <div className="object-list-data sellBookHistory-list-data">
                        {listSellBook.map((item, index)=>(//listSellBook
                            <SellBookHistory
                            index={index+1}
                            item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default SellBookBillPage;