import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import permissionReader from "../Env/PermissionReader";
function PenaltyHistoryPage() 
{ 
    const [listPenalty, setListPenalty] = useState([]);
    useEffect(()=>{ 
        async function getPenaltyList() 
        {
            const response = await fetch(BE_ENDPOINT+"reader/allPenalty",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("token")
                } 
            });
            if(!response.ok) 
            {
                return;
            }  
            const responseData = await response.json();
            setListPenalty(responseData.reverse());
        }
        getPenaltyList();

    },[])
    permissionReader();
    return (
        <div>
            <Header_Main></Header_Main> 
            <div>
                <h2>Lịch sử vi phạmphạm</h2> 
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Ngày vi phạm</th> 
                                <th>Nội dung</th> 
                                <th>Số tiền phạt</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                listPenalty.map((item, index)=>{
                                    return (
                                        <tr>
                                            <th>{index+1}</th> 
                                            <th>{formatDate(item.implementDate)}</th> 
                                            <th>{item.content}</th> 
                                            <th>{item.money}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyHistoryPage;