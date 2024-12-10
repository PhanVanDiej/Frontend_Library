import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import '../Styles/Components/BookGrid.css'
import cover from '../assets/Book_Cover/rezero.png'

const BookGrid = ({ productsPerPage = 15 }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulated data fetching
  useEffect(() => {
    const fetchProducts = async () => {

      // Replace this with actual API call
      const data = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        image: '../assets/Book_Cover/rezero.png',
        state: 'Còn sách'
      }));
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

  return (
    <div className="result-container">
      <h1 className="title">Kết quả tìm kiếm</h1>
      <div className="grid-container">
        {currentProducts.map((product) => (
          <div className="grid-item" key={product.id}>
            <img
                src={cover}              // Thay the = product.image 
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