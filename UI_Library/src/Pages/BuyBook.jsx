import React, { useState, useEffect } from "react";
import Header_Main from "../Components/Header_Main";
import BuyBookTitleForm from "../Components/BuyBookTitleForm";
import BE_ENDPOINT from "../Env/EndPont";
import BuyBook from "../FetchScripts/BuyBook";
import '../Styles/Pages/BuyBook.css';
import permissionLibrarian from "../Env/PermissionLibrarian";
import '../Styles/Pages/Common.css';
import DeleteImg from '../assets/Icons/recycle_bin.png';

function BuyBookForm() {
  let [listBuyBook, setListBuyBook] = useState({
    librarianId: localStorage.getItem("userId"),
    implementDate: new Date(),
    listDetailRequest: [],
  });
  async function onSubmit() {
    console.log(listBuyBook);
    const result = await BuyBook(listBuyBook);
    document.getElementById("messageArea").innerHTML = result;
  }

  const [listBookTitle, setListBookTitle] = useState([]);
  useEffect(() => {
    async function fetchFromServer() {
      const response = await fetch(BE_ENDPOINT + "book-titles/all");
      if (!response.ok) {
        return;
      }
      const responseData = await response.json();
      setListBookTitle(responseData);
    }
    fetchFromServer();
  }, []);
  function searchById(id) { 
    console.log(id)
    for (let i = 0; i < listBookTitle.length; i++) {
      if (id == listBookTitle[i].id) {
        
        return listBookTitle[i].name;
      }
    }
    return "";
  }
  permissionLibrarian();

  const handleOnDeleteClick=(selected)=>{
    const temp=listBuyBook.listDetailRequest.filter((item)=>item.bookTitleId!=selected.bookTitleId);
    setListBuyBook(
      {librarianId: localStorage.getItem("userId"),
      implementDate: new Date(),
      listDetailRequest: temp
    });
  }
  return (
    <div>
      <Header_Main></Header_Main>
      <div className="main-content">
        <h3 className="title-page">Nhập sách</h3>
        <div>
          <div>
            <form
              className="form-primary"
              id="buyBookTitle"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("messageArea").innerHTML = "";
                
                const data = {
                  bookTitleId:
                    document.getElementById("buyBookTitleName")?.value,
                  amount: document.getElementById("buyBookTitleAmount")?.value,
                  price: document.getElementById("buyBookTitlePrice")?.value,
                };
                const filterList = listBookTitle.filter((item) => {
                  return item.id == data.bookTitleId;
                });
                
                if (filterList.length == 0) {
                  document.getElementById("messageArea").innerHTML =
                    "Tên sách không tồn tại trong thư viện, vui lòng chọn tên khác";
                  return;
                }
                const updateList = {
                  ...listBuyBook,
                  listDetailRequest: [...listBuyBook.listDetailRequest, data],
                };
                setListBuyBook(updateList);
                console.log(data);
              }}
            >
              <div className="form-control">
                <label htmlFor="buyBookTitleName">Mã tựa sách : </label>
                <input type="number" id="buyBookTitleName" required />
              </div>
              <div className="form-control">
                <label htmlFor="buyBookTitlePrice">Đơn giá :</label>
                <input type="text" required min="1" id="buyBookTitlePrice" />
              </div>
              <div className="form-control">
                <label htmlFor="buyBookTitleAmount">Số lượng :</label>
                <input type="text" required min="1" id="buyBookTitleAmount" />
              </div>
              <input
                className="confirm-btn action-btn"
                type="submit"
                value="Thêm"
              />
            </form>
          </div>
          <div id="messageArea"></div>
          <div className="filter-header">
            <button className="action-btn delete-btn">Xoá toàn bộ</button>
            <button
                className="action-btn confirm-btn"
              id="confirmBuy"
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              Xác nhận mua sách
            </button>
          </div>
          <div className="content-table"> 
            {/* <table border={1}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã sách</th>
                  <th>Tên sách</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {listBuyBook.listDetailRequest.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.bookTitleId}</td>
                      <td>{serchById(item.bookTitleId)}</td>
                      <td>{item.price}</td>
                      <td>{item.amount}</td>
                      <td>
                        <button>Xóa</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}
            <div className="buyBook-list-header object-list-header">
                <div className="STT">STT</div>
                <div className="book-id">Mã sách</div>
                <div className="book-name">Tên sách</div>
                <div className="price">Đơn giá</div>
                <div className="amount">Số lượng</div>
                <div className="user-action">Hành động</div>
            </div>
            <div className="header-border-line"></div>
            <div className="object-list-data buyBook-list-data">
                {listBuyBook.listDetailRequest.map((item, index) =>{ 
                  const name=searchById(item.bookTitleId);
                    return (
                    <div className="buyBook-item object-item">
                      <p>{index+1}</p>
                      <p>{item.bookTitleId}</p>
                      <p>{name}</p>
                      <p>{item.price}</p>
                      <p>{item.amount}</p>
                      <button className="delete-btn-item" onClick={()=>handleOnDeleteClick(item)}>
                          <img width={20} height={20} src={DeleteImg} alt="Delete" />
                      </button>
                    </div>
                )
              }
                )}
            </div>
            </div>
          </div>
          <p id="messageArea"></p>
        </div>
      </div>
  );
}
export default BuyBookForm;
