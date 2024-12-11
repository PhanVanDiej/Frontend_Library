import React, { useEffect, useState } from "react"; 
import Header_Main from "../Components/Header_Main";
import BE_ENDPOINT from "../Env/EndPont";
import LibrarianDetail from "../Components/LibrarianInformation";
function LibrarianInformation(){
const [librarianData, setLibrarianData]= useState([]);
const [listSelectLibrarian, setListSelecctLibrarian]= useState([]);
function onSearchLibrarian(searchData) 
{
    if(searchData=="") 
    {
        setListSelecctLibrarian(librarianData);
    }  
    setListSelecctLibrarian(librarianData.filter((item)=>{
        return item.fullname.includes(searchData);
    }))
}
useEffect(()=>{ 
    async function getAllLibrarian() 
    {
        const response = await fetch(BE_ENDPOINT+"admin/getAllLinrarian",{
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
        console.log(responseData);
        setLibrarianData(responseData); 
        setListSelecctLibrarian(responseData);
        
    }
    getAllLibrarian();

},[])
return (
    <div>
        <Header_Main>

        </Header_Main> 

        <div>
            <h2>Quan ly thu thu</h2> 
            <div>
                <button>Them tai khoan thu thu</button>
                <br></br>
            </div>

            <div>
                <input type="text" placeholder="Tim kiem bang ten thu thu" onKeyDown={(e)=>{
                    if(e.key=="Enter") 
                    {
                        console.log("Search");
                        onSearchLibrarian(e.target.value);
                    }
                }}/>
            </div>
        </div> 
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>STT</th> 
                        <th>Ma thu thu</th> 
                        <th>Ho va ten</th> 
                        
                        <th>SDT</th> 
                        <th>Email</th> 
                        <th>Dia chi</th> 
                        <th>Trang thai</th>
                    </tr>
                </thead>
                <tbody id="librarianTableBody">
                    {
                        listSelectLibrarian.map((item, index)=>{
                            return <LibrarianDetail librarian={item} itemId={index+1}></LibrarianDetail>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
);
}
export default LibrarianInformation;