import React, { useState, useEffect } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import displayImageURL from "../Env/DisplayImage";
import permissionLibrarian from "../Env/PermissionLibrarian";
import Swal from "sweetalert2";
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
            {
                 Swal.fire({
                            title:"Thất bại",
                            text:"Upload hình ảnh thất bại",
                            icon:"fail"
                          })
                return;
                
            } 
            const putImageMessage= await putImage.text();
            console.log(putImageMessage);
            if(putImageMessage!="Update success") 
            {
                Swal.fire({
                    title:"Thất bại",
                    text:"Upload hình ảnh thất bại",
                    icon:"fail"
                  }) 
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
                Swal.fire({
                    title:"Thất bại",
                    text:"Update thông tin thất bại",
                    icon:"success"
                  })
                return;
            } 
            const putInfoMessage = await putInfo.text();
            Swal.fire({
                title:"Thành công",
                text:"Update thông tin thành công",
                icon:"success"
              }).then((result)=>{
                const navigate = useNavigate();
                navigate("/home");
              })

        }
    }
    permissionLibrarian();
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Header_Main />

    <h2 style={{ color: '#333', textAlign: 'center' }}>Thay đổi thông tin thể loại sách</h2>
    <form id="editBookTypeForm">
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="bookTypeName" style={{ display: 'block', marginBottom: '5px' }}>Tên thể loại:</label>
            <input type="text" id="bookTypeName" defaultValue={bookType?.name} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Hình ảnh thể loại sách</label>
            <img src={displayImageURL(bookType?.imageData)} style={{ display: 'block', margin: '10px auto',width:"200px", height:"200px" }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="bookTypeImage" style={{ display: 'block', marginBottom: '5px' }}>Upload file ảnh nếu muốn thay đổi hình minh họa thể loại</label>
            <input type="file" id="bookTypeImage" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />
        </div>
        <div>
            <input type="submit" value="Xác nhận" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
        </div>
    </form>
    <p id="MessageZone"></p>
</div>

    )
} 
export default EditBookTypeForm;