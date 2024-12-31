import React, { useState, useEffect } from "react";  
import { useParams } from "react-router-dom";
import BE_ENDPOINT from "../Env/EndPont";
import Header_Main from "../Components/Header_Main";
import displayImageURL from "../Env/DisplayImage";
import permissionLibrarian from "../Env/PermissionLibrarian";
function EditBookTitleForm()
{
    const bookId = useParams();
    console.log(bookId.id);
    const [bookType, setBookType]= useState([]); 
    const [bookTitle, setBookTitle]= useState([]);
    useEffect(()=>{
        async function fetchToServer() 
        {
            const response = await fetch(BE_ENDPOINT+"book-types");
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
            setBookType(responseData);
        }
        document.getElementById("register_form").addEventListener("submit",(e)=>{
            e.preventDefault();  
            onSubmit();

            
        })
        fetchToServer();

    },[]); 
    async function onSubmit() 
    {
        if(document.getElementById("updateBookTitleImage").files.length>0) 
        { 
            const formData= new FormData();
            
            formData.append("file",document.getElementById("updateBookTitleImage").files[0])
            const putImage = await fetch(BE_ENDPOINT+"librarian/update/bookTitle/image/"+bookId.id,{
                method:"PUT", 
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("token")
                },
                body:formData
            });
            if(!putImage.ok) 
            { 
                alert("Fail");
                return;
            }
            console.log("Uploaded image");
        }

        const data= {
            id:bookId.id,
            name:document.getElementById("bookName").value,
            typeId: document.getElementById("bookType").value,
            author:document.getElementById("author").value,
            nxb:document.getElementById("NXB").value,
            year:document.getElementById("YEAR").value,
            language:document.getElementById("language").value,
            pageAmount: document.getElementById("pageAmount").value,
            review:document.getElementById("Review").value,
            imageData:[]
        } 
        console.log(data);
        const putInfo = await fetch(BE_ENDPOINT+"librarian/updates/bookTitle/info",{
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!putInfo.ok) 
        { 
            alert("Fail");
            return;
        } 
        const message= await putInfo.text();
        console.log(message);
        //location.reload();
    }
    useEffect(()=>{ 
        async function fetchToServer() 
        {
            const response = await fetch(BE_ENDPOINT+"book-titles/details/"+bookId.id);
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json(); 
            console.log(responseData);
            setBookTitle(responseData);
        }
        fetchToServer();

    },[])
    permissionLibrarian();
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Header_Main />

    <div>
        <h3 style={{ color: '#333', textAlign: 'center' }}>Chỉnh sửa thông tin tựa sách:</h3>
        <form id="register_form">
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="bookName" style={{ display: 'block', marginBottom: '5px' }}>Tên sách :</label>
                <input type="text" required id="bookName" defaultValue={bookTitle?.name} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="bookType" style={{ display: 'block', marginBottom: '5px' }}>Thể loại :</label>
                <select id="bookType" required defaultValue={bookTitle?.type?.id} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }}>
                    {
                        bookType.map((item) => {
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="author" style={{ display: 'block', marginBottom: '5px' }}>Tác giả :</label>
                <input id="author" required type="text" defaultValue={bookTitle?.author} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="NXB" style={{ display: 'block', marginBottom: '5px' }}>Nhà xuất bản :</label>
                <input id="NXB" type="text" required defaultValue={bookTitle?.nxb} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="YEAR" style={{ display: 'block', marginBottom: '5px' }}>Năm xuất bản :</label>
                <input type="number" min="1900" max="2024" id="YEAR" required defaultValue={bookTitle?.year} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="language" style={{ display: 'block', marginBottom: '5px' }}>Ngôn ngữ :</label>
                <input type="text" id="language" required defaultValue={bookTitle?.language} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="pageAmount" style={{ display: 'block', marginBottom: '5px' }}>Số lượng trang :</label>
                <input type="number" id="pageAmount" required min="10" defaultValue={bookTitle?.pageAmount} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Review" style={{ display: 'block', marginBottom: '5px' }}>Mô tả nội dung :</label>
                <textarea required id="Review" defaultValue={bookTitle?.review} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }}></textarea>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Hình ảnh bìa sách :</label> 
                <br></br>
                <img src={displayImageURL(bookTitle?.imageData)} style={{ display: 'block', margin: '10px auto', width:"200px", height:"200px", alignContent:"left" }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="updateBookTitleImage" style={{ display: 'block', marginBottom: '5px' }}>Upload file ảnh nếu muốn thay đổi bìa sách</label>
                <input type="file" id="updateBookTitleImage" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
            </div>
            <div>
                <input type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
            </div>
        </form>
    </div>
</div>

    )
} 
export default EditBookTitleForm