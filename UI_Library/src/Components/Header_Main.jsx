import React from 'react'
import '../Styles/Header.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import arrowDown from '../assets/Icons/arrow_down.png';
import transparency from '../assets/Icons/transparency.png';
import logo from '../assets/Icons/logo.png';

export default function Header_Main() {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
            <img src={logo} alt='ArrowDown'></img>
            <Link to="/home" className='Home-title' style={{color:"#A27430"}}>Trang Chủ</Link>
            <ul>
                <CustomLink to='/user_information'>Thông tin đọc giả</CustomLink>
                <CustomLink to='/history'>Lịch sử hoạt động</CustomLink>
                <CustomLink to='/announcement'>Thông báo</CustomLink>
            </ul>
            <div className='search-box'>
              <img src={arrowDown} alt='ArrowDown'></img>
              <img src={transparency} alt='Transparency'></img>
            </div>
        </nav>
      </header>
    </div>
  )
}

function CustomLink({to,children,...props}){
    const resovledPath=useResolvedPath(to)
    const isActived=useMatch({ path:resovledPath.pathname, end:true }) // Dam bao path phai dung hoan toan
    return(
        <li className={isActived? "active":""}>
            <Link to={to} {...props}>
            {children}
            </Link>
        </li>
    )
}
