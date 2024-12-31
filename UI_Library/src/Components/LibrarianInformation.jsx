import React from "react";
import BE_ENDPOINT from "../Env/EndPont";
async function lockLibrarian(librarianId) 
{
    const response = await fetch(BE_ENDPOINT+"admin/lock/librarian/"+librarianId,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });
    if(!response.ok) 
    {
        alert("Khoa tai khoan thu thu that bai");
        return;
    } 
    alert("Khoa tai khoan thu thu thanh cong"); 
    window.location.reload();
} 
async function unlockLibrarian(librarianId) 
{
    const response = await fetch(BE_ENDPOINT+"admin/unlock/librarian/"+librarianId,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    });
    if(!response.ok) 
    {
        alert("Mo khoa tai khoan thu thu that bai");
        return;
    } 
    alert("Mo khoa tai khoan thu thu thanh cong"); 
    window.location.reload();
} 
async function onLockOrUnlock(state, librarianId) 
{
    if(state=="Khoa tai khoan")
    {
        await lockLibrarian(librarianId);
        return;
    } 
    if(state=="Mo khoa tai khoan") 
    {
        await unlockLibrarian(librarianId);
        return;
    }
}
function LibrarianDetail({librarian, itemId}) 
{ 
    let state="";
    if(librarian.enable==true)  
        state="Khoa tai khoan";
    else state="Mo khoa tai khoan";
    return (
        <tr>
            <td>{itemId}</td>
            <td>{librarian.userId}</td> 
            <td>{librarian.fullname}</td> 
            <td>{librarian.phoneNumber}</td> 
            <td>{librarian.email}</td> 
            <td>{librarian.address}</td> 
            <td><button onClick={(e)=>{
                e.preventDefault();
                onLockOrUnlock(state, librarian.userId);
            }}>
                {state}
                </button></td>
        </tr>
    );

}
export default LibrarianDetail;