import React from 'react'
import cover from '../assets/Book_Cover/rezero.png'
import '../Styles/Components/BookItem.css'
const Book_Item = ({key,title,image,state,name}) => {
  return (
    <div>
      <div className='book-represent'>
        <img src={image} alt={name} className='book-image'></img>
        <h3 className='book-title'>{title}</h3>
        <label className='book-state'>{state}</label>
      </div>
    </div>
  )
}
<<<<<<< HEAD

export default Book_Item
=======
export default Book_Item
>>>>>>> FetchToServer
