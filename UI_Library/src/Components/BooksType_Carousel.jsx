import React from 'react'
import bookImage from '../assets/Images/book.png'
import leftArrow from '../assets/Icons/left_arrow.png'
import rightArrow from '../assets/Icons/right_arrow.png'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
const BooksType_Carousel = () => {
  return (
    <div>
      <div className='items-carousel'>
        <button className='carousel-arrow'>
            <img src={leftArrow} alt='left-arrow'></img>
        </button>
        <div className='carousel-items-list-wrapper'>
            <ul className='image-carousel-list'>
                <CustomLink to='/search_result'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <p style={{textDecoration:'none'}}>Sách Giáo khoa</p>
                    </div>
                </CustomLink>
                <CustomLink to='/search_result'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <p >Sách Giáo khoa</p>
                    </div>
                </CustomLink>
                <CustomLink to='/search_result'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <p >Sách Giải trí</p>
                    </div>
                </CustomLink>
                <CustomLink to='/search_result'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <p >Sách Khoa học</p>
                    </div>
                </CustomLink>
                <CustomLink to='/search_result'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <p>Văn học nghệ thuật</p>
                    </div>
                </CustomLink>
               
            </ul>
        </div>
        <button className="carousel-arrow">
            <img src={rightArrow} alt='right-arrow'></img>
        </button>
      </div>
    </div>
  )
}
function CustomLink({to,children,...props}){
    const resovledPath=useResolvedPath(to)
    const isActived=useMatch({ path:resovledPath.pathname, end:true }) // Dam bao path phai dung hoan toan
    return(
        <li className={"carousel-item"}>
            <Link to={to} {...props}>
            {children}
            </Link>
        </li>
    )
}
export default BooksType_Carousel