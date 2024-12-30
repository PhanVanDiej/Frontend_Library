import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import displayImageURL from "../Env/DisplayImage";
import permissionLibrarian from "../Env/PermissionLibrarian";
function EditBookTypeForm() 
{
    const bookTypeId= useParams();
    const [bookType, setBookType]= useState();

    useEffect(()=>{
        async function fetchToServer()
        {
            const response = await fetch(BE_ENDPOINT+"book-types/details/"+bookTypeId.id);
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json(); 
            console.log(responseData);
            setBookType(responseData);
        } 
        fetchToServer(); 
        document.getElementById("editBookTypeForm").addEventListener("submit",(e)=>{
            e.preventDefault(); 
            onSubmit();
        })
    },[]); 
    async function onSubmit() 
    {
        if(document.getElementById("bookTypeImage").files.length>0) 
        {
            const formData= new FormData();
            formData.append("file", document.getElementById("bookTypeImage").files[0]);
            const putImage = await fetch(BE_ENDPOINT+"librarian/update/bookType/image/"+bookTypeId.id,{
                method:"PUT",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("token")
                },
                body:formData
            }); 
            if(!putImage.ok) 
            {document.getElementById("MessageZone").innerHTML="Upload hinh anh that bai"; 
                return;
                
            } 
            const putImageMessage= await putImage.text();
            console.log(putImageMessage);
            if(putImageMessage!="Update success") 
            {
                document.getElementById("MessageZone").innerHTML="Upload hinh anh that bai"; 
                return;
            }  
            const data={
                id:bookTypeId.id,
                name:document.getElementById("bookTypeName").value,
                imageData:[]
            }
            const putInfo = await fetch(BE_ENDPOINT+"librarian/update/bookType/info",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                },
                body:JSON.stringify(data)
            });
            if(!putInfo.ok) 
            {
                document.getElementById("MessageZone").innerHTML="Upload thong tin that bai";
                return;
            } 
            const putInfoMessage = await putInfo.text();
            document.getElementById("MessageZone").innerHTML=putInfoMessage;

        }
    }
    permissionLibrarian();
    return (
        <div>
            <Header_Main></Header_Main>
            <h2>Thay đổi thông tin thể loại sách</h2>
                <form id="editBookTypeForm">
                    <div>
                        <label htmlFor="bookTypeName">Tên thể loại:  </label>  
                        <input type="text" id="bookTypeName"  defaultValue={bookType?.name}required/>
                    </div> 
                    <div>
                        <label>Hình ảnh thể loại sách</label> 
                        <img src={displayImageURL(bookType?.imageData)} ></img>
                    </div> 
                    <div>
                        <label htmlFor="bookTypeImage">Upload file ảnh nếu muốn thay đổi hình minh họa thể loại</label>
                        <input type="file" id="bookTypeImage"/>
                    </div> 
                    <div>
                        <input type="submit" value="Xác nhậnnhận"/>
                    </div>
                </form>
                <p id="MessageZone"></p>
            
        </div>
    )
} 
export default EditBookTypeForm;