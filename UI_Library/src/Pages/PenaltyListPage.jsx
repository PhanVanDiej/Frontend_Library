import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import PenaltyItem from "../Components/PenaltyItem";
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
            <div className="main-content">
                <h2 className="title-page">Danh sách các phiếu phạt</h2> 
                <div className="content-table">
                    {/* <table border={1}>
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
                    </table> */}
                    <div className="penalty-list-header object-list-header">
                        <div className="STT">STT</div>
                        <div className="penalty-id">Mã phiếu phạt</div>
                        <div className="user-id">Mã tài khoản</div>
                        <div className="user-name">Họ tên</div>
                        <div className="money">Tiền phạt</div>
                        <div className="content">Nội dung phạt</div>
                    </div>
                    <div className="header-border-line"></div>
                    <div className="object-list-data penalty-list-data">
                        {penaltyList.map((item, index)=>(
                            <PenaltyItem
                            index={index+1}
                            item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyList;