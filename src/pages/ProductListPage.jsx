import Navbar from "../components/Navbar/Navbar";
import ProductItem from "../components/ProductItem/ProductItem";
import Filter from "../components/Filter/Filter";
import "../App.css";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

function ProductListPage() {
  const { filteredProductData, sortValue, setSortValue } =
    useContext(ProductContext);
  // ====================================================
  return (
    <>
      <Navbar />
      <div className="App">
        <div className="filter">
          <Filter />
        </div>
        <div className="product-section">
          <div className="path-sort-section">
            <div className="path">Home / products / all</div>
            <div className="sort">
              <select
                name="sort"
                defaultValue={sortValue}
                onChange={(e) => {
                  setSortValue(e.target.value);
                }}
                id="sort"
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="htl">Price high to low</option>
                <option value="lth">Price low to high</option>
              </select>
            </div>
          </div>
          <div className="productList">
            {filteredProductData.map((val, index, arr) => {
              return (
                <ProductItem
                  title={val.title}
                  price={val.price}
                  description={val.description}
                  category={val.category}
                  image={val.image}
                  rating={val.rating}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListPage;
