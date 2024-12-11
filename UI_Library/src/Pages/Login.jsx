import React,{useState} from "react";
import Header from "../Components/Header_Register";
<<<<<<< HEAD
import '../Styles/Pages/Login.css'
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
  const handleLogin=(e)=>{
    e.prevenDefault();
=======
import handleLogin  from "../FetchScripts/HandleLogin";
export default function LoginPage() {
  async function Login(nameOrEmail, password) 
  {
    
      const result = await handleLogin(nameOrEmail, password);
      if(result==="Success") 
      {
          console.log("Success");
      }
      else {
        console.log("Fail");
      }
>>>>>>> FetchToServer
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
              <label>
                <input type="checkbox"></input>Remember me
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
                <a href="#" style={{ color: "red" }}>
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
