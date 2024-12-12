import BE_ENDPOINT from "../Env/EndPont";

async function BuyBook(listBuyBook) 
{
    const response = await fetch(BE_ENDPOINT+"librarian/buyBook",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify(listBuyBook)
    });
    if(!response.ok) 
    {
        return "Mua sách thất bạibại";
    } 
    return "Mua sách thành công";
} 
export default BuyBook;