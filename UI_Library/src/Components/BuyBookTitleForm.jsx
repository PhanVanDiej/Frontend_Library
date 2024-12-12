import React, { useEffect } from "react"; 
function BuyBookTitleForm({listBookTitle, listBuyBookTitle, setListBuyBookTitle}) 
{
    useEffect(()=>{ 
        document.getElementById("buyBookTitle").addEventListener("submit",(e)=>{
            e.preventDefault();
            const data = {
                bookTitleId:document.getElementById("buyBookTitleName")?.value,
                amount:document.getElementById("buyBookTitleAmount")?.value,
                price:document.getElementById("buyBookTitlePrice")?.value
            };
            console.log(data);
            let listTemp = listBuyBookTitle;
            listTemp.listDetailRequest.push(data);
            console.log(listTemp);
            setListBuyBookTitle(listTemp);  
            
            
        }

        )

    },[])
    return (
        <div>
            <form id="buyBookTitle"> 
                <div>
                <label htmlFor="buyBookTitleName">Tên sách: </label>
                <select id="buyBookTitleName" required> 
                    {
                        listBookTitle?.map((item)=>{
                            return <option value={item.id}>{item.name}</option>
                        })
                    }
                    </select> 
                </div> 
                <div>
                <label htmlFor="buyBookTitlePrice">Đơn giá :</label> 
                <input type="number" required min="1" id="buyBookTitlePrice"/>
                </div> 
                <div>
                    <label htmlFor="buyBookTitleAmount">Số lượng:</label> 
                    <input type="number" required min="1" id="buyBookTitleAmount"/>
                </div>
                <input type="submit" value="Them"/>


                
            </form>
        </div>
    )
} 
export default BuyBookTitleForm