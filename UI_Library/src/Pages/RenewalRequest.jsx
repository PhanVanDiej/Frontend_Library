import React from "react"; 
import Header_Main from "../Components/Header_Main";
function RenewalRequestPage() 
{
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div>
                <h2>Danh sach cac yeu cau gia han</h2>  
                <div>
                    <input type="text" id="search" placeholder="Tim kiem bang ma doc gia"/> 
                    <button>Tim</button>
                </div>
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>STT</th> 
                                <th>Ma doc gia</th> 
                                <th>Ten doc gia</th> 
                                <th>Ma phieu muon</th> 
                                <th>Ma sach</th> 
                                <th>Ten sach</th> 
                                <th>Ngay muon</th> 
                                <th>Gia han den</th> 
                                <th>Chap nhan</th> 
                                <th>Tu choi</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
         </div>
    )
} 
export default RenewalRequestPage;