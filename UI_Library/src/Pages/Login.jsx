import React,{useState} from "react";
import Header from "../Components/Header_Register";
import '../Styles/Pages/Login.css'
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
  const handleLogin=(e)=>{
    e.prevenDefault();
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
              <input type="text" placeholder="Tên đăng nhập" required />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Mật khẩu" required />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox"></input>Remember me
              </label>
              <a href="#">Quên mật khẩu?</a>
            </div>
            <button className="submit-btn">Đăng nhập</button>
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
