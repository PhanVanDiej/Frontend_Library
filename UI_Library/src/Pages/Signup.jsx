import React from 'react'
import Header from '../Components/Header_Register'
import '../Styles/Pages/Login.css'

export default function SignupPage(){
    return(
        <div>
            <Header></Header>
            <div className='background'>
                <div className='login_area'>
                    <h2 style={{color:"red"}}>ĐĂNG KÍ <span style={{color:"black"}}>TÀI KHOẢN MỚI </span></h2>
                    <form action=''>
                        <div className='input-box'>
                            <input type='text' placeholder='Tên đăng nhập' required />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Mật khẩu' required />
                        </div>
                        <div className='input-box'>
                            <input type='password' placeholder='Xác nhận mật khẩu' required />
                        </div>
            
                        <button className='submit-btn'>
                            Tiếp theo
                            <img src={nextArrow} alt='button icon'></img>
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}