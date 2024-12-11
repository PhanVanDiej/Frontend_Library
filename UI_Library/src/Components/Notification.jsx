import React from "react"; 
import BE_ENDPOINT from "../Env/EndPont"; 

function NotificationTag({notification}) 
{
    return (
        <div>
            <h2>{notification.subject}</h2> 
            <h3>{notification.message}</h3>
            <h3>{notification.sendingDate}</h3>
        </div>
    )
} 
export default NotificationTag;