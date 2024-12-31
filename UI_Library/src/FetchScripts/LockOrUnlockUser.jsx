import React from "react"; 
import BE_ENDPOINT from "../Env/EndPont";
async function lockOrUnlockUser(userId, isLock) 
{ 
    let endPoint;
    if(isLock) 
    {
        endPoint=BE_ENDPOINT+"librarian/lock/"+userId;
    } 
    else  
    {
        endPoint=BE_ENDPOINT+"librarian/unlock/user/"+userId;
    }
    const response = await fetch(endPoint,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });
    if(!response.ok) 
    {
        alert("Fail");
        return;
    } 

    alert("Success");
    return;
} 
export default lockOrUnlockUser;