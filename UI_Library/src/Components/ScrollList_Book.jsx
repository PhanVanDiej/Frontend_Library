import React, { useRef } from "react";
import '../Styles/Components/ScrollList.css'
import { useNavigate } from "react-router-dom";
import BookImg from '../assets/Images/book.png'
import leftArrow from '../assets/Icons/left_arrow.png'
import rightArrow from '../assets/Icons/right_arrow.png'
import displayImageURL from "../Env/DisplayImage";

const ScrollList = ({ products }) => {
  const containerRef = useRef(null);
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
  const navigate = useNavigate();
  const handleProductClick = (id) => {
    navigate(`/book_detail/${id}`);
  };
  //Thay the src = {product.image}
  return (
    <div className="product-list-container">
      <button className="arrow left-arrow" onClick={() => handleScroll("left")}>
        <img src={leftArrow}></img>
      </button>
      <div className="product-list" ref={containerRef}>
        {products.map((product) => (
          <div key={product.id} className="product-item" onClick={() => {
            window.location.href="/search_result/"+product.id;
          }}>
            <img width={100} height={50} src={displayImageURL(product.imageData)} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
          </div>
        ))}
      </div>
      <button className="arrow right-arrow" onClick={() => handleScroll("right")}>
        <img width={10} height={10} src={rightArrow}></img>
      </button>
    </div>
  );
};
export default ScrollList;
