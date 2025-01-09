import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import displayImageURL from "../Env/DisplayImage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BE_ENDPOINT from "../Env/EndPont";
import BookTypeManagementItem from "../Components/BookType_management_item"; 
import "../Styles/Pages/BookTypeManagement.css"

function BookTypeManagement() 
{ 
    const [products, setProducts] = useState([]); 
    const [selectProducts, setSelectProducts] = useState([]); 
    const navigate = useNavigate(); 
    function clickEdit(item) {
        
        window.location.href="/edit_book_type/"+item.id;
    } 
    async function fetchBookType() 
    { 
         const response= await fetch(BE_ENDPOINT+"book-types"); 
         
         const responseData= await response.json();
         setProducts(responseData); 
         setSelectProducts(responseData);
    }  
    useEffect(()=>{
        fetchBookType();
    },[])
    function onSearch(searchData) 
    { 
        const listResult = products.filter((item)=>{
            return (item.name.includes(searchData));
        }) 
        setSelectProducts(listResult);
    } 
    function onClickDelete(item) 
    {
        Swal.fire({
            title:"Xóa thể loại",
            text:"Chắc chắn xóa thể loại?"
        }).then((result)=>{
            if(result.isConfirmed) {
                onDelete(item);
            }
        })  
    } 
    async function onDelete(item) 
    {
        const response = await fetch(BE_ENDPOINT+"librarian/delete_book_type/"+item.id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            Swal.fire({
                title:"Xóa thất bại",
                text:"Không thể xóa thể loại này"
            });
            return;
        } 
        Swal.fire({
            title:"Xóa thành công",
            text:"Đã xóa thể loại sách"
        });
        window.location.reload();
    }
    return (
        <div>
        <Header_Main></Header_Main> 
        <div className="main-content">
            <div style={{display:'flex', gap:'10px'}}>
            <input className="search-input" type="text" placeHolder="Tìm kiếm thể loại sách"/>
            <button className="action-btn confirm-btn" onClick={
                (e)=>{
                    e.preventDefault();
                    onSearch();
                }
            }>Tìm</button>
        
        <button className="action-btn add-btn" onClick={(e)=>{
            e.preventDefault();
            navigate("/register_book_type");
        }}>Thêm thể loại sách</button>
        </div>
        <div className="content-table">
            {/* <table>
                <thead>
                    <tr>
                        <th>STT</th>  
                        <th>Hình ảnh minh họa</th>
                        <th>Mã thể loại</th> 
                        <th>Tên thể loại</th> 
                        <th>Xóa</th> 
                        <th>Sửa</th>
                    </tr> 
                    
                </thead> 
                <tbody>
                    {
                        selectProducts.map((item, index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td> 
                                    <td><img src={displayImageURL(item.imageData)}></img></td> 
                                    <td>{item.id}</td> 
                                    <td>{item.name}</td> 
                                    <td><button>Xóa</button></td> 
                                    <td><button onClick={
                                        (e)=>{
                                            e.preventDefault();
                                            navigate("/edit_book_type/"+item.id);
                                        }
                                    }>Sửa</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
            <div className="bookType-list-header">
                <div className="STT">STT</div>
                <div className="id">Mã thể loại</div>
                <div className="CoverImg">Hình ảnh minh hoạ</div>
                <div className="type-name">Tên thể loại</div>
                <div className="user-action">Hành động</div>
            </div>
            <div className="header-border-line"></div>
            <div className="bookType-list-data">
                {selectProducts.map((item,index)=>(
                    <BookTypeManagementItem
                    bookType={item} 
                    onDelete={()=>onClickDelete(item)}
                    onEdit={()=>clickEdit(item)}
                    index={index}/>
                ))}
            </div>
        </div>
        </div>
    </div>

    )
} 
export default BookTypeManagement;