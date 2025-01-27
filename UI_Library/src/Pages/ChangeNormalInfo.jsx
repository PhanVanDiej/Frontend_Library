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
        <div>
    <Header_Main />

    <div className="main-content-register-BookTitle">
        <h2 className="title-page">Chỉnh sửa thông tin tài khoản</h2> 
        <div className="form-regis-wrapper">
        <form className="form-primary" id="info" onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            <div className="form-control">
                <label htmlFor="fullname">
                    Họ tên:
                </label>
                <input type="text" required id="fullname" defaultValue={user.fullname} />
            </div>
            <div className="form-control">
                <label htmlFor="address">
                    Địa chỉ:
                </label>
                <input type="text" required id="address" defaultValue={user.address} />
            </div>
            <div className="form-control">
                <label htmlFor="phoneNumber">
                    Số điện thoại:
                </label>
                <input type="tel" required id="phoneNumber" defaultValue={user.phoneNumber} />
            </div>
            <input type="submit" value="Xác nhận thay đổi" className="submit-btn action-btn" />
            
        </form>
        </div>
    </div>
</div>

    )
} 
export default ChangeNormalInfo