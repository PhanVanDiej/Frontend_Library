import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
function RegisterNewBookTitleForm() 
{
    const [bookType, setBookType]= useState([]);
    useEffect(()=>{
        async function fetchToServer() 
        {
            const response = await fetch(BE_ENDPOINT+"book-types");
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
            setBookType(responseData);
        }
        document.getElementById("register_form").addEventListener("submit",(e)=>{
            e.preventDefault();
            onSubmitForm();
        })
        fetchToServer();

    },[]);  

    async function onSubmitForm() 
    {
        const formData= new FormData();
        formData.append("file",document.getElementById("Image").files[0]);
        const postImage = await fetch(BE_ENDPOINT+"librarian/create/BookTitle/image",{
            method:"POST",
            headers:{
                
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:formData
        });
        const postResult = await postImage.text();
        console.log(postResult);
        if(!postImage.ok) 
        {
            return;
        }  
        const data = {
            name:document.getElementById("bookName").value,
            bookTypeId: document.getElementById("bookType").value,
            author:document.getElementById("author").value,
            nxb:document.getElementById("NXB").value,
            year:document.getElementById("YEAR").value,
            language:document.getElementById("language").value,
            pageAmount: document.getElementById("pageAmount").value,
            review:document.getElementById("Review").value
        } 
        const postInformation = await fetch(BE_ENDPOINT+"librarian/create/BookTitle/info",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("token")
            }, 
            body:JSON.stringify(data)
        });
        if(!postInformation.ok) 
            {
                return;
            }  
            alert("Created book title");
    } 
    

    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <h3>Đăng ký sách mới</h3> 
                <form id="register_form">
                    <div>
                        <label htmlFor="bookName">Tên sách :</label> 
                        <input type="text" required id="bookName"/>
                    </div>
                    <div>
                        <label htmlFor="bookType">Thể loại :</label> 
                        <select id="bookType" required>
                            {
                                bookType.map((item)=>{
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="author">Tác giả :</label> 
                        <input id="author" required type="text"/>
                    </div> 
                    <div>
                        <label htmlFor="NXB">Nhà xuất bản :</label>
                        <input id="NXB" type="text" required/>
                    </div> 
                    <div>
                        <label htmlFor="YEAR">Năm xuất bản :</label>  
                        <input type="number" min="1900" max="2024" id="YEAR" required/>
                    </div>  
                    <div>
                        <label htmlFor="language">Ngôn ngữ : </label> 
                        <input type="text" id="language" required/>
                    </div>
                    <div>
                        <label htmlFor="pageAmount">Số lượng trang : </label> 
                        <input type="number" id="pageAmount" required min="10"></input>
                    </div>
                    <div> 
                        <label htmlFor="Review">Mô tả nội dung :</label> 
                        <textarea required id="Review"></textarea>
                    </div> 
                    <div>
                        <label htmlFor="Image">Hình ảnh bìa sách :</label> 
                        <input type="file" id="Image" required/>
                    </div>
                    <div>
                        <input type="submit"/>
                    </div>


                </form>
            </div>
        </div>
    )
} 
export default RegisterNewBookTitleForm;