import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import displayImageURL from "../Env/DisplayImage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BE_ENDPOINT from "../Env/EndPont";

function BookTypeManagement() 
{ 
    const [products, setProducts] = useState([]); 
    const [selectProducts, setSelectProducts] = useState([]); 
    const navigate = useNavigate();
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
                title:"Xóa thất bạibại",
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
            <div>
                <input type="text" placeHolder="Tìm kiếm thể loại sách"/>
                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        onSearch();
                    }
                }>Tìm</button>
            </div>
            <button onClick={(e)=>{
                e.preventDefault();
                navigate("/register_book_type");
            }}>Thêm thể loại sách</button>
            <div>
                <table>
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
                </table>
            </div>
        </div>
    )
} 
export default BookTypeManagement;