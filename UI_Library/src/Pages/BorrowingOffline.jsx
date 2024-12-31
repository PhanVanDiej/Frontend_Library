import React, { useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Header_Main />

    <div>
        <h2 style={{ color: '#333', textAlign: 'center' }}>Mượn sách trực tiếp</h2>
        <div style={{ marginBottom: '20px' }}>
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
        <div>
            <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            </table>
        </div>
    </div>
</div>

    )
} 
export default BorrowOfflinePage;