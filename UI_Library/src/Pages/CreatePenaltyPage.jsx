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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <Header_Main />
    <br></br>
    <div>
        <h2 style={{ color: '#333', textAlign: 'left' }}>
            Lập phiếu phạt
        </h2> 
        <br></br>
        <div style={{ marginBottom: '20px' }}>
            <form onSubmit={(e)=>{
                e.preventDefault();
                createPenalty();
            }}>
                <label htmlFor="readerId" style={{ display: 'block', marginBottom: '10px' }}>Mã tài khoản độc giả</label>
                <input type="number" id="readerId" required style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />

                <label htmlFor="money" style={{ display: 'block', marginBottom: '10px' }}>Số tiền phạt</label>
                <input type="number" id="money" required style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }} />

                <label htmlFor="penaltyMessage" style={{ display: 'block', marginBottom: '10px' }}>Nội dung (không quá 50 từ)</label>
                <textarea id="penaltyMessage" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '500px' }}></textarea>
                <br></br>

                <input type="submit" value="Tạo phiếu phạt" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }} />
            </form>
        </div>
    </div>
</div>

    )
} 
export default CreatePenalty;
