import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import permissionLibrarian from "../Env/PermissionLibrarian";
function BorrowingDetailPage() 
{
    const [borrowDetailList, setBorrowDetailList]= useState([]);
    const [selectedBorrowDetailList, setSelectedBorrowDetailList]= useState([]); 
    
    const navigate= useNavigate();
    useEffect(()=>{ 
        async function getAllBorrowDetail() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/all_borrow_detail",{
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
            setBorrowDetailList(responseData.reverse());
            setSelectedBorrowDetailList(responseData.reverse());
        }
        getAllBorrowDetail();

    },[]);
    function renewalOffline(item) 
    { 
        const oldExpireDate = item.expireDate;
        const htmlTag=`<input id="newExpireDate" type="date" min=${oldExpireDate}/>`
        Swal.fire({
            title:"Chọn ngày trả mới",
            html:htmlTag,
            focusConfirm:false,
            preConfirm:()=>{
            const date = Swal.getPopup().querySelector('#newExpireDate').value; 
            if (!date) { Swal.showValidationMessage(`Vui lòng chọn ngày trả mới`); } return { newExpireDate: date }}
        }).then((result)=>{
            if(result.isConfirmed) 
            {
                onRenewal(item, result.value);
            }
        })
    } 
    function navigateToUserInfo(item) 
    { 
        navigate("/reader_management",{
            state:{user:item.service.reader}
        })
    }
    function DestroyBookAndLockUser(item) 
    {
        Swal.fire(
            {
                title:"Xác nhận",
                text:"Hủy sách và khóa tài khoản độc giả",
                icon:"warning"
            }
        ).then((result)=>{
            if(result.isConfirmed) 
            {
                onDestroyBookAndLockUser(item)
            }
        })
    } 
    async function onDestroyBookAndLockUser(item) 
    {
        const response = await fetch(BE_ENDPOINT+"librarian/destroy_book_lock_user/"+item.id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            Swal.fire(
                {
                    title:"Thất bại",
                    text:"Thao tác thất bại", 
                    icon:"fail"
                }
            );
            return;
        } 
        Swal.fire(
            {
                title:"Thành công",
                text:"Thao tác thành công",
                icon:"success"
            }
        ).then((result)=>{
            window.location.reload();
        })
    }
    async function onRenewal(item, newExpireDate) 
    { 
        const data = {
            newExpireDate:newExpireDate
        }
        const response = await fetch(BE_ENDPOINT+"librarian/renewalOffline/"+item.id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            Swal.fire({
                title:"Gia hạn thất bại",
                text:"Vui lòng thử lại",
                icon:"fail"
            });
            return;
        } 
        Swal.fire({
            title:"Gia hạn thành công",
            text:"Gia hạn sách thành công",
            icon:"success"
        }).then((result)=>{
            window.location.reload();
        })
    }
    function displayAction(item) 
    {
        if(item.status=="RETURNED")
        {
            return "Đã trả";
        }  
        if(item.status=="CANCELLED") 
        {
            return "Đã hủy";
        }
        if(item.status=="PENDING") 
        {
            return (<button
                onClick={(e)=>{
                    e.preventDefault();
                    onTakeBook(item);
                }} 
            
            >Lấy sách</button>);
        } 
        if(item.status=="BORROWING") 
        { 
            const currentDate= new Date();
            console.log(currentDate) 
            const expireDate= new Date(item.expireDate); 
            console.log(expireDate);
            if(currentDate.getTime()>expireDate.getTime()) 
            {
                return (<div><button
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            onReturnBook(item);
                        }
                    }
                    >Nhận sách trả</button> 
                    <button onClick={
                        (e)=>{
                            e.preventDefault();
                            navigateToUserInfo(item);
                        }
                    }>Thông tin độc giả</button> 
                    <button  onClick={
                        (e)=>{
                            e.preventDefault();
                            DestroyBookAndLockUser(item);
                        }
                    }>Hủy sách và khóa tài khoản</button>
                    </div> 

                
                )
            }
            return (<div><button
            onClick={
                (e)=>{
                    e.preventDefault();
                    onReturnBook(item);
                }
            }
            
            >Nhận sách trả</button>
            <button   
            onClick={(e)=>{
                e.preventDefault();
                renewalOffline(item);
            }}
            >Gia hạn</button>
            
            </div>
        
        )
        } 
        if(item.status=="RENEWAL") 
        {
            return (
                <button 
                onClick={(e)=>{
                    e.preventDefault();
                    navigate("/renewal_request");
                    return;
                }}
                >Phản hồi gia hạn</button>
            )
        }
    } 
    async function onTakeBook(item) 
    {
        const response = await fetch(BE_ENDPOINT+"librarian/readerTakeBook/"+item.id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        }
        alert("Success");
        window.location.reload();
    } 
    async function onReturnBook(item) 
    {
        const response = await fetch(BE_ENDPOINT+"librarian/returnBook/"+item.id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        }
        const responseMessage= await response.text();
        if(responseMessage!="Success") 
        {
            navigate("/penalty/"+responseMessage);
            console.log(responseMessage);
            return;
        } 
        alert("Success");
        window.location.reload();
    } 
    function onSearch(borrowId) {
        const listResult= borrowDetailList.filter((item)=>{
            return item.service.servieId= borrowId;
        }) 
        setSelectedBorrowDetailList(listResult);
    }
    permissionLibrarian();
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div> 
                <h2>Danh sách các phiếu mượnmượn</h2>
                <div>
                    <button>Tất cả</button> 
                    <button>Đang chờ lấy</button> 
                    <button>Đang được mượn</button> 
                    <button>Đã trả</button>
                </div> 
                <div>
                <input type="number" id="searchDate" placeholder="Tìm kiếm bằng mã phiếu"/> 
                <button  onClick={(e)=>{
                    e.preventDefault();
                    onSearch(document.getElementById("searchDate").value);
                }}>Tìm</button>
                </div>
                <table border={1}>
                   <thead>
                    <tr>
                        <th>STT</th> 
                        <th>Mã phiếu mượn</th> 
                        <th>Mã sách</th> 
                        <th>Tựa sách</th> 
                        <th>Mã độc giả</th> 
                        <th>Tên độc giả</th> 
                        <th>Ngày mượn</th> 
                        <th>Ngày trả</th> 
                        <th>Hành động</th>
                    </tr>
                   </thead>
                   <tbody>
                    {
                        selectedBorrowDetailList.map((item, index)=>{
                            return (
                                <tr>
                                    <td>{index+1}</td> 
                                    <td>{item.service.serviceId}</td>
                                    <td>{item.book.id}</td> 
                                    <td>{item.book.title.name}</td>
                                    <td>{item.service.reader.userId}</td> 
                                    <td>{item.service.reader.fullname}</td> 
                                    <td>{formatDate(item.service.implementDate)}</td>
                                    <td>{formatDate(item.expireDate)}</td>
                                    <td>{displayAction(item)}</td>
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
export default BorrowingDetailPage;