import {React,useEffect,useState} from 'react'
import '../Styles/Components/Header.css';
import { Link, Navigate, useMatch, useResolvedPath } from 'react-router-dom';
import arrowDown from '../assets/Icons/arrow_down.png';
import transparency from '../assets/Icons/transparency.png';
import logo from '../assets/Icons/logo.png';
import { useNavigate } from "react-router-dom";
import BE_ENDPOINT from '../Env/EndPont';
import ReactDOMServer from "react-dom/server";
import Swal from 'sweetalert2';
import {saveAs} from 'file-saver';


export default function Header_Main() {

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const openSearchBox = () => setIsSearchBoxOpen(true);
  const closeSearchBox = () => setIsSearchBoxOpen(false);

  /*const exampleBookData=[
    { id: 1, title:'Re:Zero - Bắt đầu lại ở một thế giới khác'},
    { id: 2, title :'Harry Potter'},
    { id: 3, title:`Alice's Adventures in Wonderland`},
    { id: 4, title:'The Chronicles of Narnia'},
    { id: 5, title:'Charlie and the Chocolate Factory'},
    { id: 6, title:'Matilda'},
    { id: 7, title:'Thousand Splendid Suns'},
    { id: 8, title:'To Kill a Mockingbird'}
  ];
*/
  const [exampleBookData, setExampleBookData] = useState([]);
  useEffect(()=>{
    async function getAllBookTitleFromServer() 
    {
      const response = await fetch(BE_ENDPOINT+"book-titles/all");
      if(!response.ok) 
      {
        return;
      } 
      const responseData= await response.json();
      console.log(responseData);
      setExampleBookData(responseData.map((item)=>{
        return {
          id:item.id,
          title:item.name
        }
      }));
    }
    getAllBookTitleFromServer();
  },
[])

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
    navigate(`/book_detail/${id}`)
  }  
  /*const htmlTag = (
    <div>
      <label htmllFor="startDate">Ngày bắt đầu</label> 
      <input type="date" id="startDate"/> 
      <br></br> 
      <label htmlFor="endDate">Ngày kết thúc</label> 
      <input type="date" id="endDate"/>
    </div>
  );
  const htmlString =ReactDOMServer.renderToString(htmlTag);
  function reportByBookTitle() 
  {
     Swal.fire({
      title:"Thống kê lượt mượn theo tựa sách",
      html:htmlString,
      focusConfirm:false, 
      preConfirm:()=>{
        const startDate= Swal.getPopup().querySelector("#startDate").value;
        const endDate = Swal.getPopup().querySelector("#endDate").value;
        if(!startDate||!endDate) 
        {
          Swal.showValidationMessage("Vui lòng nhập đầy đủ ngày bắt đầu và ngày kết thúc");

        } 
        return {
          
        }
      }
     })
  }*/  
 const htmlTag = (
  <div>
    <p>Ngày bắt đầu</p> 
    <input type="date" id="startDate"/> 
    <p>Ngày kết thúc</p>
    <input type="date" id="endDate"/>
  </div>
 )
 const htmlString = ReactDOMServer.renderToString(htmlTag);
 function onClickReport(option) 
 {
    Swal.fire({
      title:"Lập báo cáo", 
      html:htmlString,
      focusConfirm:false,
      preConfirm:()=>{
        const startDate= Swal.getPopup().querySelector("#startDate").value;
        const endDate = Swal.getPopup().querySelector("#endDate").value; 
        console.log(startDate);
        if(!startDate||!endDate) 
        {
          Swal.showValidationMessage("Cần điền đầy đủ ngày bắt đâuf và ngày kết thúc");
        }
        
        return {
          start:startDate,
          end:endDate
        }
      }

    }).then(async (result)=>{
      if(result.isConfirmed) 
      {
        if(option==1) 
        { 
          
          const response = await fetch(BE_ENDPOINT+"book-titles/report"+`?startDate=${result.value.start}&endDate=${result.value.end}`); 
          console.log("report"); 
          console.log(BE_ENDPOINT+"book-titles/report"+`?startDate=${result.value.start}&endDate=${result.value.end}`); 
          if(response.ok) 
          {
            const file = await response.blob(); 
            
            saveAs(file,"report.pdf");

          }
          return;
        } 
        else {
          const response = await fetch(BE_ENDPOINT+"book-types/report"+`?startDate=${result.value.start}&endDate=${result.value.end}`); 
          if(response.ok) 
            {
              const file = await response.blob(); 
              
              saveAs(file,"report.pdf");
  
            }
          return;
        }
      }
    })
 }
  function display() {
    if(localStorage.getItem("role_user")=="1" ) 
    { return (   // Role = 1 : thủ thư
      <>
        <CustomLink to='/user_information'>Thông tin thủ thư</CustomLink>
        <li>
          <p>Nghiệp vụ</p>
          <ul className='dropdown-menu'>
            <CustomLink to="/reader_management">Quản lý độc giả</CustomLink>
            <CustomLink to="/book_management">Quản lý sách</CustomLink>
            <CustomLink to="/renewal_request">Danh sách yêu cầu gia hạn</CustomLink>
            <CustomLink to="/buy_book">Mua sách</CustomLink>
            <CustomLink to="/sell_book">Bán sách</CustomLink>
            <CustomLink to="/penalty_list">Danh sách phiếu phạt</CustomLink>
            <CustomLink to="/create_penalty">Lập phiếu phạt</CustomLink>
            <CustomLink to="/buy_book_history">Lịch sử mua sách</CustomLink>
            <CustomLink to="/sell_book_history">Lịch sử bán sách</CustomLink>
            <CustomLink to="/update_regulation">Chỉnh sửa quy định thư viện</CustomLink>
            <CustomLink to="/borrow_offline">Mượn sách trực tiếp</CustomLink>
            <CustomLink to="/all_borrow_detail">Danh sách phiếu mượn</CustomLink>
            <li className="option-drop report-menu">
              <p>Lập báo cáo</p>
              <ul className="dropdown-menu-report"> 
                <div onClick={
                  (e)=>{
                    e.preventDefault();
                    onClickReport(1);
                  }
                }>Báo cáo lượt mượn theo tựa sách</div> 
                <div  onClick={
                  (e)=>{
                    e.preventDefault();
                    onClickReport(0);
                  }
                }>Báo cáo lượt mượn theo thể loại</div>
              </ul>
            </li>
          </ul>
        </li>
        <CustomLink to="/regulation">Quy định thư viện</CustomLink>
      </>)
    }
    
    else return (  //role =0 : độc giả
      <>
        <CustomLink to='/user_information'>Thông tin đọc giả</CustomLink>
        <CustomLink to='/history'>Lịch sử hoạt động</CustomLink>
        <CustomLink to='/regulation'>Qui định thư viện</CustomLink>
        <CustomLink to="/cart">Sách muốn mượn</CustomLink> 
        <CustomLink to="/penalty_history">Lịch sử vi phạm</CustomLink>
        
      </>
    )
  }
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div style={{display:'flex',alignItems:'center'}}>
            <img src={logo} alt='ArrowDown'></img>
            <Link to="/home" className='Home-title' style={{color:"#A27430"}}>Trang Chủ</Link>
            <ul>
                {   
                  display()
                }
            </ul>
          </div>
          <div style={{display:'flex',alignItems:'center'}}>
            <div className='search-box' onClick={openSearchBox}>
              <img src={arrowDown} alt='ArrowDown'></img>
              <img src={transparency} alt='Transparency'></img>
            </div>
            <div className='logout-btn' onClick={
              (e)=>{
                e.preventDefault();
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login");
              }
            }>Đăng xuất</div>
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
        <li className={isActived? "option-drop active":"option-drop"}>
            <Link to={to} {...props}>
              {children}
            </Link>
        </li>
    )
}
