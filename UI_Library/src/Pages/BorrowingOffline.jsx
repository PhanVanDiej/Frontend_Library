import React, { useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import BorrowOff_Item from "../Components/BorrowOff_Item.jsx";
import '../Styles/Pages/BorrowingOffline.css'

const example = [
    { id: "1", title: { name: "The Great Gatsby" } },
    { id: "2", title: { name: "To Kill a Mockingbird" } },
    { id: "3", title: { name: "1984" } },
    { id: "4", title: { name: "Pride and Prejudice" } },
    { id: "5", title: { name: "The Catcher in the Rye" } }
];

function BorrowOfflinePage() 
{ 
    const [listBook, setListBook] = useState([]);
    let listSelectBook=[];
    async function onAdd(index) 
    {  
        
        const response = await fetch(BE_ENDPOINT+"books/details?id="+index);
        if(!response.ok) 
        {
            return;
        } 
        const responseData= await response.json(); 
        if(responseData.status.id!=0) 
        {
            alert("Không thể cho mượn sách này");
            return;
        }
        let listAddedBook = listSelectBook.filter((item)=>{
             return responseData.id==item.id
        });
        if(listAddedBook.length>0) 
        {
            return;
        }
        listSelectBook.push(responseData);
        setListBook(listSelectBook);
        
    } 
    function onDelete(index) 
    {
        listSelectBook = listSelectBook.filter((item, id)=>{
            return item.id!=index;
        });
        setListBook(listSelectBook);
    }
    async function confirmBorrow() 
    {
        if(document.getElementById("userId").value=="")
        {
            alert("Vui lòng nhập mã độc giả");
            return;
        }
        const data ={
            userId: document.getElementById("userId").value,
            listBook:listBook.map((item)=>{
                return item.id
            })
        }
        console.log(data);
        const response = await fetch(BE_ENDPOINT+"librarian/borrowOffline",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(response.status==404)
        {
            alert("Tài khoản độc giả không thể thực hiện thao tác") 
            return;
        }

        alert("Thành công");
    }
    permissionLibrarian();
    return (
        <div>
    <Header_Main />

    <div className="main-content">
        <h2 className="title-page">Mượn sách trực tiếp</h2>
        <div style={{ marginBottom: '20px',marginTop:'20px' }}>
            <form>
                <label htmlFor="userId" style={{ display: 'block', marginBottom: '10px' }}>Mã độc giả</label>
                <input type="number" id="userId" style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

                <label htmlFor="bookId" style={{ display: 'block', marginBottom: '10px' }}>Mã sách</label>
                <input type="number" id="bookId" style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </form>
            <button onClick={(e) => {
                e.preventDefault();
                if (document.getElementById("bookId").value !== "") {
                    onAdd(document.getElementById("bookId").value);
                }
            }} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}>Thêm</button>
            <button onClick={(e) => {
                e.preventDefault();
                confirmBorrow();
            }} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>Xác nhận cho mượn</button>
        </div>
        <div className="content-table">
            {/* <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>STT</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mã sách</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên sách</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listBook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title.name}</td>
                                    <td><button onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(index);
                                    }} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}>Xóa</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
            <div className="borrowOffline-list-header object-list-header">
                <div className="STT">STT</div>
                <div className="id">Mã sách</div>
                <div className="title-name">Tên sách</div>
                <div className="user-action">Hành động</div>
            </div>
            <div className="header-border-line"></div>
            <div className="object-list-data borrowOffline-list-data">
                {listBook.map((item, index)=>(//listBook
                    <BorrowOff_Item
                    index={index+1}
                    item={item}
                    onDelete={()=>onDelete(index)}/>
                ))}
            </div>
        </div>
    </div>
</div>

    )
} 
export default BorrowOfflinePage;