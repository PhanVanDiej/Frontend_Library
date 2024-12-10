import React from 'react'
import Header_Main from '../Components/Header_Main'
import { useParams } from "react-router-dom";
import '../Styles/Pages/BookDetail.css'
import cover from '../assets/Book_Cover/rezero.png'
import bag from '../assets/Icons/bag.png'
import ScrollList from '../Components/ScrollList_Book';
const Book_Detail = () => {
    const book_id=useParams();
    const suggestBook = [
      { id: 1, name: "Product 1", image: "" },
      { id: 2, name: "Product 2", image: "" },
      { id: 3, name: "Product 3", image: "" },
      { id: 5, name: "Product 5", image: "" },
      { id: 6, name: "Product 6", image: "" },
      { id: 7, name: "Product 6", image: "" },
      { id: 8, name: "Product 6", image: "" },
      { id: 9, name: "Product 6", image: "" },
      { id: 10, name: "Product 6", image: "" },
      { id: 4, name: "Product 4", image: "" },
    ]
    // fetch data tai day
    const remain=3;
  return (
    <div>
      <Header_Main></Header_Main>
      <div className='wrapping-content'>
        <div className='path'>
            <ul>
                <li><a className='book-type-path' href='#'>Sách Tiếng Việt</a></li>
                <li><p>{'>'}</p></li>
                <li><a className='book-type-path' href='#'>Light novel</a></li>
                <li><p>{'>'}</p></li>
                <li><a className='book-type-path' href='#'>Phiêu lưu</a></li>
            </ul>
        </div>
        <div className='book-detail-container'>
            <div className='request-area'>
                <img className='book-cover' src={cover} alt={'Book'+book_id}></img>
                <div className='request-btn'>
                  <button type='submit' className='btn-border'>
                    <div>
                      <img src={bag} alt='Bag'></img>
                      <p>Thêm vào giỏ</p>
                    </div>
                  </button>
                  <button type='submit' className='btn-fill'>
                      Mượn sách
                  </button>
                </div>
                
            </div>
            <div className='book-information'>
                <div className='mark-book'>
                  <h1 className='book-title'>Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18 </h1>
                  <div className='row-defined'>
                    <p><span style={{color:"#A27430"}}>Nhà xuất bản :</span>Hồng Đức</p>
                    <p><span style={{color:"#A27430"}}>Tác giả :</span>Tappei Nagatsuki, Shinichirou...</p>
                  </div>
                  <div className='row-defined'>
                    <p><span style={{color:"#A27430"}}>Trạng thái :</span>Còn {remain} trên kệ</p>
                    <p><span style={{color:"#A27430"}}>Hình thức bìa:</span>Bìa mềm</p>
                  </div>
                </div>
                <div className='detail-information'>
                  <h3>Thông tin chi tiết</h3>
                  <p><span style={{color:"#8F8F8F"}}>Mã sách : </span>REZ2023428</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Nhà xuất bản : </span>Hồng Đức</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Tác giả : </span>Tappei Nagatsuki, Shinichirou...</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Năm xuất bản : </span>2023</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Ngôn ngữ : </span>Tiếng Việt</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Số trang : </span>418</p>
                  <hr/>
                  <p><span style={{color:"#8F8F8F"}}>Thể loại : </span>Light novel, Fantasy, Phiêu lưu</p>
                </div>
                <div className='book-summary'>
                  <h3>Mô tả nội dung</h3>
                  <p>Từ khi đến thế giới khác, trải nghiệm thường xuyên nhất của Subaru có lẽ là tử vong.<br/><br/>

                      Có lần cậu chết vì lời nguyền của ma thú dạng chó con. Ra đi trong giấc ngủ, không đau không ngứa, thậm chí không biết đến sợ hãi. Tính ra là cái chết an lạc hạng nhất trong truyện, thấm đẫm sự từ bi của tác giả.<br/><br/>

Tuy nhiên sự từ bi ấy không kéo dài lâu. Dần dà qua mười tập truyện, Subaru nghiễm nhiên biến thành vật thí nghiệm cho các cách kết thúc cuộc đời. Cậu đã qua tay nhiều đao phủ khác nhau, từ ma thú, tinh linh đến con người, trong đó có chính bản thân cậu. Cậu bị tấn công vào đủ bộ vị khác nhau, từ đầu, cổ đến tứ chi, nội tạng…<br/>

Nhưng có lẽ chưa lần nào đao phủ lại bé nhỏ xinh xắn đặc biệt, và cậu bị tấn công một cách toàn vẹn khủng khiếp, từ trong ra ngoài, từ trên xuống dưới… như sẽ kể trong tập 11.<br/><br/>

Tập 11 cũng là bước ngoặt đầy trớ trêu trong diễn biến của Re:Zero. Trước đây sau mỗi lần Subaru chết đi sống lại, cậu thay đổi thì tình hình sẽ thay đổi. Còn lần này, môi trường và mọi người xung quanh thiên biến vạn hóa, dù cậu chưa kịp động đậy làm gì.</p>
                </div>
            </div>
        </div>
        <div className='suggest-related-book-scroll'>
            <ScrollList products={suggestBook}></ScrollList>
        </div>
      </div>
    </div>
  )
}

export default Book_Detail
