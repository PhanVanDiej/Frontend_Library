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
    function onDenyRenewal(item) 
    {
        Swal.fire({
            title:"Xác nhận",
            text:"Từ chối gia hạn",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"Có",
            cancelButtonText:"Không"
        }
        ).then((result)=>{
            if(result.isConfirmed) 
            {
                onResponseRenewal(item,"Deny");
            }
        })
    }
    permissionLibrarian();
    return (

        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <h2>Danh sách các yêu cầu gia hạnhạn</h2>  
                <div>
                    <input type="text" id="search" placeholder="Tim kiem bang ma doc gia"/> 
                    <button>Tìm</button>
                </div>
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Mã tài khoản</th> 
                                <th>Họ tên</th> 
                                <th>Mã phiếu mượn</th> 
                                <th>Mã sách</th> 
                                <th>Tên sách</th> 
                                <th>Ngày mượn</th> 
                                <th>Gia hạn đến</th> 
                                <th>Chấp nhận</th> 
                                <th>Từ chối</th>
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
                                            }>Chấp nhận</button></td> 
                                            <td><button  onClick={
                                                (e)=>{
                                                    e.preventDefault();
                                                    onDenyRenewal(item);
                                                }
                                            }>Từ chối</button></td>
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