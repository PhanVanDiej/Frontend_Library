import React, { useState , useEffect} from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import lockOrUnlockUser from "../FetchScripts/LockOrUnlockUser";
import { useLocation } from "react-router-dom";
import permissionLibrarian from "../Env/PermissionLibrarian";
import ReaderItem from "../Components/ReaderItem";
import '../Styles/Pages/ReaderManagement.css';
const ReadersExample=[
    {
        id: "R001",
        fullname: "Alice Johnson",
        email: "alice.johnson@example.com",
        phoneNumber: "+1-555-123-4567",
        penaltyTime: 10, // Penalty duration in days
        status: true
    },
    {
        id: "R002",
        fullname: "John Smith",
        email: "john.smith@example.com",
        phoneNumber: "+1-555-987-6543",
        penaltyTime: 0, // No penalty
        status: false
    },
    {
        id: "R003",
        fullname: "Emily Davis",
        email: "emily.davis@example.com",
        phoneNumber: "+1-555-543-2109",
        penaltyTime: 5, // Penalty duration in days
        status: true
    },
    {
        id: "R004",
        fullname: "Michael Brown",
        email: "michael.brown@example.com",
        phoneNumber: "+1-555-678-1234",
        penaltyTime: 0, // No penalty
        status: false
    },
    {
        id: "R005",
        fullname: "Sophia Wilson",
        email: "sophia.wilson@example.com",
        phoneNumber: "+1-555-432-5678",
        penaltyTime: 15, // Penalty duration in days
        status: true
    }
];
function ReaderManagement()
{
    const [listUser, setListUser] = useState([]);
    const [listTemp, setListTemp]= useState([]);
    const location = useLocation();
    const user = location.state||{};

    const [selectedItem,setSeclectedItem]=useState(null);

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

    const handleOnEnableClick=(item)=>{
        setSeclectedItem(item);
    }
    const handleOnDisableClick=(item)=>{
        setSeclectedItem(item);
    }
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
                    {/* <table border={1}>
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
                    </table> */}
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
                        {ReadersExample.map((item,index)=>(
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