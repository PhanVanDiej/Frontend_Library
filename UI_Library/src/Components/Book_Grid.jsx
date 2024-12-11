import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import '../Styles/Components/BookGrid.css'
import cover from '../assets/Book_Cover/rezero.png'
import { useNavigate } from "react-router-dom"; 
import BE_ENDPOINT from "../Env/EndPont"; 
import displayImageURL from "../Env/DisplayImage";

const BookGrid = ({ productsPerPage = 15, id }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulated data fetching
  useEffect(() => {
    const fetchProducts = async () => {

      // Replace this with actual API call
      /*const data = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        image: '../assets/Book_Cover/rezero.png',
        state: 'Còn sách'
      }));*/
      const response = await fetch(BE_ENDPOINT+"book-titles/get/byBookType/"+id);
      const responseData = await response.json(); 

      const data= responseData.map((item)=>{ 
        let state="";
        if(item.amountRemaining>0) state="Còn sách";
        else state="Hết sách";
        return {
          id: item.id,
          name: item.name,
          image: displayImageURL(item.imageData),
          state:state
        }
      })
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Pagination logic
  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  //Dieu huong den book_detail
  const navigate = useNavigate();
  const handleProductClick=({id})=>{
    navigate(`/book_detail/${id}`);
  }
  return (
    <div className="result-container">
      <h1 className="title">Kết quả tìm kiếm</h1>
      <div className="grid-container">
        {currentProducts.map((product) => (
          <div className="grid-item" key={product.id} onClick={() =>{
            window.location.href="/book_detail/"+product.id;
          }}>
            <img
                src={product.image}              // Thay the = product.image 
                alt={product.name} 
            />
            <p>{product.name}</p>
            <label>{product.state}</label>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Trước"}
        nextLabel={"Kế →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default BookGrid; 

