import React, { useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
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
            }
        });
        if(response.status==404)
        {
            alert("Tài khoản độc giả không thể thực hiện thao tác") 
            return;
        }

        alert("Thành công");
    }
    return (
        <div>
            <Header_Main>

            </Header_Main>
            <div>
                <h2>Mượn sách trực tiếp</h2> 
                <div>
                    <form>
                        <label htmlFor="userId">Mã độc giả</label> 
                        <input type="number" id="userId"/>

                        <label htmlFor="bookId">Mã sách</label> 
                        <input type="number" id="bookId"/>
                    </form> 
                    <button  
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            if(document.getElementById("bookId").value!="") 
                            {
                                onAdd(document.getElementById("bookId").value);
                            }
                        }
                    }
                    >Thêm</button>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        confirmBorrow();
                    }}>Xác nhận cho mượn</button>
                </div>
                <div> 
                    <table border={1}> 
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Mã sách</th> 
                                <th>Tên sách</th> 
                                <th>Xóa</th>
                            </tr> 
                        </thead> 
                        <tbody>
                            {
                            listBook.map((item, index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td> 
                                        <td>{item.id}</td> 
                                        <td>{item.title.name}</td> 
                                        <td><button 
                                        onClick={
                                            (e)=>{
                                                e.preventDefault();
                                                onDelete(index);
                                            }
                                        } 
                                        >Xóa</button></td>
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