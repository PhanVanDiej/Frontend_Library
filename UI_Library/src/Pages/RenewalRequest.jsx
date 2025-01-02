import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import formatDate from "../Env/FormatDate";
import Swal from "sweetalert2";
import permissionLibrarian from "../Env/PermissionLibrarian";
import RenewalItem from "../Components/RenewalItem";
import '../Styles/Pages/RenewalList.css';

const renewalListExample=[
    {
        reader_ID: "R1",
        reader_fullname: "Alice Johnson",
        slipID: "SL001",
        bookID: "B001",
        bookName: "The Great Gatsby",
        expireDate: "2025-01-15",
        newExpireDate: "2025-02-15"
    },
    {
        reader_ID: "R2",
        reader_fullname: "John Smith",
        slipID: "SL002",
        bookID: "B002",
        bookName: "1984",
        expireDate: "2025-01-20",
        newExpireDate: "2025-02-20"
    },
    {
        reader_ID: "R3",
        reader_fullname: "Emily Davis",
        slipID: "SL003",
        bookID: "B003",
        bookName: "To Kill a Mockingbird",
        expireDate: "2025-01-10",
        newExpireDate: "2025-02-10"
    },
    {
        reader_ID: "R4",
        reader_fullname: "Michael Brown",
        slipID: "SL004",
        bookID: "B004",
        bookName: "Pride and Prejudice",
        expireDate: "2025-01-12",
        newExpireDate: "2025-02-12"
    },
    {
        reader_ID: "R5",
        reader_fullname: "Sophia Wilson",
        slipID: "SL005",
        bookID: "B005",
        bookName: "Moby-Dick",
        expireDate: "2025-01-18",
        newExpireDate: "2025-02-18"
    }
]
function RenewalRequestPage() 
{ 
    const [selectedItem,setSeclectedItem]=useState(null);

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

    const handleOnAcceptClick=(item)=>{
        setSeclectedItem(item);
    }
    const handleOnRejectClick=(item)=>{
        setSeclectedItem(item);
    }
    return (

        <div>
            <Header_Main>

            </Header_Main> 
            <div className="main-content">
                <h2 className="title-page">Danh sách các yêu cầu gia hạn</h2>  
                <div className="filter-header">
                    <input className="search-input" type="text" id="search" placeholder="Tìm kiếm bằng mã đọc giả"/> 
                    <button className="action-btn confirm-btn">Tìm</button>
                </div>
                <div className="content-table">
                    {/* <table border={1}>
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
                    </table> */}
                    <div className="renewal-list-header">
                        <div className="STT">STT</div>
                        <div className="reader-id">Mã đọc giả</div>
                        <div className="reader-fullname">Tên đọc giả</div>
                        <div className="slip-id">Mã phiếu mượn</div>
                        <div className="book-id">Mã sách</div>
                        <div className="book-title">Tên sách</div>
                        <div className="expire-date">Ngày mượn</div>
                        <div className="new-expire-date">Gia hạn đến</div>
                        <div className="user-action">Hành động</div>
                    </div>
                    <div className="header-border-line"></div>
                    <div className="renewal-list-data">
                        {listRenewalRequest.map((item,index)=>(
                            <RenewalItem
                            index={index}
                            onAccept={()=>onResponseRenewal(item,"Accept")}
                            onReject={()=>onResponseRenewal(item,"Denied")}
                            item={item}/>
                        ))}
                    </div>
                </div>
            </div>
         </div>
    )
} 
export default RenewalRequestPage;