import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import { useNavigate } from "react-router-dom";
import BE_ENDPOINT from "../Env/EndPont";
import permissionReader from "../Env/PermissionReader";
import Swal from "sweetalert2";
function ChangeNormalInfo() 
{  
    
    const [user, setUser]= useState({}); 
    const navigate= useNavigate();
    useEffect(()=>{ 
        async function getUser() 
        {
            const userResponse= await fetch(BE_ENDPOINT+"find/user/"+localStorage.getItem("userId")); 
            console.log(localStorage.getItem("userId"));
            /*if(!user.ok)  
            { 
                console.log("Fail");
                return;
            } */
            const userData= await userResponse.json(); 
            console.log(userData);
            setUser(userData);
        } 
        getUser(); 
        

    },[])  
    async function onSubmit() 
    {
        const data = {
            fullname:document.getElementById("fullname").value,
            address:document.getElementById("address").value,
            phoneNumber:document.getElementById("phoneNumber").value
        }
        console.log(data)
        const response = await fetch(BE_ENDPOINT+"update/normal",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
             Swal.fire({
                        title:"Thất bại",
                        text:"Chỉnh sửa thông tin thất bạibại",
                        icon:"fail"
                      })
            return;
        } 
         Swal.fire({
                    title:"Thành công",
                    text:"Chỉnh sửa thông tin thành công",
                    icon:"success"
                  }).then((result)=>{
                    navigate("/user_information");
                  })
        
    } 
    permissionReader();
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Header_Main />

    <div>
        <br />
        <h2 style={{ color: '#333', textAlign: 'left' }}>Chỉnh sửa thông tin tài khoản</h2> 
        <br></br>

        <form id="info" onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            <div style={{ marginBottom: '10px', width:"300px" }}>
                <label htmlFor="fullname" style={{ display: 'block', marginBottom: '5px' }}>
                    Họ tên:
                </label>
                <input type="text" required id="fullname" defaultValue={user.fullname} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
            </div>
            <div style={{ marginBottom: '10px',width:"300px" }}>
                <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>
                    Địa chỉ:
                </label>
                <input type="text" required id="address" defaultValue={user.address} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
            </div>
            <div style={{ marginBottom: '10px', width:"300px"  }}>
                <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '5px' }}>
                    Số điện thoại:
                </label>
                <input type="tel" required id="phoneNumber" defaultValue={user.phoneNumber} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
            </div>
            <br />
            <div>
                <input type="submit" value="Xác nhận thay đổi" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} />
            </div>
        </form>
    </div>
</div>

    )
} 
export default ChangeNormalInfo