import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main"; 
import * as XLSX from 'xlsx'
import BE_ENDPOINT from "../Env/EndPont";
function SellBookForm() 
{
    const listBookSell = {
        implementDate: new Date(),
        listDetailRequest:[]

    } 
    

    const [listBook, setListBook] = useState([]);  
    const [listSellBook, setListSellBook] = useState([]);
    useEffect(()=>{
        async function getAllBook() 
        {
            const response = await fetch(BE_ENDPOINT+"books/all");
            if(!response.ok) 
            {
                return;
            } 
            const responseData= await response.json(); 
            console.log(responseData);
            setListBook(responseData);
        } 
        getAllBook();
    },[])
    async function onSubmit() 
    {
        const file = document.getElementById("uploadExcelFile").files[0];
        const reader = new FileReader();
        reader.onload=(e)=>{
            const data= new Uint8Array(e.target.result);
            const workBook = XLSX.read(data,{type:"array"});
            const firstSheetName = workBook.SheetNames[0]; 
            const worksheet = workBook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet); 
            
            listBookSell.listDetailRequest=json;
            

        };
        reader.readAsArrayBuffer(file); 
        const response = await fetch(BE_ENDPOINT+"librarian/sell/book",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(listBookSell)
        });
        if(!response.ok) 
        {
            alert("Sell book fail");
        }
        const message= await response.text();
        document.getElementById("messageArea").innerHTML=message;
    }
 
    async function onConfirmAdd() 
    {
        document.getElementById("messageArea").innerHTML="";
        
        const newData = {
            bookId:document.getElementById("bookId").value,
            price:document.getElementById("price").value
        }
        const response = await fetch(BE_ENDPOINT+"librarian/checkCanSold/"+newData.bookId,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) {
            document.getElementById("messageArea").innerHTML="Đã có lỗi xảy ra, vui lòng thử lại";
            return;
        }
        const responseData = await response.json();
        if(responseData.message) 
        {
            document.getElementById("messageArea").innerHTML=responseData.message;
            return;
        }
        
        setListSellBook([...listSellBook, newData]) 
       
    } 
    function onConfirmDeleteAll() 
    {
        setListSellBook([]);
    }
    function onDeleteAt(id) 
    {
        const listTemp= listSellBook.filter((item)=>{
            if(item.bookId==id) 
            {
                return false;
            } 
            return true;
        });
        setListSellBook(listTemp);
    }


    async function onConfirmSell() 
    {
        const data = {
            implementDate:new Date(),
            listDetailRequest:listSellBook
        } 
        const response = await fetch(BE_ENDPOINT+"librarian/sell/book",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            alert("Sell book fail");
        }
        const message= await response.text();
        document.getElementById("messageArea").innerHTML=message;
    }
   return (
    
        <div>
            <Header_Main>

            </Header_Main> 
           <div>
            <h2>Ban sach</h2> 
            <div>
                <form id="sell_book_info" onSubmit={(e)=>{
                        e.preventDefault();
                        onConfirmAdd();
                    }}>
                    <label htmlFor="bookId">Ma sach</label> 
                    <input type="number" id="bookId" required/>
                    <label htmlFor="price">Gia ban</label> 
                    <input type="number" id="price" required/>
                    <input type="submit" value="Them"/>
                </form>
                <div id="messageArea"></div>
                <div>
                    <button 
                    onClick={(e)=>{
                        e.preventDefault();
                        onConfirmSell();
                    }}  
                    >Xac nhan</button> 
                    <button  
                    onClick={(e)=>{
                        e.preventDefault();
                        onConfirmDeleteAll();
                    }}
                    >Xoa toan bo</button> 
                    <button>Huy</button>
                </div>
            </div>
            <div>
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
                        {
                            listSellBook.map((item, index)=>{ 
                                return (
                                <tr key={index}>
                                    <td>{index+1}</td>  
                                    <td>{item.bookId}</td> 
                                    <td>{item.price}</td> 
                                    <td><button onClick={
                                        (e)=>{
                                            e.preventDefault();
                                            onDeleteAt(item.bookId);
                                        }
                                    }>Xoa</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
           </div>
            
        </div>
    

   )
    

}
export default SellBookForm;