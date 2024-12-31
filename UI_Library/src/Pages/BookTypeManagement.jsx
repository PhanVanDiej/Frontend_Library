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
    <Header_Main />
    <div>
        <input 
            id="searchData"
            type="text"
            placeholder="Tìm kiếm thể loại sách"
            style={{ padding: '8px', margin: '8px 0', width: '100%' }}
        />
        <button
            onClick={(e) => {
                e.preventDefault();
                onSearch(document.getElementById("searchData").value);
            }}
            style={{ padding: '8px 16px', margin: '8px 0' }}
        >
            Tìm
        </button>
    </div>
    <button
        onClick={(e) => {
            e.preventDefault();
            navigate("/register_book_type");
        }}
        style={{ padding: '8px 16px', margin: '8px 0' }}
    >
        Thêm thể loại sách
    </button>
    <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
            <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>STT</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Hình ảnh minh họa</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Mã thể loại</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Tên thể loại</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Xóa</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Sửa</th>
                </tr>
            </thead>
            <tbody>
                {selectProducts.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}>{index + 1}</td>
                        <td>
                            <img
                                style={{ width: '50px', height: '50px' }}
                                src={displayImageURL(item.imageData)}
                                alt="Hình ảnh minh họa"
                            />
                        </td>
                        <td style={{ padding: '8px' }}>{item.id}</td>
                        <td style={{ padding: '8px' }}>{item.name}</td>
                        <td style={{ padding: '8px' }}>
                            <button>Xóa</button>
                        </td>
                        <td style={{ padding: '8px' }}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/edit_book_type/" + item.id);
                                }}
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    )
} 
export default BookTypeManagement;