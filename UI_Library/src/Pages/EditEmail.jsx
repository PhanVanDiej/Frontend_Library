import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main"; 
import BE_ENDPOINT from "../Env/EndPont";
import { useNavigate } from "react-router-dom";
function EditEmail() 
{
    const [user, setUser] = useState([]); 
    const navigate = useNavigate();
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
        const response= await fetch(BE_ENDPOINT+"update/email",{
            method:"PUT",
            headers:{
                "Content-Type":"text/plain",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:document.getElementById("email").value
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        } 
        alert("Success"); 
        navigate("/login");
    }
    return (
        <div>
            <Header_Main></Header_Main> 
            <div>
                <h2>Thay doi email</h2> 
                <div>
                    <form id="edit_email">
                        <div>
                            <label htmlFor="emailAddress">Dia chi email moi:</label> 
                            <input type="email" id="emailAddress" required/>
                        </div>  
                        <br></br>
                        <div>
                            <input type="submit" value="Xac nhan"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 
export default EditEmail;