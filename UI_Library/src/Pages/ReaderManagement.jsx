import React, { useState , useEffect} from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import lockOrUnlockUser from "../FetchScripts/LockOrUnlockUser";
import { useLocation } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
import '../Styles/Pages/ReaderManagement.css';
import ReaderItem from "../Components/ReaderItem";

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
            return (item.userId==value||item.fullname.includes(value));
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

                <div className="content-table">
                    <div className="reader-list-header">
                        <div className="STT">STT</div>
                        <div className="id">Mã đọc giả</div>
                        <div className="fullname">Tên đọc giả</div>
                        <div className="email">Email</div>
                        <div className="phoneNumber">Số điện thoại</div>
                        <div className="penaltyTime">Số lần vi phạm</div>
                        <div className="user-action">Hành động</div>
                    </div>
                    <div className="header-border-line"></div>
                    <div className="reader-list-data">
                        {listUser.map((item,index)=>(
                            <ReaderItem
                            item={item}
                            index={index}
                            onEnable={()=>handleOnEnableClick(item)}
                            onDisable={()=>handleOnDisableClick(item)}/>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
} 
export default ReaderManagement;