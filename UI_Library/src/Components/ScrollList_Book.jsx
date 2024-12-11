import React, { useRef } from "react";
import '../Styles/Components/ScrollList.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import BookImg from '../assets/Images/book.png'
import leftArrow from '../assets/Icons/left_arrow.png'
import rightArrow from '../assets/Icons/right_arrow.png'
const ScrollList = ({ products }) => {
  const containerRef = useRef(null);
<<<<<<< HEAD

=======
>>>>>>> FetchToServer
  const handleScroll = (direction) => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth; // Scroll by one container width
      containerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
<<<<<<< HEAD

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/search_result/${id}`);
  };

=======
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/search_result/${id}`);
  };
>>>>>>> FetchToServer
  //Thay the src = {product.image}
  return (
    <div className="product-list-container">
      <button className="arrow left-arrow" onClick={() => handleScroll("left")}>
        <img src={leftArrow}></img>
      </button>
<<<<<<< HEAD

=======
>>>>>>> FetchToServer
      <div className="product-list" ref={containerRef}>
        {products.map((product) => (
          <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
            <img src={BookImg} alt={product.name} className="product-image" />         
            <p className="product-name">{product.name}</p>
          </div>
        ))}
      </div>
<<<<<<< HEAD

=======
>>>>>>> FetchToServer
      <button className="arrow right-arrow" onClick={() => handleScroll("right")}>
        <img src={rightArrow}></img>
      </button>
    </div>
  );
};
<<<<<<< HEAD
export default ScrollList;
=======
export default ScrollList;
>>>>>>> FetchToServer
