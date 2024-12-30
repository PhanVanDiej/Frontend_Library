import React from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
function CreatePenalty() 
{  
    const navigate= useNavigate();
    async function createPenalty() 
    {
        const data = {
            readerId:document.getElementById("readerId").value,
            money:document.getElementById("money").value,
            content:document.getElementById("penaltyMessage").value
        }
        const response = await fetch(BE_ENDPOINT+"librarian/create_penalty",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            Swal.showValidationMessage("Tài khoản độc giả không thể thực hiện thao tác này");
            return;
        }  
        Swal.fire({
            title:"Thành công",
            text:"Tạo phiếu phạt thành công",
            icon:"success"
        }).then((result)=>{
            if(result.isConfirmed) 
            {
                navigate("/penalty_list");
                return;
            }
        })
        

    } 
    permissionLibrarian();
    return (
        <div>
            <Header_Main></Header_Main> 
            <div>
                <h2>
                    Lập phiếu phạt
                </h2>
                <div>
                    <form>
                        <label htmlFor="readerId">Mã tài khoản độc giả</label> 
                        <input type="number" id="readerId" required/> 

                        <label htmlFor="money">Số tiền phạt</label> 
                        <input type="number" id="money" required/>

                        <label htmlFor="penaltyMessage">Nội dung (không quá 50 từ)</label> 
                        <textarea id="penaltyMessage"></textarea> 

                        <input type="submit" value="Tạo phiếu phạt"/>
                    </form>
                </div>
            </div>
        </div>
    )
} 
export default CreatePenalty;
