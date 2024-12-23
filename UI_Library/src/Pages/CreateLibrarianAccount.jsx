import React from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
function CreateLibrarian() 
{
    async function onSubmit() 
    {
        const data = {
            fullName:document.getElementById("librarianName").value,
            address:document.getElementById("librarianAddress").value,
            phoneNumber:document.getElementById("librarianPhonenumber").value,
            email:document.getElementById("librarianEmail").value,
            password:"12345",
            repeatPassword:"12345",
            role:1
    
        } 
        const response = await fetch(BE_ENDPOINT+"admin/createLibrarian",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            alert("Tao thu thu that bai");
            return;
        } 

        alert("Tao thu thu thanh cong");
    }
    return ( 
        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <h2>Tao tai khoan thu thu</h2>
                <div>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        onSubmit();
                    }}>
                        <div>
                        <label htmlFor="librarianName">Ho va ten thu thu: </label>
                        <input type="text" required id="librarianName"/> 
                        </div>

                        <div>
                            <label htmlFor="librarianAddress">Dia chi: </label>
                            <input type="text" required id="librarianAddress"/>
                        </div> 
                        <div>
                            <label htmlFor="librarianPhonenumber">So dien thoai: </label> 
                            <input id="librarianPhonenumber" required type="tel"/>
                        </div> 

                        <div>
                            <label htmlFor="librarianEmail">Email: </label> 
                            <input id="librarianEmail" required type="email"/>

                        </div> 
                        <br></br>
                       <input type="submit" value="Xac nhan"/>
                    </form> 
                    
                </div>
 
            </div>
        </div>
    )
} 
export default CreateLibrarian;