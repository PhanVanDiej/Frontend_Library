import React, { useEffect, useState } from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/HistoryAction.css'
import BE_ENDPOINT from '../Env/EndPont'; 
import formatDate from '../Env/FormatDate'; 
import Swal from "sweetalert2";
import permissionReader from '../Env/PermissionReader';
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
      return "Dang cho lay";
    } 
    if(status=="CANCELLED"||status=="DESTROY") 
    {
      return "Da huy";
    } 
    if(status=="BORROWING")
    {
      return "Dang muon";
    }
    if(status=="RETURNED") 
    {
      return "Da tra";
    } 
    if(status=="RENEWAL") 
    {
      return "Dang cho gia han";
    }
  } 
  function displayAction(status, item) 
  {
    if(status=="PENDING") 
      {
        return (
          <button onClick={(e)=>{
            e.preventDefault();
            onCancel(item);
          }}>Huy</button>
        );
      } 
    if(status=="BORROWING") 
    {
      return (
        < button onClick={(e)=>{
          e.preventDefault();
          chooseRenewalDate(item);
        }} 
        >Gia han</button>
      );
    } 
    return "";
  } 

  async function onCancel(item) 
  {
      const data= {
        serviceId:item.service.serviceId,
        bookId:[
          item.book.id
        ],
        status:"CANCELLED"
      }
      const response= await fetch(BE_ENDPOINT+"borrowing-card-detail",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify(data)
      });
      if(!response.ok) 
      {
        alert("Fail");
        return;
      } 
      alert("Success");
      window.location.reload();
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
        alert("Fail");
        return;
      } 
      alert("Success");
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
        <div className='history-borrow-list'>
            <table border={1}> 
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ma phieu muon</th> 
                  <th>Ma sach</th> 
                  <th>Ten sach</th> 
                  <th>Ngay muon</th> 
                  <th>Ngay tra</th> 
                  <th>Trang thai</th> 
                  <th>Hoat dong</th>
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
            </table>
        </div>
      </div>
    </div>
  )
}

export default HistoryAction
