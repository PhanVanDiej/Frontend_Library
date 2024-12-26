import React, { useState, useEffect } from 'react'
import BE_ENDPOINT from '../Env/EndPont'; 
import { useNavigate } from 'react-router-dom';
import Header_Main from '../Components/Header_Main'; 
import ReactDOMServer from 'react-dom/server';
import Swal from 'sweetalert2';

const User_Information = () => { 
  const userId=localStorage.getItem("userId"); 
  const navigate= useNavigate();
  function  onClickEditNormalInformation() 
  {    
    navigate("/edit_normal_info");
  }  
  async function onChangeEmail(newEmail) 
  {
     const response = await fetch(BE_ENDPOINT+"update/email", {
      method:"PUT",
      headers:{
        "Content-Type":"text/plain",
        "Authorization":"Bearer "+localStorage.getItem("token")
      },
      body:newEmail
     });
    if(response.status==403) 
    {
      Swal.fire({
        title:"Email này đã được sử dụng",
        icon:"fail"
      }).then((result)=>{
        window.location.reload();
      })
    }
  } 
  async function onChangePassword(data) 
  {
    const response = await fetch(BE_ENDPOINT+"update/password",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    });
    if(response.status==401) 
    {
      Swal.fire( {
        title:"Sai mật khẩu",
        text:"Mật khẩu cũ không đúng",
        icon:"fail"
      }
      ) 
      return;
    } 
    if(response.status==400) 
    { 
      Swal.fire( {
        title:"Sai mật khẩu",
        text:"Xác nhận sai mật khẩu mớimới",
        icon:"fail"
      } 
      )
      return;
    } 
    Swal.fire( {
      title:"Thành côngcông",
      text:"Đổi mật khẩu thành côngcông",
      icon:"success"
    }
    )
    return;
  }
  function onClickChangeEmail()
  { 
    const htmlTag="<input type=\"email\ id=\"newEmail\"/>";

    Swal.fire({
      title:"Vui lòng nhập email", 
      html:htmlTag,
      focusConfirm:false,
      preConfirm:()=>{
        const newEmail = Swal.getPopup().querySelector("#newEmail").value;
        if(!newEmail) 
        {
          Swal.showValidationMessage("Vui lòng nhập địa chỉ email");
        } 
        return {
          newEmail:newEmail
        }
      }

    }).then((result)=>{  
      if(result.isConfirmed) {
      onChangeEmail(result.value.newEmail); 
      }

    })
  } 
  function onClickChangePassword() 
  { 
      const htmlTag = (
        <>
          <label htmlFor="oldPassword">Mật khẩu cũ</label> 
          <input type="password" id="oldPassword"/>
          <br></br> 
          <label htmlFor="newPassword">Mật khẩu mới</label> 
          <input type="password" id="newPassword"/>
          <br></br>
          <label htmlFor="repeatNewPassword">Xác nhận mật khẩu mới</label> 
          <input type="password" id="repeatNewPassword"/>
        </>
      );
      const htmlString= ReactDOMServer.renderToString(htmlTag);
      Swal.fire(
        {
          title:"Thay đổi mật khẩu",
          html:htmlString,
          focusConfirm:false,
          preConfirm:()=>{
            const oldPassword = Swal.getPopup().querySelector("#oldPassword").value;
            const newPassword = Swal.getPopup().querySelector("#newPassword").value;
            const repeatNewPassword = Swal.getPopup().querySelector("#repeatNewPassword").value;
            if(!oldPassword) 
            {
              Swal.showValidationMessage("Vui lòng điền mật khẩu cũ");
              
            } 
            if(!newPassword) 
            {
              Swal.showValidationMessage("Vui lòng điền mật khẩu mới");
            } 
            return {
              oldPassword:oldPassword,
              newPassword:newPassword,
              repeatNewPassword:repeatNewPassword
            } 

          }
        }
      ).then((result)=>{ 
        if(result.isConfirmed) 
        {
          onChangePassword(result.value);
        }

      })
  }
  let userData={};
    useEffect(()=>{  
    async function fetchUser(userId) 
    {
      const userInfo= await fetch(BE_ENDPOINT+"find/user/"+userId);
      if(!userInfo.ok) 
      {
        alert("Không tìm thấy người dùng"); 
        return;
      }  
      userData= await userInfo.json(); 
      console.log(userData);
      
      const userInfoArea= document.getElementById("userInfoArea");
      userInfoArea.children[0].innerHTML="Mã độc giả: " + userData.userId;
      userInfoArea.children[1].innerHTML="Họ và tên: "+userData.fullname;
      userInfoArea.children[2].innerHTML="Địa chỉ: "+userData.address;
      userInfoArea.children[3].innerHTML="Số điện thoại: "+userData.phoneNumber;
      userInfoArea.children[4].innerHTML="Địa chỉ email: "+userData.email;
      let role="";
      if(userData.role==0){
        role="Độc giả";
      } 
      else {
        if(userData.role==1) 
        {
          role="Thủ thư";
        } 
        else {
          role="Quản lý";
        }
      } 
      userInfoArea.children[5].innerHTML="Vai trò: "+role;
  }
    if(userId!="") 
    {
       fetchUser(userId);
    }
  },[]);

  return (
    <div>
      <Header_Main></Header_Main>
      <h1>Thông tin tài khoản</h1>

      <div id="userInfoArea">
        <h3>Mã độc giả: </h3>
        <h3>Họ và tên: </h3> 
        <h3>Địa chỉ: </h3> 
        <h3>Số điện thoại: </h3>
        <h3>Địa chỉ email: </h3>  
        <h3>Vai trò: </h3>
      </div>
      <div>
        <button  onClick={
          (e)=>{
            e.preventDefault();
            onClickEditNormalInformation();
          }
        }>Sửa đổi thông tin cơ bản</button>  
        <br></br>
        <button
        onClick={
          (e)=>{
            e.preventDefault();
            onClickChangeEmail();
          }
        } 
        
        >Thay đổi email</button> 
        <br></br> 
        <button    
        onClick={
          (e)=>{
            e.preventDefault();
            onClickChangePassword();
          }
        }
        >Thay đổi mật khẩu</button> 
        <br></br>
      </div> 
      
    </div>
  )
}

export default User_Information
