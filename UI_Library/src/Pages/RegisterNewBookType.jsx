import React, { useEffect } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import Swal from "sweetalert2";
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
            Swal.fire({
                title:"Thất bại",
                text:"Upload hình ảnh thất bại",
                icon:"fail"
              })
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
             Swal.fire({
                                        title:"Thất bại",
                                        text:"Tạo thể loại thất bại",
                                        icon:"fail"
                                      })
            return ;
        } 
        Swal.fire({
            title:"Thành công",
            text:"Tạo thể loạiloại thành công",
            icon:"success"
          }).then((result)=>{
            const navigate = useNavigate();
            navigate("/home");
          })
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