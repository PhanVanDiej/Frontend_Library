import React from "react"; 
function permissionReader() 
{
    if(localStorage.getItem("role")!=1&&localStorage.getItem("role")!=0) 
        {
          alert("Bạn không có quyền truy cập trang này");
          window.location.href="/login";
          return;
        }
} 
export default permissionReader;