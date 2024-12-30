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
        <div>
            <Header_Main></Header_Main>
<div>
    <h3>Chỉnh sửa thông tin tựa sách:</h3> 
    <form id="register_form">
        <div>
            <label htmlFor="bookName">Tên sách :</label> 
            <input type="text" required id="bookName" defaultValue ={bookTitle?.name}/>
        </div>
        <div>
            <label htmlFor="bookType">Thể loại :</label> 
            <select id="bookType" required defaultValue={bookTitle?.type?.id}>
                {
                    bookType.map((item)=>{
                        return <option value={item.id}>{item.name}</option>
                    })
                }
            </select>
        </div>
        <div>
            <label htmlFor="author">Tác giả :</label> 
            <input id="author" required type="text" defaultValue={bookTitle?.author}/>
        </div> 
        <div>
            <label htmlFor="NXB">Nhà xuất bản :</label>
            <input id="NXB" type="text" required defaultValue={bookTitle?.nxb}/>
        </div> 
        <div>
            <label htmlFor="YEAR">Năm xuất bản :</label>  
            <input type="number" min="1900" max="2024" id="YEAR" required defaultValue={bookTitle?.year}/>
        </div>  
        <div>
            <label htmlFor="language">Ngôn ngữ : </label> 
            <input type="text" id="language" required defaultValue={bookTitle?.language}/>
        </div>
        <div>
            <label htmlFor="pageAmount">Số lượng trang : </label> 
            <input type="number" id="pageAmount" required min="10" defaultValue={bookTitle?.pageAmount}></input>
        </div>
        <div> 
            <label htmlFor="Review">Mô tả nội dung :</label> 
            <textarea required id="Review" defaultValue={bookTitle?.review}></textarea>
        </div> 
        <div>
            <label>Hình ảnh bìa sách :</label> 
            <img src={displayImageURL(bookTitle?.imageData)}></img>
        </div> 
        <div>
            <label htmlFor="updateBookTitleImage">Upload file ảnh nếu muốn thay đổi bìa sách</label> 
            <input type="file" id="updateBookTitleImage"/>
        </div>
        <div>
            <input type="submit"/>
        </div>


    </form>
</div>
        </div>
    )
} 
export default EditBookTitleForm