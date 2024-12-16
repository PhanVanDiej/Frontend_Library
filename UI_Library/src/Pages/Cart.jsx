import {React,useEffect,useState} from 'react'
import Header_Main from '../Components/Header_Main'
import '../Styles/Pages/Cart.css'
import BookCover from '../assets/Book_Cover/rezero.png'
import recycleBin from '../assets/Icons/recycle_bin.png'
import BE_ENDPOINT from '../Env/EndPont'
import displayImageURL from '../Env/DisplayImage'
const Cart = () => {
    const numItems=2;

    /*const exampleCartItems=[
        { id: 1, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:''},
        { id: 2, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image: ''},
        { id: 3, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image: ''},
        { id: 4, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18',image: ''},
        { id: 5, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:''},
        { id: 6, title: 'Re: Zero - Bắt đầu lại ở một thế giới khác - Tập 18', image:''},
    ]*/
   const [exampleCartItems, setExampleCartItems] = useState([]);
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
        setExampleCartItems(responseData);

    } 
    getAllCartData();

   },[])

    const [adjustValue,setAdjustValue]=useState(1);

    const handleIncrement = () => {
        setAdjustValue(adjustValue + 1); 
    };
    
    const handleDecrement = () => {
        if (adjustValue > 0) {
            setAdjustValue(adjustValue - 1);
        }
    };

    const handleChangeValue = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };
    return (
    <div>
      <Header_Main></Header_Main>
      <div className='content-wrapper'>
        <h2>Giỏ hàng </h2>
        <div className='checkBox-select-book'>
            <p>Số sách trong giỏ ( {numItems} cuốn sách )</p>
            <p className='bookNumber-header'>Số lượng</p>
        </div>
        <div className='cart-container'>
            {exampleCartItems.map((item)=>{
                return (
                    <div className='cart-item'>
                        <img
                            className='book-cover'
                            src={
                                "data:image/jpeg;base64,"+item.image
                            }
                            alt={item.title}/>
                        <p>{item.title}</p>
                        <div className='adjustNum-box'>
                            <button
                                onClick={handleDecrement}
                                >
                                -
                            </button>
                            <input
                                disabled
                                type='number'
                                value={adjustValue}
                                onChange={handleChangeValue}></input>
                            <button
                                onClick={handleIncrement}
                                >
                                +
                            </button>
                        </div>
                        <img className='deleteBtn-Icon' src={recycleBin} alt='delete'/>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Cart
