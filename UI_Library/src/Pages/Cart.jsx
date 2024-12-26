import {React,useState, useEffect} from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/Cart.css'
import BookCover from '../assets/Book_Cover/rezero.png'
import recycleBin from '../assets/Icons/recycle_bin.png'
import { useNavigate } from 'react-router-dom' 
import BE_ENDPOINT from '../Env/EndPont'

const exampleCartItems=[
        { id: 1, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:'', quantity: 1, ischecked: true},
        { id: 2, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image: '', quantity: 1, ischecked: true},
        { id: 3, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image: '', quantity: 1, ischecked: true},
        { id: 4, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image: '', quantity: 1, ischecked: true},
        { id: 5, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:'', quantity: 1, ischecked: true},
        { id: 6, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:'', quantity: 1, ischecked: true},
    ];
const Cart = () => {

    const navigate=useNavigate()

    const [cartItems,setCartItems]=useState([]);
    let [selectedCartItem, setSelectedCartItem] = useState([]);
    useEffect(()=>{ 
        async function getAllCartData() 
        {
            const response= await fetch(BE_ENDPOINT+"reader/cart",{
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
            const responseData = await response.json(); 
            console.log(responseData);
            setCartItems(responseData);
            setSelectedCartItem(responseData);
    
        } 
        getAllCartData();
    
       },[]);
    const [selectAll,setSelectAll]=useState(true)

    const numItems=cartItems.length;

    const handleIncrement=(id)=>{
        setCartItems((items)=>
            items.map((item)=>
                item.id===id ? {...item,amount: item.amount+1 } : item
            )
        );
    }
    const handleDecrement=(id)=>{
        setCartItems((items)=>
            items.map((item)=>
                item.id===id && item.amount > 1 ? {...item,amount: item.amount - 1 } : item
            )
        );
    }
    const handleDeleteItem= async (id)=>{
        const response= await fetch(BE_ENDPOINT+"reader/deleteItemFromCart/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        } 
        alert("Success");
        window.location.reload();
    }

    const handleOnchangeChecked=(item, isChecked)=>{ 
        if(isChecked) 
        {
            selectedCartItem.push(item);
        } 
        if(!isChecked) 
        {
            selectedCartItem= selectedCartItem.filter((i)=>{
                if(i.cartDetailId==item.cartDetailId) 
                    return false;
                return true;
            })
        }
       
    }
    const handleConfirmCartSubmit=async ()=>{
        // Update Cart Database trước
        // Điều hướng đến Phiếu mượn
        var countBook=0;
        cartItems.map((item)=>{
            countBook=countBook + item.ischecked
        })
        if(cartItems.length===0)
            alert('Giỏ hàng trống! Hãy tìm kiếm thêm vài cuốn sách cho giỏ hàng của bạn.')

        else if(countBook < 1)
            alert('Vui lòng chọn ít nhất một cuốn sách để mượn')
        else
        { 
            const data= {
                listRequest:selectedCartItem.map((item)=>{
                     return {
                        cartDetailId: item.cartDetailId,
                        amount: item.amount
                     }
                })
            }; 
            console.log(data);
            console.log(selectedCartItem);
            const response = await fetch(BE_ENDPOINT+"reader/borrow/cart", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                },
                body:JSON.stringify(data)
            }); 
            if(!response.ok) 
            {
                alert("Fail");
                return;
            } 
            const responseData= await response.json();
            console.log(responseData);
            if(responseData.message=="Not enough"){
            let messageString = "Khong du sach ";
            for(let i=0;i<responseData.listResponse.length;i++) 
            {
                messageString+=responseData.listResponse[i]+",";
            } 
            messageString+="vui long dieu chinh lai so luong";
            alert(messageString); 
            return;
        }
            alert("Muon sach thanh cong"); 
            navigate("/history");
        }
    }
    const handleOnchangeSelectAll=()=>{
       selectedCartItem=cartItems;
    }     
    async function onSaveAllCartItem(cartItems) 
    {
        const data= cartItems.map((item)=>{
            return {
                cartDetailId: item.cartDetailId,
                amount:item.amount
            }
        });
        
        const response = await fetch(BE_ENDPOINT+"reader/saveCart",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token") 
            },
            body:JSON.stringify(data)
        });
        if(!response.ok) 
        {
            alert("Fail");
            return;
        } 
        alert("Success");
        return;
    }     
     
    return (
    <div>
      <Header_Main></Header_Main>
      <div className='content-wrapper'>
        <h2>Giỏ hàng </h2>
        <div className='checkBox-select-book'>
            <input
                className='checked-box'
                type='checkbox'
                checked={selectAll}
                onChange={handleOnchangeSelectAll}/>
            <p>Chọn tất cả ( {numItems} cuốn sách )</p>
            <p className='bookNumber-header'>Số lượng</p>
        </div>
        <div className='cart-container'>
            {cartItems.map((item)=>{
                return (
                    <div className='cart-item'>
                        <input 
                            className='checked-box'
                            type='checkbox'
                            defaultChecked={true}
                            onChange={(e)=>{
                                handleOnchangeChecked(item, e.target.checked);
                                
                                console.log(selectedCartItem);    
                            }}/>
                        <img
                            className='book-cover-item'
                            src={'data:image/jpeg;base64,'+item.image} //item.image
                            alt={item.title}/>
                        <p>{item.title}</p>
                        <div className='adjustNum-box'>
                            <button
                                onClick={()=>handleDecrement(item.id)}
                                >
                                -
                            </button>
                            <input
                                disabled
                                type='number'
                                value={item.amount}
                                ></input>
                            <button
                                onClick={()=>handleIncrement(item.id)}
                                >
                                +
                            </button>
                        </div>
                        <img className='deleteBtn-Icon' src={recycleBin} alt='delete' 
                            onClick={()=>handleDeleteItem(item.cartDetailId)}/>
                    </div>
                )
            })}
        </div>

        <button className='cart-confirm-btn' onClick={()=>handleConfirmCartSubmit()}>Mượn</button>
        <button className='cart-confirm-btn' onClick={(e)=>{
            e.preventDefault();
            onSaveAllCartItem(cartItems);
        }}>Lưu</button>
      </div>
    </div>
  )
}

export default Cart