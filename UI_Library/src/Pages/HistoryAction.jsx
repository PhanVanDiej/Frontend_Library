import React from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/HistoryAction.css'
const HistoryAction = () => {
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='content-wrapper'>
        <div className='nav-cart-state'>
            <ul>
                <li>Tất cả</li>
                <li>Chưa nhận sách</li>
                <li>Đang mượn</li>
                <li>Đã trả</li>
            </ul>
        </div>
        <div className='history-borrow-list'>
            
        </div>
      </div>
    </div>
  )
}

export default HistoryAction
