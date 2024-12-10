import React from 'react'
import bookImage from '../assets/Images/book.png'
import leftArrow from '../assets/Icons/left_arrow.png'
import rightArrow from '../assets/Icons/right_arrow.png'
import BE_ENDPOINT from '../Env/EndPont.jsx'
import { useState , useEffect} from 'react'  

import displayImageURL from '../Env/DisplayImage.jsx'
const BooksType_Carousel =  ()=> {  
   const [data, setData] = useState([]);
   const [loading, setLoading]= useState(false);
   useEffect(()=>{
        const fetchData = async function() 
        {
            const response= await fetch(BE_ENDPOINT+"book-types");
            const responseData = await response.json();
            
            setData(responseData);
            setLoading(true);
            

        } 
        fetchData();
    },[]
   );
   useEffect(()=>{
    console.log(data)
   },[data]);  
  
   if(!loading) 
    {
        return(
            <div>
      <div className='items-carousel'>
        <button className='carousel-arrow'>
            <img src={leftArrow} alt='left-arrow'></img>
        </button>
        <div className='carousel-items-list-wrapper'>
            <ul className='image-carousel-list'>
            </ul>
        </div>
        <button className="carousel-arrow">
            <img src={rightArrow} alt='right-arrow'></img>
        </button>
      </div>
    </div>
        )
    }
  return (
    <div>
      <div className='items-carousel'>
        <button className='carousel-arrow'>
            <img src={leftArrow} alt='left-arrow'></img>
        </button>
        <div className='carousel-items-list-wrapper'>
            <ul className='image-carousel-list'>
                {
                    data.map((item)=>{
                         return <li className='carousel-item'>
                        <div>
                            <img src={
                                displayImageURL(item.imageData)

                            } alt='image-item'></img>
                            <a href='#'>{item.name}</a>
                        </div>
                    </li>
                    })
                }
                
               
                
            </ul>
        </div>
        <button className="carousel-arrow">
            <img src={rightArrow} alt='right-arrow'></img>
        </button>
      </div>
    </div>
  )
}

export default BooksType_Carousel