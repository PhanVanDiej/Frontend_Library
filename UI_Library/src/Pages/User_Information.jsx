import React, { useState, useEffect } from "react";
import BE_ENDPOINT from "../Env/EndPont";
import { useNavigate } from "react-router-dom";
import Header_Main from "../Components/Header_Main";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import permissionReader from "../Env/PermissionReader";
import "../Styles/Pages/UserInfo.css";
import avatar from "../assets/Book_Cover/neko.jpg";
import editIcon from "../assets/Icons/edit.png";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";

const userExample = {
  userId: "1",
  fullName: "Phan Van Dai",
  address: "Viet Nam",
  phoneNumber: "12345678",
  email: "22520182@gmail.com",
  role: "Customer",
};
const User_Information = () => {

  // const userId=localStorage.getItem("userId"); 
  // const navigate= useNavigate();

  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userExample)
      // replace with real data
      setFullname(userExample.fullName);
      setUserId(userExample.userId);
      setAddress(userExample.address);
      setPhoneNumber(userExample.phoneNumber);
      setEmail(userExample.email);
      setRole(userExample.role);
  }, [userExample]);

  const onClickChangeEmail =async () => {
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
  };
  const onClickChangePassword = async() => {
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
  };
  const onClickEditNormalInformation =async () => {

  };
  return (
    <div className="wrapping-content">
      <Header_Main></Header_Main>
      <h1 style={{marginTop:"50px", marginLeft:"100px"}}>Thông tin tài khoản</h1>

      <div id="userInfoArea">
        <div className="avatar-area">
          <img src={avatar} alt="avatar" className="avatar-img"></img>
          <div>
            <h3 style={{ whiteSpace: "nowrap" }}>{userExample.fullName}</h3>
            <h5 style={{ whiteSpace: "nowrap" }}>{userExample.role}</h5>
            <button
              className="editInfo-Btn"
              onClick={(e) => {
                e.preventDefault();
                onClickEditNormalInformation();
              }}
            >
              <img src={editIcon} alt="editInfo" width={20}></img>
              Sửa thông tin cơ bản
            </button>
            <button
              className="editInfo-Btn"
              onClick={(e) => {
                e.preventDefault();
                onClickChangeEmail();
              }}
            >
              <img src={editIcon} alt="editInfo" width={20}></img>
              Thay đổi email
            </button>
            <button
              className="editInfo-Btn"
              onClick={(e) => {
                e.preventDefault();
                onClickChangePassword();
              }}
            >
              <img src={editIcon} alt="editInfo" width={20}></img>
              Thay đổi mật khẩu
            </button>
          </div>
        </div>
        <div className="detail-info">
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Mã tài khoản :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={userId}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Họ và tên :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={userExample.fullName}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Địa chỉ :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={address}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Số điện thoại :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={phoneNumber}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Email :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={userId}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", height: 45 }}>
            <Typography sx={{ ml: 1, mr: 2, marginTop: 1, width: 156 }}>
              Role :
            </Typography>
            <TextField
              fullWidth
              disabled
              margin="dense"
              size="small"
              value={role}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default User_Information;
