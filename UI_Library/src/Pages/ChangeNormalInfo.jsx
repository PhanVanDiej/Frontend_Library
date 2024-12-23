import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import { useNavigate } from "react-router-dom";
import BE_ENDPOINT from "../Env/EndPont";
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
            alert("Fail");
            return;
        } 
        alert("Success"); 
        navigate("/user_information");
        
    }
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div> 
                <br></br>
                <h2>Chinh sua thong tin tai khoan</h2>

                <form id="info" onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmit();
                }}> 
                    <div>
                        <label htmlFor="fullname"> 
                            Ten tai khoan:
                            </label> 
                            <input type="text" required id="fullname" defaultValue={user.fullname}/>
                            </div> 
                    <div>
                        <label htmlFor="address">
                            Dia chi: 
                        </label> 
                        <input type="text" required id="address" defaultValue={user.address}/>
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" defaultValue={user.phoneNumber}>
                            So dien thoai
                        </label> 
                        <input type="tel" required id="phoneNumber" defaultValue={user.phoneNumber}/>
                    </div> 
                    <br></br>
                    <div>
                        <input type="submit" value="Xac nhan thay doi"/>
                    </div>


                </form>
            </div>
        </div>
    )
} 
export default ChangeNormalInfo