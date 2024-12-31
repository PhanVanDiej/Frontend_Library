import React, { useState , useEffect} from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import lockOrUnlockUser from "../FetchScripts/LockOrUnlockUser";
import { useLocation } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";

function ReaderManagement()
{
    const [listUser, setListUser] = useState([]);
    const [listTemp, setListTemp]= useState([]);
    const location = useLocation();
    const user = location.state||{};

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
            if(user.userId==undefined) 
            {
                setListUser(responseData); 
                setListTemp(responseData);
            }
            else {
                setListUser([user]);
                setListTemp(responseData);
                document.getElementById("searchBar").defaultValue=user.userId;
            }
            
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
    permissionLibrarian();
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            
            <div className="main-content"> 
                <h2 className="title-page">Quản lý độc giả</h2>
                <div className="filter-header">
                    <input className="search-input" type="text" id="searchBar" placeholder="Tìm kiếm bằng mã độc giả hoặc họ tên" onKeyDown={(e)=>{
                        //e.preventDefault();
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
                                <th>Số lần vi phạm</th>
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
                                        <td>{index+1}</td> 
                                        <td>{item.userId}</td> 
                                        <td>{item.fullname}</td> 
                                        <td>{item.email}</td> 
                                        <td>{item.phoneNumber}</td>  
                                        <td>{item.penaltyTime}</td>
                                        <td><button onClick={
                                            (e)=>{
                                                e.preventDefault();
                                                lockOrUnlockUser(item.userId,item.enable);

                                            }
                                        }>{stateText}</button></td>
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