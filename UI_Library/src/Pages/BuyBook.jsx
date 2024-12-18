import React, { useState, useEffect } from "react"; 
import Header_Main from "../Components/Header_Main";
import BuyBookTitleForm from "../Components/BuyBookTitleForm";
import BE_ENDPOINT from "../Env/EndPont";
import BuyBook from "../FetchScripts/BuyBook";

function BuyBookForm() 
{
    let [listBuyBook, setListBuyBook]= useState({
        librarianId:localStorage.getItem("userId"),
        implementData:new Date(),
        listDetailRequest:[]
    });  
    async function onSubmit() 
    {
        const result= await BuyBook(listBuyBook); 
        document.getElementById("messageArea").innerHTML=result;

    }


    const [listBookTitle, setListBookTitle]= useState([]);
    useEffect(()=>{ 
        async function fetchFromServer() 
        {
            const response = await fetch(BE_ENDPOINT+"book-titles/all"); 
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json();
            setListBookTitle(responseData);

        } 
        fetchFromServer();


    },[]) ;
    function serchById(id) 
    {
        for(let i=0;i<listBookTitle.length;i++) 
        {
            if(id==listBookTitle[i].id) 
            {
                return listBookTitle[i].name;
            }
        } 
        return "";
    }

    return (
        <div>
            <Header_Main></Header_Main>  
            <h3>Nhap sach</h3> 
            <div>
                
                <div>
                    <button>Xoa toan bo</button>
                    <button>Them</button>
                </div> 
                <div>
                <div>
            <form id="buyBookTitle" onSubmit={(e)=>{
                e.preventDefault();
                const data = {
                    bookTitleId:document.getElementById("buyBookTitleName")?.value,
                    amount:document.getElementById("buyBookTitleAmount")?.value,
                    price:document.getElementById("buyBookTitlePrice")?.value
                }; 
                const updateList={
                    ...listBuyBook,
                    listDetailRequest: [...listBuyBook.listDetailRequest, data]
                } 
                setListBuyBook(updateList);
                console.log(data);
                
            }}> 
                <div>
                <label htmlFor="buyBookTitleName">Ten sach: </label>
                <select id="buyBookTitleName" required> 
                    {
                        listBookTitle?.map((item)=>{
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                    </select> 
                </div> 
                <div>
                <label htmlFor="buyBookTitlePrice">Don gia:</label> 
                <input type="number" required min="1" id="buyBookTitlePrice"/>
                </div> 
                <div>
                    <label htmlFor="buyBookTitleAmount">So luong:</label> 
                    <input type="number" required min="1" id="buyBookTitleAmount"/>
                </div>
                <input type="submit" value="Them"/>


                
            </form>
        </div>
                </div>
            </div>  
            <div>
                <button id="confirmBuy" onClick={
                    (e)=>{
                        e.preventDefault();
                        onSubmit();

                    }
                }>Xac nhan mua sach</button>
            </div>
            <div>
                <table border={1}>
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
                        {
                            listBuyBook.listDetailRequest.map((item, index)=>{
                                return (<tr>
                                    <td>{index+1}</td>  
                                    <td>{item.bookTitleId}</td>
                                    <td>{serchById(item.bookTitleId)}</td> 
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                    <td><button>Xóa</button></td>

                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div> 
            <p id="messageArea"></p>
            
        </div>
    )
} 
export default BuyBookForm;