import React from 'react'
import '../Styles/Components/SideBar.css'

const SideBar_Left = () => {
  return (
    <div className='searchResult-wrapcontent'>
      <div className='leftside-bar'>
        <h3 className='sidebar-title'>Lọc tìm kiếm</h3>
        <div className='option-filter'>
            <h4 className='filter-title'>Thể loại</h4>
            <ul className='filter-container'>
                <li className='filter-item'>
                    <p >Sách giáo khoa</p>
                </li>
                <li className='filter-item'>
                    <p>Sách giải trí</p>
                </li>
                <li className='filter-item'>
                    <p>Sách khoa học</p>
                </li>
                <li className='filter-item'>
                    <p>Văn học nghệ thuật</p>
                </li>
            </ul>
        </div>
        <div className='option-filter'>
            <h4 className='filter-title'>Ngôn ngữ</h4>
            <ul className='filter-container'>
                <li className='filter-item'>
                    <p>Tiếng Việt</p>
                </li>
                <li className='filter-item'>
                    <p>Tiếng Anh</p>
                </li>
                <li className='filter-item'>
                    <p>Tiếng Nhật</p>
                </li>
                <li className='filter-item'>
                    <p>Tiếng Trung</p>
                </li>
                <li className='filter-item'>
                    <p>Ngôn ngữ khác</p>
                </li>
            </ul>
        </div>
       
      </div>
    </div>
  )
}

export default SideBar_Left
