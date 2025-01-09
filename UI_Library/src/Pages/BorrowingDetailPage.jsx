import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import permissionLibrarian from "../Env/PermissionLibrarian";
import '../Styles/Pages/Common.css';
import BorrowSlipItem from "../Components/borrowSlipItem";
import '../Styles/Pages/BorrowingDetail.css'
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
            return (<p style={{color:'green',fontSize:'16px'}}>Đã trả</p>)
        }  
        if(item.status=="CANCELLED") 
        {
            return (<p style={{color:"orange",fontSize:'16px'}}>Đã hủy</p>)
        }
        if(item.status=="PENDING") 
        {
            return (<button
            className="action-btn confirm-btn"
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
                return (<div style={{display:'flex',flexDirection:'column',gap:'3px'}}><button
                
                className="action-btn confirm-btn"
                    onClick={
                        (e)=>{
                            e.preventDefault();
                            onReturnBook(item);
                        }
                    }
                    >Nhận sách trả</button> 
                    <button className="delete-btn action-btn"  onClick={
                        (e)=>{
                            e.preventDefault();
                            DestroyBookAndLockUser(item);
                        }
                    }>Hủy sách và khóa tài khoản</button>
                    </div> 

                
                )
            }
            return (<div style={{display:'flex',flexDirection:'column',gap:'3px'}}><button
            className="action-btn confirm-btn"
            onClick={
                (e)=>{
                    e.preventDefault();
                    onReturnBook(item);
                }
            }
            
            >Nhận sách trả</button>
            <button   
            className="cancel-btn action-btn"
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
             Swal.fire({
                        title:"Thất bại",
                        text:"Lấy sách  thất bại",
                        icon:"fail"
                      })
            return;
        }
         Swal.fire({
                    title:"Thành công",
                    text:"Độc giả lấy sách thành công",
                    icon:"success"
                  })
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
             Swal.fire({
                        title:"Thất bại",
                        text:"Nhận sách trả thất bại",
                        icon:"fail"
                      })
            return;
        }
        const responseMessage= await response.text();
        if(responseMessage!="Success") 
        {
            navigate("/penalty/"+responseMessage);
            console.log(responseMessage);
            return;
        } 
         Swal.fire({
                    title:"Thành công",
                    text:"Nhận sách trả thành công",
                    icon:"success"
                  })
        window.location.reload();
    } 
    function onSearch(borrowId) {
        const listResult= borrowDetailList.filter((item)=>{
            return item.service.serviceId == borrowId;
        }) 
        setSelectedBorrowDetailList(listResult);
    }
    permissionLibrarian();
    return (
        <div>
        <Header_Main />
    
        <div className="main-content">
            <h2 className="title-page">Danh sách các phiếu mượn</h2> 
            
            <div style={{display:"flex",gap:"10px"}}>
                <input className="search-input" type="number" id="searchDate" placeholder="Tìm kiếm bằng mã phiếu"/>
                <button className="action-btn confirm-btn"
                onClick={(e) => {
                    e.preventDefault();
                    onSearch(document.getElementById("searchDate").value);
                }}>Tìm</button>
            </div>
            <div className="content-table">
            {/* <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>STT</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mã phiếu mượn</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mã sách</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tựa sách</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mã độc giả</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên độc giả</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ngày mượn</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ngày trả</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedBorrowDetailList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.service.serviceId}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.book.id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.book.title.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.service.reader.userId}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.service.reader.fullname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(item.service.implementDate)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(item.expireDate)}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{displayAction(item)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>  */}
            <div className="borrowSlip-list-header object-list-header">
                <div className="STT">STT</div>
                <div className="slip-id">Mã phiếu mượn</div>
                <div className="book-id">Mã sách</div>
                <div className="book-title">Tựa sách</div>
                <div className="reader-id">Mã đọc giả</div>
                <div className="reader-fullname">Tên đọc giả</div>
                <div className="implement-date">Ngày mượn</div>
                <div className="expire-date">Ngày trả</div>
                <div className="user-action">Hành động</div>
            </div>
            <div className="header-border-line"></div>
            <div className="object-list-data borrowSlip-list-data">
                {selectedBorrowDetailList.map((item, index) => (
                    <BorrowSlipItem
                    index={index+1}
                    item={item}
                    display={()=>displayAction(item)}/>
                ))}
            </div>
            </div>
        </div>
    </div>
    
    )
} 
export default BorrowingDetailPage;