import React from 'react'
import '../Styles/Header.css';

const Header = () => {
  return (
    <header className="header">
        <nav class="navbar">
            <ul>
                <li><a href="#home" style={{color:"#A27430"}}>WEBSITE THƯ VIỆN</a></li>
                <li><a href="/LoginPage">ĐĂNG NHẬP</a></li>
                <li><a href="/SignupPage">ĐĂNG KÝ</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
