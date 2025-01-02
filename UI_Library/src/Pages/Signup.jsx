import React, { useEffect, useState } from 'react'
import Header from '../Components/Header_Register'
import handleRegister from '../FetchScripts/HandleRegister'
import BE_ENDPOINT from '../Env/EndPont';
import '../Styles/Pages/Login.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function SignupPage(){ 
    const [submit,setSubmit] = useState(false);
    const fetchAndDisplay=async ()=>{
        const fullName= document.getElementById("userNameRegister").value;
        const address=document.getElementById("addressRegister").value; 
        const phone=document.getElementById("phoneRegister").value;
        const email=document.getElementById("emailRegister").value;
        const password=document.getElementById("passwordRegister").value;
        const repeatPassword=document.getElementById("repeatPasswordRegister").value;
        const information={
            fullName:fullName,
            address:address,
            phoneNumber:phone,
            email:email,
            password:password,
            repeatPassword:repeatPassword,
            role:0
        } 
        
        console.log(information);
        const registerMessage = await handleRegister(information);
        if(registerMessage) 
        {
            alert(registerMessage);
            const navigate= useNavigate();
            navigate("/login");
        } 
        else {
            alert("Đã xảy ra lỗi, vui lòng thử lại");
        }
    }
    
   
    return(
        <div>
            <Header></Header>
            <div className='background'>
                <div className='login_area'>
                    <h2 style={{color:"red"}}>ĐĂNG KÍ <span style={{color:"black"}}>TÀI KHOẢN MỚI </span></h2>
                    <form action=''>
                        <div   className='input-box'>
                            <input id="userNameRegister" type='text' placeholder='Tên đăng nhập' required />
                        </div> 
                        <div   className='input-box'>
                            <input id="addressRegister" type='text' placeholder='Địa chỉ' required />
                        </div> 
                        <div className='input-box'>
                            <input id="phoneRegister" type='phone' placeholder='Số điện thoại' required />
                        </div>
                        <div className='input-box'>
                            <input id="emailRegister" type='email' placeholder='Email' required />
                        </div>
                        
                        <div className='input-box'>
                            <input id="passwordRegister" type='password' placeholder='Mật khẩu' required />
                        </div>
                        <div className='input-box'>
                            <input id="repeatPasswordRegister" type='password' placeholder='Xác nhận mật khẩu' required />
                        </div>
                        
                        
                    </form>
                    <button 
                    className='submit-btn'
                    onClick={(e)=>{
                        e.preventDefault();
                        fetchAndDisplay()}} >
                            Đăng ký
                            </button>
                </div>
                <div>
                    <p id="registerMessageArea"></p>
                </div>
            </div>
        </div>
    )
}