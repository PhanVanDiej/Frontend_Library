import React, { useState , useEffect} from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import lockOrUnlockUser from "../FetchScripts/LockOrUnlockUser";

function ReaderManagement()
{
    const [listUser, setListUser] = useState([]);
    const [listTemp, setListTemp]= useState([]);

    useEffect(()=>{ 
        async function fetchFromServer() 
        {
            const response = await fetch(BE_ENDPOINT+"librarian/getAllReader",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            });
            if(!response.ok) 
            {
                return; 
            } 
            const responseData= await response.json(); 
            
            setListUser(responseData); 
            setListTemp(responseData);
            
        } 
        fetchFromServer();

    },[]) 
    function onSearch(value) 
    {
        setListUser(listTemp); 
       
        if(value=="") 
        {
            return;
        }
        let listResult = listTemp.filter((item)=>{
            return (item.userId==value);
        });
        setListUser(listResult);
    }

    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div> 
                <div>
                <input type="number" id="searchBar" placeholder="Tim kiem bang ma doc gia" onKeyDown={(e)=>{
                    e.preventDefault();
                    if(e.key=="Enter")
                    {  
                        onSearch(document.getElementById("searchBar").value);
                    }        
                     }}/> 
                </div>

                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Mã độc giả</th>
                                <th>Tên độc giả</th> 
                                <th>Email</th> 
                                <th>Số điện thoại</th> 
                                <th>Trạng thái</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {
                                listUser.map((item, index)=>{ 
                                    let state= item.enable; 
                                    let stateText="";
                                    if(state) 
                                    {
                                        stateText="Vô hiệu hóa";
                                    } 
                                    else {
                                        stateText="Mở khóa";
                                    }
                                    return <tr>
                                        <th>{index+1}</th> 
                                        <th>{item.userId}</th> 
                                        <th>{item.fullname}</th> 
                                        <th>{item.email}</th> 
                                        <th>{item.phoneNumber}</th> 
                                        <th><button onClick={
                                            (e)=>{
                                                e.preventDefault();
                                                lockOrUnlockUser(item.userId,item.enable);

                                            }
                                        }>{stateText}</button></th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
} 
export default ReaderManagement;