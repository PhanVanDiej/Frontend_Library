import React from "react";
import "../Styles/Pages/ForgetPass.css";
import Header from "../Components/Header_Register";
import BE_ENDPOINT from "../Env/EndPont";
function ForgetPassword() {
  async function onConfirmSendEmail(email) {
    const response = await fetch(BE_ENDPOINT + "forget_password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: email,
    });
    document.getElementById("messageAreaForgetPassword").innerHTML =
      "Mật khẩu mới đã được gửi qua email bạn cung cấp, vui lòng dùng mật khẩu đó để đăng nhập và đổi lại mật khẩu của bạn";
  }
  return (
    <div className="forget-pass-content">
      <Header></Header>
      <div className="main-forget-content">
        <form
          className="form-forgetpass"
          onSubmit={(e) => {
            e.preventDefault();
            onConfirmSendEmail();
          }}
        >
          <p className="title-forgetpass">Tạo mật khẩu mới</p>
          <div className="form-control">
            <label htmlFor="email" className="description-text">Nhập địa chỉ email tài khoản của bạn. Chúng tôi sẽ gửi mật khẩu mới cho bạn.</label>
            <input type="email" required id="email" placeholder="Nhập địa chỉ email của bạn" />
          </div>
          <input className="submit-btn" type="submit" value="Gửi email xác nhận" />
        </form>

        <p id="messageAreaForgetPassword"></p>
      </div>
    </div>
  );
}
export default ForgetPassword;
