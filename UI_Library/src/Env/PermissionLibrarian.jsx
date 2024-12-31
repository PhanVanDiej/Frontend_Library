import React from "react"; 
function permissionLibrarian() 
{
    if(localStorage.getItem("role_user")!=1) 
        {
          alert("Bạn không có quyền truy cập trang này");
          window.location.href="/login";
          return;
        }
    
}
export default permissionLibrarian;