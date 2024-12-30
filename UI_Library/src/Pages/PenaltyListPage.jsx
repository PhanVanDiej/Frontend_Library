import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
function PenaltyList() 
{
    const [penaltyList, setPenaltyList]= useState([]);
    useEffect(()=>{
        async function getPenaltyFromServer() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/penalty_all",{
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
            setPenaltyList(responseData.reverse());
        } 
        getPenaltyFromServer();
    },[]) 
    permissionLibrarian();
    return ( 
        <div>
        <Header_Main></Header_Main> 
            <div>
                <h2>Danh sách các phiếu phạtphạt</h2> 
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Mã phiếu phạt:</th> 
                                <th>Mã tài khoản:</th> 
                                <th>Họ tên:</th>
                                <th>Tiền phạt:</th> 
                                <th>Nội dung phạt:</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                penaltyList.map((item, index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td> 
                                            <td>{item.id}</td> 
                                            <td>{item.reader.userId}</td> 
                                            <td>{item.reader.fullname}</td> 
                                            <td>{item.money}</td> 
                                            <td>{item.content}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyList;