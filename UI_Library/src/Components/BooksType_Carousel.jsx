import React from 'react'
import bookImage from '../assets/Images/book.png'
import leftArrow from '../assets/Icons/left_arrow.png'
import rightArrow from '../assets/Icons/right_arrow.png'
const BooksType_Carousel = () => {
  return (
    <div>
      <div className='items-carousel'>
        <button className='carousel-arrow'>
            <img src={leftArrow} alt='left-arrow'></img>
        </button>
        <div className='carousel-items-list-wrapper'>
            <ul className='image-carousel-list'>
                <li className='carousel-item'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <a href='#'>Sách giáo khoa</a>
                    </div>
                </li>
                <li className='carousel-item'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <a href='#'>Sách giải trí</a>
                    </div>
                </li>
                <li className='carousel-item'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <a href='#'>Sách khoa học</a>
                    </div>
                </li>
                <li className='carousel-item'>
                    <div>
                        <img src={bookImage} alt='image-item'></img>
                        <a href='#'>Văn học nghệ thuật</a>
                    </div>
                </li>
            </ul>
        </div>
        <button className="carousel-arrow">
            <img src={rightArrow} alt='right-arrow'></img>
        </button>
      </div>
    </div>
  )
}

export default BooksType_Carousel