import React, { useEffect, useState } from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/HistoryAction.css'
import BE_ENDPOINT from '../Env/EndPont'; 
import formatDate from '../Env/FormatDate'; 
import Swal from "sweetalert2";
import permissionReader from '../Env/PermissionReader';
import HistoryAction_Item from '../Components/HistoryAction_Item.jsx';
const HistoryAction = () => { 
  
  const [listBorrowingDetail, setListBorrowingDetail] = useState([]); 
  const [listSelectedBorrowingDetail, setListSelectedBorrowingDetail] = useState([]); 
  function chooseRenewalDate(item) 
  { 
     const oldExpireDate = item.expireDate;
     const htmlTag=`<input id="newExpireDate" type="date" min=${oldExpireDate}/>`
      Swal.fire(
        {
          title:"Chon ngay tra moi",
          html:htmlTag,
          focusConfirm:false,
          preConfirm:()=>{
            const date = Swal.getPopup().querySelector('#newExpireDate').value; 
            if (!date) { Swal.showValidationMessage(`Please select a date`); } return { newExpireDate: date }}
        }
      ).then(
        (result)=>{
          if(result.isConfirmed) 
          { 
            onRenewal(item, result.value);
          }
        }
      ) 
    }
  useEffect(()=>{ 
    async function getBookBorrowingDetail() 
    {
        const response = await fetch(BE_ENDPOINT+"reader/history",{
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
        setListBorrowingDetail(responseData.reverse()); 
        setListSelectedBorrowingDetail(responseData.reverse());
    } 
    getBookBorrowingDetail();

  },[])
  function displayStatus(status) 
  {
    if(status=="PENDING") 
    {
      return (<p style={{color:'orange'}}>Đang chờ lấy</p>);
    } 
    if(status=="CANCELLED"||status=="DESTROY") 
    {
      return (<p style={{color:'red'}}>Đã hủy</p>);
    } 
    if(status=="BORROWING")
    {
      return (<p style={{color:'blue'}}>Đang mượn</p>);
    }
    if(status=="RETURNED") 
    {
      return (<p style={{color:'green'}}>Đã trả</p>);
    } 
    if(status=="RENEWAL") 
    {
      return (<p style={{color:'black'}}>Đang chờ gia hạn</p>);
    }
  } 
  function displayAction(status, item) 
  {
    if(status=="PENDING") 
      {
        return (
          <button className='action-btn delete-btn' onClick={(e)=>{
            e.preventDefault();
            onCancel(item);
          }}>Hủy</button>
        );
      } 
    if(status=="BORROWING") 
    {
      return (
        < button className='action-btn confirm-btn' onClick={(e)=>{
          e.preventDefault();
          chooseRenewalDate(item);
        }} 
        >Gia hạn</button>
      );
    } 
    return "";
  } 

  async function onCancel(item) 
  {
      
      const response= await fetch(BE_ENDPOINT+"reader/cancel_borrow/"+item.id,{
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
                              text:"Hủy mượn sách thất bại",
                              icon:"fail"
                                  })
        return;
      } 
       Swal.fire({
                                  title:"Thành công",
                                  text:"Hủy phiếu mượn thành công",
                                  icon:"success"
                                }).then((result)=>{
                                  window.location.reload();
                                })
  }

  async function onRenewal(item, data) 
  { 
      const response = await fetch(BE_ENDPOINT+"reader/renewal/"+item.id,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify(data)
      });
      if(!response.ok) 
      {
        alert("Thất bại, vui lòng thử lại");
        return;
      } 
      alert("Thành công");
      window.location.reload();
  } 
  permissionReader();
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='main-content'>
        <div className='nav-cart-state'>
            <ul>
                <li onClick={
                  (e)=>{
                    e.preventDefault();
                    setListSelectedBorrowingDetail(listBorrowingDetail);
                  }
                }>Tất cả</li>

                <li onClick={(e)=>{
                  e.preventDefault();
                  setListSelectedBorrowingDetail(listBorrowingDetail.filter((item)=>{
                    return item.status=="PENDING"
                  }))
                }}>Chưa nhận sách</li>

                <li onClick={(e)=>{
                  e.preventDefault();
                  setListSelectedBorrowingDetail(listBorrowingDetail.filter((item)=>{
                    return (item.status=="BORROWING"||item.status=="RENEWAL")
                  }))
                }}>Đang mượn</li>

                <li  onClick={(e)=>{
                  e.preventDefault();
                  setListSelectedBorrowingDetail(listBorrowingDetail.filter((item)=>{
                    return item.status=="CANCELLED"
                  }))
                }}>Đã hủy</li> 

                <li  onClick={(e)=>{
                  e.preventDefault();
                  setListSelectedBorrowingDetail(listBorrowingDetail.filter((item)=>{
                    return item.status=="RETURNED"
                  }))
                }}
                >Đã trả</li>

            </ul>
        </div> 
        <br></br>
        <div className='content-table'>
            {/* <table border={1}> 
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã phiếu mượn</th> 
                  <th>Mã sách</th> 
                  <th>Tên sách</th> 
                  <th>Ngày mượn</th> 
                  <th>Ngày trả</th> 
                  <th>Trạng thái</th> 
                  <th>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {
                  listSelectedBorrowingDetail.map((item, index)=>{
                    return (
                      <tr>
                        <td>{index+1}</td> 
                        <td>{item.service.serviceId}</td> 
                        <td>{item.book.id}</td> 
                        <td>{item.book.title.name}</td> 
                        <td>{formatDate(item.service.implementDate)}</td> 
                        <td>{formatDate(item.expireDate)}</td> 
                        <td>{displayStatus(item.status)}</td> 
                        <td>{displayAction(item.status, item)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table> */}
            <div className="actionHistory-list-header object-list-header">
                    <div className="STT">STT</div>
                    <div className="bill-id">Mã phiếu mượn</div>
                    <div className="bookTitle-id">Mã sách</div>
                    <div className="bookTitle-name">Tên tựa sách</div>
                    <div className="implementDate">Ngày mượn</div>
                    <div className="expireDate">Ngày trả</div>
                    <div className="status">Trạng thái</div>
                    <div className="user-action">Hoạt động</div>
                </div>
                <div className="header-border-line"></div>
                <div className="object-list-data actionHistory-list-data">
                    {listSelectedBorrowingDetail.map((item, index)=>(
                        <HistoryAction_Item
                        index={index+1}
                        item={item}
                        displayAction={()=>displayAction(item.status,item)}
                        displayStatus={()=>displayStatus(item.status)}/>
                    ))}
                </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryAction
