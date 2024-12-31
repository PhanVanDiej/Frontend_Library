import React, { useEffect, useState } from "react"; 
import BE_ENDPOINT from "../Env/EndPont";
function ForgetPassword() 
{ 
    const [message, setMessage]= useState(""); 
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(()=>{
        async function onResetPassword() 
        {
            
            const response = await fetch(BE_ENDPOINT+"forget_password",{
                method:"PUT",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:document.getElementById("resetEmail").value
            });
            const responseData= await response.text();
            document.getElementById("MessageArea").innerHTML=responseData;
        } 
        if(isSubmit) 
        {
            setIsSubmit(false);
            onResetPassword(); 
            
        }
    },[isSubmit])
    
    
    return (    <div>
        <form id="forgetPassword">
            <div>
            <label htmlFor ="resetEmail">Dia chi email   </label> 
            <input type="email" id="resetEmail" required/>
            </div>
            
        </form> 
        <button onClick={(e)=>{
            e.preventDefault(); 
            console.log("submit"); 
            setIsSubmit(true);
        }} >Khoi phuc mat khau</button>
        <p id="MessageArea"></p>
        <br></br>
        <button id="backToLogin" onClick={
            ()=>{
                window.location.href="/login";
            }
        }>Quay lai dang nhap</button>
    </div>
    );
} 
export default ForgetPassword;