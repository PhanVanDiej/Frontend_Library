import React from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
function ForgetPassword() 
{
    async function onConfirmSendEmail(email) 
    {
        const response = await fetch(BE_ENDPOINT+"forget_password",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:email
        });
        document.getElementById("messageAreaForgetPassword").innerHTML="Mật khẩu mới đã được gửi qua email bạn cung cấp, vui lòng dùng mật khẩu đó để đăng nhập và đổi lại mật khẩu của bạn";
    }
    return (
        <div>
            <Header_Main></Header_Main> 
            <div className="main-content">
                <form 
                className="form-primary"
                onSubmit={
                    (e)=>{
                        e.preventDefault();
                        onConfirmSendEmail();
                    }
                }>
                    <div className="form-control">
                    <label htmlFor="email">Nhập địa chỉ email của bạn :</label> 
                    <input type="email" required id="email"/>
                    </div>
                    <input className="action-btn confirm-btn " type="submit" value="Gửi email xác nhận"/>
                </form>  

                <p id="messageAreaForgetPassword"></p>

            </div>
        </div>
    )
} 
export default ForgetPassword;