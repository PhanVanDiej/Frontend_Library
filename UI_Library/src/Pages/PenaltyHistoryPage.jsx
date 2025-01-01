import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import permissionReader from "../Env/PermissionReader";
import ReaderPenalty_Item from "../Components/ReaderPenalty_Item";
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
            <div className="main-content">
                <h2 className="title-page">Lịch sử vi phạm</h2> 
                <div className="content-table">
                    {/* <table>
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
                    </table> */}
                    <div className="readerPenalty-list-header object-list-header">
                        <div className="STT">STT</div>
                        <div className="bill-id">Ngày vi phạm</div>
                        <div className="bookTitle-id">Nội dung</div>
                        <div className="bookTitle-name">Số tiền phạt</div>
                    </div>
                    <div className="header-border-line"></div>
                    <div className="object-list-data readerPenalty-list-data">
                    {listPenalty.map((item, index)=>(
                        <ReaderPenalty_Item
                        index={index+1}
                        item={item}/>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default PenaltyHistoryPage;