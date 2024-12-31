import React, { useState, useEffect } from "react";
import Header_Main from "../Components/Header_Main";
import Swal from "sweetalert2";
import BE_ENDPOINT from "../Env/EndPont";
import { useNavigate } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
function UpdateRegulationPage() {
  const [regulation, setRegulation] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function getRegulation() {
      const response = await fetch(BE_ENDPOINT + "regulation");
      const responseData = await response.json();
      console.log(responseData);
      setRegulation(responseData);
    }
    getRegulation();
  }, []);
  async function onSubmit(data) {
    const response = await fetch(BE_ENDPOINT + "librarian/updateRegulation", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      Swal.fire({
        title: "Thất bại",
        text: "Cập nhật thất bại",
        icon: "fail",
      });
      return;
    }
    Swal.fire({
      title: "Thành côngcông",
      text: "Cập nhật thành công",
      icon: "success",
    }).then((result) => {
      navigate("/regulation");
    });
  }
  function onClickSubmit() {
    Swal.fire({
      title: "Bạn có muốn thay đổi?",
      icon: "warning",
      preConfirm: () => {
        return {
          defaultBorrowingDays: document.getElementById("defaultBorrowingDay")
            .value,
          daysToTakeBook: document.getElementById("daysToTakeBook").value,
          moneyLatePerDay: document.getElementById("moneyLatePerDay").value,
          daysToLockUser: document.getElementById("daysToLockUser").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmit(result.value);
      }
    });
  }
  permissionLibrarian();
  return (
    <div>
      <Header_Main></Header_Main>
      <div className="main-content">
        <h2 className="title-page">Thay đổi quy định thư viện</h2>
        <form
          className="form-primary"
          onSubmit={(e) => {
            e.preventDefault();
            onClickSubmit();
          }}
        >
          <div className="form-control">
            <label htmlFor="defaultBorrowingDay">
              Hạn trả sách mặc định (tính từ ngày mượn) :
            </label>
            <input
              type="text"
              id="defaultBorrowingDay"
              required
              defaultValue={regulation.defaultBorrowingDays}
            />
          </div>
          <div className="form-control">
            <label htmlFor="daysToTakeBook">
              Hạn lấy sách (tính từ ngày mượn) :
            </label>
            <input
              type="text"
              id="daysToTakeBook"
              required
              defaultValue={regulation.daysToTakeBook}
            />
          </div>
          <div className="form-control">
            <label htmlFor="moneyLatePerDay">Số tiền phạt/ ngày trả trễ :</label>
            <input
              type="text"
              id="moneyLatePerDay"
              required
              defaultValue={regulation.moneyLatePerDay}
            />
          </div>
          <div className="form-control">
            <label htmlFor="daysToLockUser">Thời hạn trả trễ tối đa :</label>
            <input
              type="text"
              id="daysToLockUser"
              required
              defaultValue={regulation.daysToLockUser}
            />
          </div>
          <input className="confirm-btn action-btn" type="submit" value="Xác nhận thay đổi" />
        </form>
      </div>
    </div>
  );
}
export default UpdateRegulationPage;
