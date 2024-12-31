import BE_ENDPOINT from "../Env/EndPont";
async function handleRegister(information) 
{
    const data= JSON.stringify(information);
    console.log(data);
    const response= await fetch(BE_ENDPOINT+"register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:data
    });
    const responseString = "Success";
    return responseString;
    
} 
export default handleRegister;