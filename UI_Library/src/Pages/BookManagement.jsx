import { useEffect, useState } from "react";
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont"; 
function BookManagementPage() 
{
    const [listSelectBook, setListSelectedBook] = useState([]);
    const [listBook, setListBook] = useState([]);
     useEffect(()=>{
        async function getAllBookFromServer() 
        {
            const listBookResponse= await fetch(BE_ENDPOINT+"librarian/getAllBook",{
                method:"GET",
                headers:{
                    "Content-Type":"äpplication/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!listBookResponse.ok) 
                {
                    return;
                }  
            const listBookData = await listBookResponse.json();
            setListBook(listBookData);
            setListSelectedBook(listBookData);
        } 
        getAllBookFromServer();

     },[]); 
     function onSearch(searchType) 
     {
        const keyword= document.getElementById("searchData").value ;
        const listRes= listBook.filter((item)=>{
            if(searchType!="Tat ca")  
            {
                if(searchType=="Sang sang") 
                {
                    if(item.status.id!=0) 
                    {
                        return false;
                    } 
                    
                } 
                if(searchType=="Dang cho muon") 
                {
                    if(item.status.id!=1) 
                    {
                        return false;
                    }
                } 
                if(searchType=="Dang duoc muon") 
                {
                    if(item.status.id!=3) 
                    {
                        return false;
                    }
                }
            }
            if(item.id==value) 
                return true;
            if(item.title.name.includes(value))   
                return true;
            if(item.title.type.nam.includes(value)) 
                return true;
            return false;
        }) 
        setListSelectedBook(listRes);
     } 
     

    return (
        <div>
            <Header_Main></Header_Main> 

            <div>
                <h2>Quan ly sach</h2> 
                <div>
                    <input type="text" placeholder="Tim kiem" id="searchData" onKeyDown={(e)=>{
                        e.preventDefault();
                        if(e.key=="Enter") 
                        {
                            onSearch(document.getElementById("searchType").value);
                        }
                    }}/> 
                   <select id="searchType">
                    <option value="Tat ca">Tat ca</option> 
                    <option value="San sang">San sang</option> 
                    <option value="Dang cho muon">Dang cho muon</option> 
                    <option value="Dang duoc muon">Dang duoc muon</option>
                   </select>
                </div>
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Ma sach</th> 
                                <th>Ten dau sach</th> 
                                <th>The loai</th> 
                                <th>Trang thai</th> 
                                <th>Xoa sach</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                listSelectBook.map((item, index)=>{
                                    return (
                                        <tr>
                                            <td>{index+1}</td> 
                                            <td>{item.id}</td> 
                                            <td>{item.title.name}</td> 
                                            <td>{item.title.type.name}</td>  
                                            <td>{item.status.name}</td>
                                            <td><button>Xoa</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 
export default BookManagementPage