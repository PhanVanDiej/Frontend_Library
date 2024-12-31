import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import Swal from "sweetalert2";
import permissionLibrarian from "../Env/PermissionLibrarian";
function RenewalRequestPage() 
{ 
    const [listRenewalRequest, setListRenewalRequest] = useState([]);
    const [listSelectedRenewalRequest, setListSelectedRenewalRequest]= useState([]);
    useEffect(()=>{ 
        async function getAllRenewalDetail() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/renewal_list",{
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
            console.log(responseData);
            setListRenewalRequest(responseData.reverse());
            setListSelectedRenewalRequest(responseData.reverse());
        }
        getAllRenewalDetail();

    },[]);
    async function onResponseRenewal(item, isAccept) 
    {
        const response = await fetch(BE_ENDPOINT+"librarian/response/renewal/"+item.id,{
            method:"PUT",
            headers:{
                "Content-Type":"text/plain",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:isAccept
        });
        if(!response.ok) 
        {
            Swal.fire({
                title:"Phản hồi thất bại!",
                text:"Vui lòng thử lại",
                icon:"fail"
            });
            return;
        }
        Swal.fire({
            title:"Phản hồi thành công!",
            text:"Đã phản hồi thành công ",
            icon:"success"
        }).then((result)=>{
            window.location.reload();
        });
        
    }
    function onAcceptRenewal(item){ 
        Swal.fire({
            title:"Xác nhận",
            text:"Chấp nhận gia hạn?",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Có",
            cancelButtonText:"Không"
        }
        ).then((result)=>{
            if(result.isConfirmed) 
            {
                onResponseRenewal(item,"Accept");
            }
        })

    } 
    permissionLibrarian();
    return (

        <div>
            <Header_Main>

            </Header_Main> 
            <div className="main-content">
                <h2 className="title-page">Danh sach cac yeu cau gia han</h2>  
                <div className="filter-header">
                    <input className="search-input" type="text" id="search" placeholder="Tìm kiếm bằng mã đọc giả"/> 
                    <button className="action-btn confirm-btn">Tìm</button>
                </div>
                <div className="content-table">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Ma doc gia</th> 
                                <th>Ten doc gia</th> 
                                <th>Ma phieu muon</th> 
                                <th>Ma sach</th> 
                                <th>Ten sach</th> 
                                <th>Ngay muon</th> 
                                <th>Gia han den</th> 
                                <th>Chap nhan</th> 
                                <th>Tu choi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listSelectedRenewalRequest.map((item, index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td> 
                                            <td>{item.borrowingCardDetail.service.reader.userId}</td> 
                                            <td>{item.borrowingCardDetail.service.reader.fullname}</td> 
                                            <td>{item.borrowingCardDetail.service.serviceId}</td> 
                                            <td>{item.borrowingCardDetail.book.id}</td> 
                                            <td>{item.borrowingCardDetail.book.title.name}</td> 
                                            <td>{formatDate(item.borrowingCardDetail.expireDate)}</td> 
                                            <td>{formatDate(item.newExpireDate)}</td>
                                            <td><button onClick={
                                                (e)=>{
                                                    e.preventDefault();
                                                    onAcceptRenewal(item);
                                                }
                                            }>Chap nhan</button></td> 
                                            <td><button>Tu choi</button></td>
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
export default RenewalRequestPage;