import {React,useState} from 'react'
import '../Styles/Components/Header.css';
import { Link, Navigate, useMatch, useResolvedPath } from 'react-router-dom';
import arrowDown from '../assets/Icons/arrow_down.png';
import downBlack from '../assets/Icons/down_black.png';
import transparency from '../assets/Icons/transparency.png';
import logo from '../assets/Icons/logo.png';
import { useNavigate } from "react-router-dom";


export default function Header_Main() {

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const openSearchBox = () => setIsSearchBoxOpen(true);
  const closeSearchBox = () => setIsSearchBoxOpen(false);

  const exampleBookData=[
    { id: 1, title:'Re:Zero - Bắt đầu lại ở một thế giới khác'},
    { id: 2, title :'Harry Potter'},
    { id: 3, title:`Alice's Adventures in Wonderland`},
    { id: 4, title:'The Chronicles of Narnia'},
    { id: 5, title:'Charlie and the Chocolate Factory'},
    { id: 6, title:'Matilda'},
    { id: 7, title:'Thousand Splendid Suns'},
    { id: 8, title:'To Kill a Mockingbird'}
  ]

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult,setSearchResult]=useState([]);

  const handleSearchChange = (event) => {
    const value=event.target.value;
    setSearchTerm(value);

    if(value.trim()){
      const filteredSearchResult=exampleBookData.filter((book)=>{
        const searchTermLower=searchTerm.toLowerCase();
        return (book.title.toLowerCase().includes(searchTermLower))
      })
      setSearchResult(filteredSearchResult);
    }
    else setSearchResult([]);
  };

  const navigate = useNavigate();

  const handleOnClickResult=(id)=>{
    closeSearchBox()
    navigate(`/book_detail/${id}`)
  }

  // Thử với role=1
  localStorage.setItem("role","1");
  
  const handleDutyOnClick=(path)=>{
    return()=>
      navigate(path);
  }

  return (
    <div>
      <header className="header">
        <nav className="navbar">
            <img src={logo} alt='ArrowDown'></img>
            <Link to="/home" className='Home-title' style={{color:"#A27430"}}>Trang Chủ</Link>

            {/* Thay đổi header theo role */}
            <ul>
              {localStorage.getItem("role")=="1" &&(   // Role = 1 : thủ thư
                <>
                  <CustomLink to='/user_information'>Thông tin thủ thư</CustomLink>
                  <li>
                    <p>Nghiệp vụ</p>
                    <ul className='dropdown-menu'>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Quản lý độc giả</li>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Quản lý sách</li>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Danh sách yêu cầu gia hạn</li>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Mua sách</li>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Bán sách</li>
                      <li className='option-drop' onClick={handleDutyOnClick('/#')}>Danh sách phiếu phạt</li>
                    </ul>
                  </li>
                </>
              )}
              {localStorage.getItem("role")=="0" &&(  //role =0 : độc giả
                <>
                  <CustomLink to='/user_information'>Thông tin đọc giả</CustomLink>
                  <CustomLink to='/history'>Lịch sử hoạt động</CustomLink>
                  <CustomLink to='/announcement'>Thông báo</CustomLink>
                </>
              )}
            </ul>

            <div className='search-box' onClick={openSearchBox}>
              <img src={arrowDown} alt='ArrowDown'></img>
              <img src={transparency} alt='Transparency'></img>
            </div>
        </nav>
      </header>
      {isSearchBoxOpen&&(
        <>
          <div className='blurredOverlay'></div>
          <div className='floatingBox'>
            <h2>Hộp tìm kiếm</h2>
            <input 
              type='text'
              className='search-BookName'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Tìm kiếm theo tên sách'
              ></input>
              <div className='search-result-dynamic'>
                <ul>
                  {searchResult.map((item)=>{
                    return <li key={item.id} onClick={()=>handleOnClickResult(item.id)}>{item.title}</li>
                  })}
                </ul>
              </div>
            <button onClick={closeSearchBox} className='closeBox-Btn'>
              Close
            </button>
          </div>
        </>
      )}
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
