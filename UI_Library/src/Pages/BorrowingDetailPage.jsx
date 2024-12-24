import React from "react"; 
import Header_Main from "../Components/Header_Main";
function BorrowingDetailPage() 
{
    return (
        <div>
            <Header_Main>

            </Header_Main> 
            <div> 
                <h2>Danh sach phieu muon</h2>
                <div>
                    <button>Tat ca</button> 
                    <button>Dang cho lay</button> 
                    <button>Dang duoc muon</button> 
                    <button>Da tra</button>
                </div> 
                <div>
                <input type="text" id="searchDate" placeholder="Tim kiem bang ma phieu"/> 
                <button>Tim</button>
                </div>
                <table border={1}>
                   <thead>
                    <tr>
                        <th>STT</th> 
                        <th>Ma phieu muon</th> 
                        <th>Ma sach</th> 
                        <th>Ten sach</th> 
                        <th>Ma doc gia</th> 
                        <th>Ten doc gia</th> 
                        <th>Ngay muon</th> 
                        <th>Ngay tra</th> 
                        <th>Hanh dong</th>
                    </tr>
                   </thead>
                </table>
            </div>
        </div>
    )
} 
export default BorrowingDetailPage;