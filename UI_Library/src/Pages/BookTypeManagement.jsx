import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import displayImageURL from "../Env/DisplayImage";
import { useNavigate } from "react-router-dom";
import BookTypeManagementItem from "../Components/BookType_management_item";
import '../Styles/Pages/BookTypeManagement.css';

const bookTypeExample=[
    { id: "1", typeName: "Fiction", img: "https://example.com/fiction.jpg" },
    { id: "2", typeName: "Non-Fiction", img: "https://example.com/non-fiction.jpg" },
    { id: "3", typeName: "Science Fiction", img: "https://example.com/scifi.jpg" },
    { id: "4", typeName: "Fantasy", img: "https://example.com/fantasy.jpg" },
    { id: "5", typeName: "Biography", img: "https://example.com/biography.jpg" },
    { id: "6", typeName: "Mystery", img: "https://example.com/mystery.jpg" },
    { id: "7", typeName: "Romance", img: "https://example.com/romance.jpg" },
    { id: "8", typeName: "Thriller", img: "https://example.com/thriller.jpg" },
    { id: "9", typeName: "Self-Help", img: "https://example.com/self-help.jpg" }
]
function BookTypeManagement() 
{ 
    const [selectedItem,setSeclectedItem]=useState(null);
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

    const handleOnDeleteItem=(item)=>{
        setSeclectedItem(item);
    }
    const handleOnEditItem=(item)=>{
        setSeclectedItem(item);
    }
    return (
        <div>
            <Header_Main></Header_Main> 
            <div className="main-content">
                <input className="search-input" type="text" placeHolder="Tìm kiếm thể loại sách"/>
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
                <div className="books-type-data">
                    {bookTypeExample.map((item,index)=>(
                        <BookTypeManagementItem
                        bookType={item} 
                        onDelete={handleOnDeleteItem(item)}
                        onEdit={handleOnEditItem(item)}
                        index={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
} 
export default BookTypeManagement;