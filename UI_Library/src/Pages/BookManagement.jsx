import { useEffect, useState } from "react";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";  
import "../Styles/Pages/BookManagement.css"
import { useLocation, useNavigate } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
import Swal from "sweetalert2";
function BookManagementPage() 
{ 
    const location = useLocation();
    const book= location.state||{}; 
    const navigate = useNavigate();
    const [listSelectBook, setListSelectedBook] = useState([]);
    const [listBook, setListBook] = useState([]);
     useEffect(()=>{
        async function getAllBookFromServer() 
        {
            const listBookResponse= await fetch(BE_ENDPOINT+"librarian/getAllBook",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!listBookResponse.ok) 
                {
                    return;
                }  
            const listBookData = await listBookResponse.json();
            
            console.log(book);
            if(book.id==undefined){
            setListBook(listBookData);
            setListSelectedBook(listBookData); 
            console.log(listBookData); 
            return; 
            } 
            else {
                setListBook(listBookData);
                setListSelectedBook(listBookData.filter((item)=>{
                    return (item.title.id== book.id);
                }))
                document.getElementById("searchData").defaultValue=book.name;
            }

        } 
        getAllBookFromServer();

     },[]); 

     async function readerTakeBook(item) 
     { 
        const response = await fetch(BE_ENDPOINT+"librarian/reader_take_book/"+item.id,{
            method:"PUT",
            headers:{ 
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        } 
        alert("Success");
        window.location.reload();
     }
     
     function onSearch(searchType) 
     {
        const keyword= document.getElementById("searchData").value ;
        const listRes= listBook.filter((item)=>{
            if(searchType!="Tat ca")  
            {
                if(searchType=="San sang") 
                {
                    if(item.status.id!=0) 
                    {
                        return false;
                    } 
                    
                } 
                if(searchType=="Dang cho muon") 
                {
                    if(item.status.id!=1) 
                    {
                        return false;
                    }
                } 
                if(searchType=="Dang duoc muon") 
                {
                    if(item.status.id!=3) 
                    {
                        return false;
                    }
                }
            }
            if(item.id==keyword) 
                return true;
            if(item.title.name.includes(keyword))   
                return true;
            if(item.title.type.name.includes(keyword)) 
                return true;
            return false;
        }) 
        setListSelectedBook(listRes);
     }  

     function displayDeleteButton(item) 
     { 
          
         
        if(item.status.id==3) 
        {
            return (
                <div>
                    <p>Đang được mượn</p> 
                    <button style={
                        {
                            color:"white",
                            backgroundColor:"red"
                        }
                    } onClick={(e)=>{
                e.preventDefault();
                navigate("/book_detail/"+item.title.id);
            }}>Xem tựa sách</button>
                </div>
            )
        }
        return (
            <div>
            <button onClick={()=>{
                deleteBook(item.id);
            }}>Xóa sách</button>  
            <br></br>
            <button onClick={(e)=>{ 
                if(item.isUsable==false)
                {
                    return;
                }
                e.preventDefault();
                navigate("/book_detail/"+item.title.id)
            }}>{()=>{
                if(item.title.enable==false) 
                {
                    return "Sách đã bị xóa";
                } 
                else {
                    return "Xem tựa sách"
                }
            }
            }</button>
            </div>
        
     )
     }
     function deleteBook(item) 
     {
        Swal.fire({
            title:"Xóa sách",
            text:"Bạn có chắc muốn xóa sách",
            confirmButtonText:"Có",
            cancelButtonText:"Không"
        }).then((result)=>{
            if(result.isConfirmed) 
            {
                onDeleteBook(item.id);
            }
        })  
     }
     async function onDeleteBook(id) 
     {
        const response = await fetch(BE_ENDPOINT+"librarian/deleteBook/"+id, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        } 
        alert("Success");
        window.location.reload();
     }

     
     permissionLibrarian();
    return (
        <div>
            <Header_Main></Header_Main> 

            <div className="main-content">
                <h2 className="title-page">Quản lý sách</h2> 
                <div className="filter-header">
                    <input className="search-input" type="text" placeholder="Tìm kiếm" id="searchData" onKeyDown={(e)=>{
                        if(e.key=="Enter")
                        {
                            onSearch(document.getElementById("searchType").value);
                        }
                    }}/> 
                   <select className="type-status-list" id="searchType">
                    <option value="Tat ca">Tất cả</option> 
                    <option value="San sang">Sẵn sàng</option> 
                    <option value="Dang cho muon">Đang chờ mượn</option> 
                    <option value="Dang duoc muon">Đang được mượn</option>
                   </select>
                </div>
                <br></br>
                <div style={
                    {
                        width:"100%",
                        height:"700px",
                        overflow:"auto"
                    }
                }>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
    <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>STT</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Mã sách</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Tên tựa sách</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Thể loại</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Trạng thái</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Hành động</th>
        </tr>
    </thead>
    <tbody>
        {listSelectBook.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{index + 1}</td>
                <td style={{ padding: '8px' }}>{item.id}</td>
                <td style={{ padding: '8px' }}>{item.title.name}</td>
                <td style={{ padding: '8px' }}>{item.title.type.name}</td>
                <td style={{ padding: '8px' }}>{item.status.name}</td>
                <td style={{ padding: '8px' }}>{displayDeleteButton(item)}</td>
            </tr>
        ))}
    </tbody>
</table>

                </div>
            </div>
        </div>
    )
} 
export default BookManagementPage