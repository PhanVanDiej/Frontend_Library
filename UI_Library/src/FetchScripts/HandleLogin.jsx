import BE_ENDPOINT from "../Env/EndPont";
async function handleLogin(nameOrEmail, password) 
{   
    const requestData = {
        nameOrEmail:nameOrEmail,
        password:password
    };
    const response= await fetch(BE_ENDPOINT+"login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(requestData)
    });
    if(!response.ok) 
    {
        return "Fail";
    }
    const responseData= await response.json(); 
    console.log(responseData);

    localStorage.setItem("userId",responseData.userId);
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("role_user", responseData.role);
    return "Success";
}
export default handleLogin;