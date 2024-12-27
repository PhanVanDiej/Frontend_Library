import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionReader from "../Env/PermissionReader";
function RegulationPage() { 
    const [regulation, setRegulation] = useState({});
    useEffect(()=>{ 
        async function getRegulation() {
        const response =await  fetch(BE_ENDPOINT+"regulation");
        const responseData= await response.json();  
        console.log(responseData); 
        setRegulation(responseData);
        }
        getRegulation(); 
        
    },[]) 
    permissionReader();
    return (
        <div>
        <Header_Main>

        </Header_Main> 
        <div>
            <h2>Qui định thư viện</h2>
        </div>
        <div>
            <ul>
                <li>Độc giả phải giữ gìn sách cẩn thận, khi mượn sách phải trả sách đúng hạn</li> 
                <li>Khi độc giả mượn sách, mặc định hạn trả sẽ là {regulation.defaultBorrowingDays} ngày sau ngày mượn. Nếu mượn thông qua website thì sẽ có 2 ngày để lấy sách, nếu quá {regulation.daysToTakeBook} ngày không lấy sách thì phiếu mượn sẽ bị hủy</li>
                <li>Nếu độc giả trả trễ hạn, mỗi ngày sẽ tính vào tiền phạt {regulation.moneyLatePerDay} đồng</li>
                <li>Nếu quá hạn trả sách {regulation.daysToLockUser} ngày mà độc giả vẫn chưa trả sách, tài khoản của độc giả sẽ bị khóa</li>
            </ul>
        </div>
        </div> 
    )
} 
export default RegulationPage;