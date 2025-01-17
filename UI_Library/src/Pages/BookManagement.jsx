import { useEffect, useState } from "react";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import "../Styles/Pages/BookManagement.css";
import { useLocation, useNavigate } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
import BookManagementItem from "../Components/Book_management_item";

const BooksExample=[
    { id: "1", title: "To Kill a Mockingbird", type: "Fiction", status: "Available" },
    { id: "2", title: "1984", type: "Dystopian", status: "Checked Out" },
    { id: "3", title: "The Great Gatsby", type: "Classic", status: "Available" },
    { id: "4", title: "The Lean Startup", type: "Non-Fiction", status: "Available" },
    { id: "5", title: "Harry Potter and the Philosopher's Stone", type: "Fantasy", status: "Checked Out" }
]
function BookManagementPage()
{
    const [selectedBook,setSelectedBook]=useState(null);
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
                    <button onClick={(e)=>{
                e.preventDefault();
                navigate("/book_detail/"+item.title.id)
            }}>Xem tựa sách</button>
                </div>
            )
        }
        return (
            <div>
            <button onClick={()=>{
                onDeleteBook(item.id);
            }}>Xoa sach</button>
            <br></br>
            <button onClick={(e)=>{
                e.preventDefault();
                navigate("/book_detail/"+item.title.id)
            }}>Xem tựa sách</button>
            </div>
        )
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

     const handleOnDeleteClick=(book)=>{
        setSelectedBook(book);
     }

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
                    <option value="Tat ca">Tat ca</option>
                    <option value="San sang">San sang</option>
                    <option value="Dang cho muon">Dang cho muon</option>
                    <option value="Dang duoc muon">Dang duoc muon</option>
                   </select>
                </div>
                <div className="content-table">
                    {/* <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ma sach</th>
                                <th>Ten dau sach</th>
                                <th>The loai</th>
                                <th>Trang thai</th>
                                <th>Hanh dong</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                BooksExample.map((item, index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.title.name}</td>
                                            <td>{item.title.type.name}</td>
                                            <td>{item.status.name}</td>
                                            <td>{displayDeleteButton(item)}</td>
                                        </tr>                                        
                                    )
                                })
                            }
                        </tbody>
                    </table> */}
                    <div className="book-list-header">
                        <div className="STT">STT</div>
                        <div className="id">Mã sách</div>
                        <div className="book-title-name">Tên đầu sách</div>
                        <div className="book-title-type">Thể loại</div>
                        <div className="book-status">Trạng thái</div>
                        <div className="user-action">Hành động</div>
                    </div>
                    <div className="header-border-line" />
                    <div className="book-list-data">
                        {BooksExample.map((item,index)=>(
                            <BookManagementItem
                                key={item.id}
                                onDelete={()=>handleOnDeleteClick(item)}
                                book={item}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default BookManagementPage