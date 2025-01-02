import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import PenaltyItem from "../Components/PenaltyItem";
import '../Styles/Pages/PenaltyList.css'
const example = [
    {
        id: "C001",
        reader: {
            userId: "U101",
            fullname: "Alice Johnson"
        },
        money: "25.50",
        content: "Purchased 3 books on mystery and thriller."
    },
    {
        id: "C002",
        reader: {
            userId: "U102",
            fullname: "Bob Smith"
        },
        money: "15.75",
        content: "Bought a guidebook on JavaScript programming."
    },
    {
        id: "C003",
        reader: {
            userId: "U103",
            fullname: "Charlie Brown"
        },
        money: "40.00",
        content: "Acquired 5 novels from the romance genre."
    },
    {
        id: "C004",
        reader: {
            userId: "U104",
            fullname: "Diana Prince"
        },
        money: "10.99",
        content: "Purchased a single copy of a cookbook."
    },
    {
        id: "C005",
        reader: {
            userId: "U105",
            fullname: "Ethan Hunt"
        },
        money: "60.00",
        content: "Bought a complete set of sci-fi series books."
    }
];

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
                        {penaltyList.map((item, index)=>( //penaltyList
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