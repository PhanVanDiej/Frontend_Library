import React, { useState, useEffect } from 'react'
import BE_ENDPOINT from '../Env/EndPont'; 
import { useNavigate } from 'react-router-dom';
import Header_Main from '../Components/Header_Main';

const User_Information = () => { 
  const userId=localStorage.getItem("userId"); 
  const navigate= useNavigate();
  function  onClickEditNormalInformation() 
  {    
    navigate("/edit_normal_info");
  } 
  function onClickChangeEmail()
  {

  } 
  function onClickChangePassword() 
  {
    
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
        <button>Thay đổi email</button> 
        <br></br> 
        <button>Thay đổi mật khẩu</button> 
        <br></br>
      </div> 
      
    </div>
  )
}

export default User_Information
