<<<<<<< HEAD
import React from 'react'
import Header_Main from '../Components/Header_Main'
=======
import React, { useEffect, useState } from 'react'
import BE_ENDPOINT from '../Env/EndPont'; 
import NotificationTag from '../Components/Notification';
>>>>>>> FetchToServer

const Announcement = () => {
  const [data, setData ]=useState(null);
  const [isLoad, setIsLoad]= useState(false); 
  useEffect(()=>{ 
    async function fetchData() 
    { 
        const token= localStorage.getItem("token");
        if(token==null) 
        {
          return "Fail";
        }
        const listNotif = await fetch(BE_ENDPOINT+"reader/allNotifications",{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
          }
        });
        if(!listNotif.ok) 
        {
          return "Fail";
        } 
        const listNotifData= await listNotif.json();
        setData(listNotifData); 
        setIsLoad(true);

    } 
    fetchData();

  }, []); 
   
    
    if(data!=null) 
      {
        console.log(data);
        return(<div>
          <div>
        <h1>Thong bao</h1>
      </div> 
      <div> 
        <ul>
          {data.map((item)=>{ 
            console.log(item);
           return ( <li key={item.notifId}>
              <NotificationTag notification={item}></NotificationTag>
            </li>)
          })}
        </ul>
        </div> 
      </div>
        )
      }
  
  

  return (
    <div>
      <Header_Main></Header_Main>
      <h1>Thong bao</h1>
    </div>
    
  )
}

export default Announcement
