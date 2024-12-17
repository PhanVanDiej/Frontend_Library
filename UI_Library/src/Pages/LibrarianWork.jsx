import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
function WorkDateTable() 
{ 
    const [listWorkDate, setListWorkDate]= useState([]);
    useEffect(()=>{ 
        async function getWorkDate() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/getAllWorkDate",{
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
            setListWorkDate(responseData.reverse());
        }
        getWorkDate();
    },[])
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <h2>Lich lam viec</h2>
                <br></br>
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th>  
                                
                                <th>Ngay lam viec</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                listWorkDate.map((item, index)=>{
                                     return (<tr>
                                        <td>{index=1}</td> 
                                        <td>{formatDate(item.workDate)}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 
export default WorkDateTable;