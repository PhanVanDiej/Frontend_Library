import React, { useEffect, useState } from "react"; 
import { Navigate, useParams } from "react-router-dom";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
function PenaltyPage() 
{
    const penaltyId = useParams();
    const [penalty, setPenalty] = useState({});
    useEffect(()=>{ 
        async function getPenalty() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/penalty/"+penaltyId.id,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json(); 
            console.log(responseData);
            setPenalty(responseData);
        } 
        getPenalty();
    },[])
    async function handleSave() 
    {
        const data= {
            content:document.getElementById("content").value
        } 
        const response = await fetch(BE_ENDPOINT+"librarian/update/penalty/"+penaltyId.id,{
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
    }

    return (<div>
            <Header_Main></Header_Main> 
            <div>
                <h2>Phieu phat</h2> 
                <div>
                    <div>Ma phieu phat: {penalty?.id} </div> 
                    <div>Ma doc gia: {penalty?.reader?.userId}</div> 
                    <div>Ten doc gia: {penalty?.reader?.fullname} </div>  
                    <div>Noi dung phat (khong qua 100 ki tu)</div>
                    <textarea id="content"></textarea>
                    <br></br>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleSave();
                    }}>Luu</button> 
                    <button onClick={(e)=>{
                        e.preventDefault();
                        
                    }}
                    >Huy</button>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyPage;