import React, { useEffect } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
function RegisterNewBookTypeForm() 
{
    async function onSubmit() 
    { 
        const formData= new FormData();
        formData.append("file",document.getElementById("bookTypeImage").files[0]);
        const response = await fetch(BE_ENDPOINT+"librarian/create/BookType/image",{
            method:"POST", 
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("token")
            },
            body:formData
        });
        if(!response.ok) 
        {
            return;
        }  
        const data= {
            name:document.getElementById("bookTypeName").value
        }
        const createInfoResponse = await fetch(BE_ENDPOINT+"librarian/create/BookType/info",{
            method:"POST", 
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!createInfoResponse.ok)
        {
            return ;
        } 
        alert("Tạo thể loại thành công");
    }
    
    permissionLibrarian();
    return (
        <div>
            <Header_Main></Header_Main>   
            <div> 
                <form id="registerNewBookTypeForm" onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmit();
                }}> 
                    <div>
                        <label htmlFor="bookTypeName">Tên thể loại sách</label> 
                        <input type="text" id="bookTypeName" required/>
                    </div>
                    <div> 
                        <label htmlFor="bookTypeImage">Hình ảnh minh họa thể loại</label> 
                        <input type="file" id="bookTypeImage" required/>
                    </div>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </div>
        
    )
} 
export default RegisterNewBookTypeForm;