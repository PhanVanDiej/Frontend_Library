import {React,useState} from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/Cart.css'
import BookCover from '../assets/Book_Cover/rezero.png'
import recycleBin from '../assets/Icons/recycle_bin.png'
import { useNavigate } from 'react-router-dom'

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

    const [cartItems,setCartItems]=useState(exampleCartItems);
    const [selectAll,setSelectAll]=useState(true)

    const numItems=cartItems.length;

    const handleIncrement=(id)=>{
        setCartItems((items)=>
            items.map((item)=>
                item.id===id ? {...item,quantity: item.quantity+1 } : item
            )
        );
    }
    const handleDecrement=(id)=>{
        setCartItems((items)=>
            items.map((item)=>
                item.id===id && item.quantity > 1 ? {...item,quantity: item.quantity - 1 } : item
            )
        );
    }
    const handleDeleteItem=(id)=>{
        setCartItems((items)=>
            items.filter((item)=> item.id!==id)
        )
    }

    const handleOnchangeChecked=(id)=>{
        setCartItems((items)=>
            items.map((item)=>
                item.id===id ? {...item,ischecked: !item.ischecked } : item
            )
        );
    }
    const handleConfirmCartSubmit=()=>{
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
        navigate('/borrow_slip')
    }
    const handleOnchangeSelectAll=()=>{
        setCartItems((items)=>
            items.map((item)=>
                item= selectAll?  {...item,ischecked:false}:{...item,ischecked:true}
            )
        );
        setSelectAll(!selectAll)
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
                            checked={item.ischecked}
                            onChange={()=>handleOnchangeChecked(item.id)}/>
                        <img
                            className='book-cover-item'
                            src={BookCover} //item.image
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
                                value={item.quantity}
                                ></input>
                            <button
                                onClick={()=>handleIncrement(item.id)}
                                >
                                +
                            </button>
                        </div>
                        <img className='deleteBtn-Icon' src={recycleBin} alt='delete' 
                            onClick={()=>handleDeleteItem(item.id)}/>
                    </div>
                )
            })}
        </div>

        <button className='cart-confirm-btn' onClick={()=>handleConfirmCartSubmit()}>Mượn</button>
      </div>
    </div>
  )
}

export default Cart
