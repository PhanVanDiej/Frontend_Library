import React,{useState} from "react";
import Header from "../Components/Header_Register";
import handleLogin  from "../FetchScripts/HandleLogin";
import { useNavigate } from "react-router-dom";
import '../Styles/Pages/Login.css';
export default function LoginPage() { 
  const navigate= useNavigate();
  async function Login(nameOrEmail, password) 
  {
    
      const result = await handleLogin(nameOrEmail, password);
      if(result==="Success") 
      {
          console.log("Success"); 
          navigate("/home");

      }
      else {
        document.getElementById("messageLogin").innerHTML="Đăng nhập thất bại";
      }
  }
  return (
    <div>
      <Header></Header>
      <div className="background">
        <div className="login_area">
          <h2>
            Bạn đã có tài khoản,
            <span style={{ color: "#A27430" }}> Đăng nhập</span>
          </h2>
          <form action="">
            <div className="input-box">
              <input id="LoginName" type="text" placeholder="Tên đăng nhập" required />
            </div>
            <div className="input-box">
              <input id="LoginPassword" type="password" placeholder="Mật khẩu" required />
            </div>
            <div className="remember-forgot">
              <label id="messageLogin">
               
              </label>
              <a href="/forgetPassword">Quên mật khẩu?</a>
            </div>
            <button className="submit-btn" onClick={
              (e)=>{
                e.preventDefault();
              const nameOrEmail= document.getElementById("LoginName").value;
              const password= document.getElementById("LoginPassword").value;
              Login(nameOrEmail, password);

            }}>Đăng nhập</button>
            <div className="register-link">
              <p>
                Bạn chưa có tài khoản,
                <a href="/signup" style={{ color: "red" }}>
                  Đăng kí
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
