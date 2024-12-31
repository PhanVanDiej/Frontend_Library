import React from 'react'
import '../Styles/Components/Header.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import logo from '../assets/Icons/logo.png';
const Header = () => {
  return (
    <header className="header">
        <nav class="navbar">
            <img src={logo} alt='ArrowDown'></img>
            <Link to="/home" className='Home-title' style={{color:"#A27430", whiteSpace:'nowrap', width:"fit-content"}}>WEBSITE THƯ VIỆN</Link>
            <ul>
               <CustomLink to='/login'>ĐĂNG NHẬP</CustomLink>
               <CustomLink to='/signup'>ĐĂNG KÝ</CustomLink>
            </ul>
        </nav>
    </header>
  )
}
function CustomLink({to,children,...props}){
  const resovledPath=useResolvedPath(to)
  const isActived=useMatch({ path:resovledPath.pathname, end:true }) // Dam bao path phai dung hoan toan
  return(
      <li>
          <Link to={to} {...props}>
          {children}
          </Link>
      </li>
  )
}
export default Header
