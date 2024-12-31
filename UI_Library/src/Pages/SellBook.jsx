import React, { useEffect, useState } from "react";
import Header_Main from "../Components/Header_Main";
import * as XLSX from "xlsx";
import BE_ENDPOINT from "../Env/EndPont";
import permissionLibrarian from "../Env/PermissionLibrarian";
import "../Styles/Pages/SellBook.css";
function SellBookForm() {
  const listBookSell = {
    implementDate: new Date(),
    listDetailRequest: [],
  };

  const [listBook, setListBook] = useState([]);
  const [listSellBook, setListSellBook] = useState([]);
  useEffect(() => {
    async function getAllBook() {
      const response = await fetch(BE_ENDPOINT + "books/all");
      if (!response.ok) {
        return;
      }
      const responseData = await response.json();
      console.log(responseData);
      setListBook(responseData);
    }
    getAllBook();
  }, []);
  async function onSubmit() {
    const file = document.getElementById("uploadExcelFile").files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workBook = XLSX.read(data, { type: "array" });
      const firstSheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      listBookSell.listDetailRequest = json;
    };
    reader.readAsArrayBuffer(file);
    const response = await fetch(BE_ENDPOINT + "librarian/sell/book", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(listBookSell),
    });
    if (!response.ok) {
      alert("Sell book fail");
    }
    const message = await response.text();
    document.getElementById("messageArea").innerHTML = message;
  }

  async function onConfirmAdd() {
    document.getElementById("messageArea").innerHTML = "";

    const newData = {
      bookId: document.getElementById("bookId").value,
      price: document.getElementById("price").value,
    };
    const response = await fetch(
      BE_ENDPOINT + "librarian/checkCanSold/" + newData.bookId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      document.getElementById("messageArea").innerHTML =
        "Đã có lỗi xảy ra, vui lòng thử lại";
      return;
    }
    const responseData = await response.json();
    if (responseData.message) {
      document.getElementById("messageArea").innerHTML = responseData.message;
      return;
    }

    setListSellBook([...listSellBook, newData]);
  }
  function onConfirmDeleteAll() {
    setListSellBook([]);
  }
  function onDeleteAt(id) {
    const listTemp = listSellBook.filter((item) => {
      if (item.bookId == id) {
        return false;
      }
      return true;
    });
    setListSellBook(listTemp);
  }

  async function onConfirmSell() {
    const data = {
      implementDate: new Date(),
      listDetailRequest: listSellBook,
    };
    const response = await fetch(BE_ENDPOINT + "librarian/sell/book", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      alert("Sell book fail");
    }
    const message = await response.text();
    document.getElementById("messageArea").innerHTML = message;
  }
  permissionLibrarian();
  return (
    <div>
      <Header_Main></Header_Main>
      <div className="main-content">
        <h2 className="title-page">Bán sách</h2>
        <div className="form-wrapper">
          <form
            className="form-sellBook"
            id="sell_book_info"
            onSubmit={(e) => {
              e.preventDefault();
              onConfirmAdd();
            }}
          >
            <div className="form-sellBook-body">
              <label className="form-label" htmlFor="bookId">
                Mã sách :{" "}
              </label>
              <input
                className="form-input"
                type="number"
                id="bookId"
                required
              />
              <label className="form-label" htmlFor="price">
                Giá bán :{" "}
              </label>
              <input className="form-input" type="number" id="price" required />
            </div>
            <input className="form-btn" type="submit" value="Thêm" />
          </form>
          <div id="messageArea"></div>
        </div>
        <div>
          <div className="filter-header" >
            <button
            className="action-btn confirm-btn"
              onClick={(e) => {
                e.preventDefault();
                onConfirmSell();
              }}
            >
                Xác nhận
            </button>
            <button
            className="action-btn delete-btn"
              onClick={(e) => {
                e.preventDefault();
                onConfirmDeleteAll();
              }}
            >
              Xoá toàn bộ
            </button>
            <button className="action-btn cancel-btn">Huỷ</button>
          </div>
          <div className="content-table">
            <table border={1}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ma sach</th>
                  <th>Gia ban</th>
                  <th>Xoa</th>
                </tr>
              </thead>
              <tbody>
                {listSellBook.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.bookId}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteAt(item.bookId);
                          }}
                        >
                          Xoa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellBookForm;
