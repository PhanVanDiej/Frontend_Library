import React, { useEffect, useState } from "react"; 
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import Swal from "sweetalert2";
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
             Swal.fire({
                                        title:"Thất bại",
                                        text:"Lập phiếu phạt thất bại",
                                        icon:"fail"
                                      })
            return;
        } 
         Swal.fire({
                                    title:"Thành công",
                                    text:"Lập phiếu phạt thành công",
                                    icon:"success"
                                  }).then((result)=>{
                                    const navigate = useNavigate();
                                    navigate("/reader_management");
                                  })
    }
    permissionLibrarian();
    return (<div>
            <Header_Main></Header_Main> 
            <div>
                <h2>Phiếu phạtphạt</h2> 
                <div>
                    <div>Mã phiếu phạt: {penalty?.id} </div> 
                    <div>Mã độc giả: {penalty?.reader?.userId}</div> 
                    <div>Tên độc giả: {penalty?.reader?.fullname} </div>  
                    <div>Nội dung phạt (không quá 100 kí tự)</div>
                    <textarea id="content"></textarea>
                    <br></br>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleSave();
                    }}>Lưu</button> 
                    <button onClick={(e)=>{
                        e.preventDefault();
                        
                    }}
                    >Hủy</button>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyPage;