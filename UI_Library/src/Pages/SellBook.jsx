import React from "react"; 
import Header_Main from "../Components/Header_Main"; 
import * as XLSX from 'xlsx'
import BE_ENDPOINT from "../Env/EndPont";
function SellBookForm() 
{
    const listBookSell = {
        implementDate: new Date(),
        listDetailRequest:[]

    } 
    async function onSubmit() 
    {
        const file = document.getElementById("uploadExcelFile").files[0];
        const reader = new FileReader();
        reader.onload=(e)=>{
            const data= new Uint8Array(e.target.result);
            const workBook = XLSX.read(data,{type:"array"});
            const firstSheetName = workBook.SheetNames[0]; 
            const worksheet = workBook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet); 
            
            listBookSell.listDetailRequest=json;
            

        };
        reader.readAsArrayBuffer(file); 
        const response = await fetch(BE_ENDPOINT+"librarian/sell/book",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify(listBookSell)
        });
        if(!response.ok) 
        {
            alert("Sell book fail");
        }
        const message= await response.text();
        document.getElementById("messageArea").innerHTML=message;
    }
   return (
    
        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <form onSubmit={(e)=>{ 
                    e.preventDefault(); 
                    onSubmit();

                }}>
                    <div>
                        <label htmlFor="üploadExcelFile" > 
                           Tải file dữ liệu
                        </label> 
                        <input type="file" required id="uploadExcelFile"/>
                    </div> 
                    <input type="submit" value="Xac nhan ban sach"/>
                </form>
            </div>
            <p id="messageArea"></p>
        </div>
    

   )
    

}
export default SellBookForm;