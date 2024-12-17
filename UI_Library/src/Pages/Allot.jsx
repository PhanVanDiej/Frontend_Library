import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
function AllotPage() 
{  
    const [listWorkDetail, setListWorkDetail]= useState([]);  
    async function onDeleteWorkDetail(workDetailId) 
    {
        const response= await fetch(BE_ENDPOINT+"admin/deleteWorkDate/"+workDetailId,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Xoa phan cong that bai");
            return;
        } 
        alert("Xoa phan cong thanh cong");
        window.location.reload();
    }
    async function onSubmitWorkDetail() 
    {
        const data = {
            librarianId:document.getElementById("librarianCode").value,
            workDate:document.getElementById("workDay").value
        };
        const response = await fetch(BE_ENDPOINT+"admin/addWorkDetail",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            alert("Them phan cong that bai");
            return;
        } 
        await alert("Them phan cong thanh cong"); 
        window.location.reload();
        
    }
    useEffect(()=>{ 
        async function getListWorkFromServer() 
        { 
            
            const response = await fetch(BE_ENDPOINT+"admin/getAllWorkDetail",
                {
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                }
            );
            if(!response.ok) 
            {
                return;
            } 
            const responseData = await response.json();
            setListWorkDetail(responseData.reverse());
        }
        getListWorkFromServer();

    },[])
    return (
        <div>
            <Header_Main>

            </Header_Main>
            <div>
                <h2>Phan cong thu thu</h2>
            </div> 
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitWorkDetail();
                }}>
                    <label htmlFor="librarianCode">Nhap ma thu thu</label> 
                    <input id="librarianCode" type="number" required/> 
                    <br></br>
                    <label htmlFor="workDay">Nhap ngay lam viec</label> 
                    <input type="date" id="workDay" required min={new Date()}/> 
                    <br></br>
                    <input type="submit" value="Them" />
                </form>
            </div>
            <div>
                <h3>Lich su phan cong</h3> 
                <table border={1}>
                    <thead>
                        <tr>
                            <th>
                                STT
                            </th> 
                            <th>Ma thu thu</th> 
                            <th>Ten thu thu</th>
                            <th>Ngay lam viec</th> 
                            <th>Xoa</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {
                            listWorkDetail.map((item, index)=>{
                                return (
                                    <tr>
                                        <td>{index+1}</td> 
                                        <td>{item.librarian.userId}</td>  
                                        <td>{item.librarian.fullname}</td>
                                        <td>{formatDate(item.workDate)}</td> 
                                        <td><button onClick={(e)=>{
                                            e.preventDefault();
                                            onDeleteWorkDetail(item.id)
                                        }}>Xoa phan cong</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
} 
export default AllotPage;