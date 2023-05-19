import "./Filter.css";
import { MdOutlineFilterList } from "react-icons/md";
import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";

function Filter() {
  const {
    category,
    filterByCategory,
    filterByPrice,
    setFilterByCategory,
    setFilterByprice,
    brandName,
    priceRange,
    filterByBrand,
    setFilterByBrand,
  } = useContext(ProductContext);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      if (e.target.checked) {
        if (filterByCategory.indexOf(e.target.value) === -1) {
          setFilterByCategory((old) => {
            return [...old, e.target.value];
          });
        }
      } else {
        if (filterByCategory.indexOf(e.target.value) !== -1) {
          const data = filterByCategory.filter((ex) => {
            return ex !== e.target.value;
          });
          setFilterByCategory(data);
        }
      }
    }
    else if (e.target.name === "price") {
      if (e.target.checked) {
        if (filterByPrice.indexOf(e.target.value) === -1) {
          setFilterByprice((old) => {
            return [...old, e.target.value];
          });
        }
      } else {
        if (filterByPrice.indexOf(e.target.value) !== -1) {
          const data = filterByPrice.filter((ex) => {
            return ex !== e.target.value;
          });
          setFilterByprice(data);
        }
      }
    }
    else if (e.target.name === "brand") {
      if (e.target.checked) {
        if (filterByBrand.indexOf(e.target.value) === -1) {
          setFilterByBrand((old)=>[...old,e.target.value]);
        }
      } else {
        if (filterByBrand.indexOf(e.target.value) !== -1) {
          const data = filterByBrand.filter((ex) => {
            return ex !== e.target.value;
          });
          setFilterByBrand(data);
        }
      }
    }
  };
  // ==================================
  return (
    <div className="filter-container">
      <div className="filter-top">
        <h1>Filter</h1>
        <span className="filter-icon">
          <MdOutlineFilterList />
        </span>
      </div>
      <div className="filter-option">
        <div className="brand-filter x">
          <h3>Brands</h3>
          {brandName.map((val, index) => {
            return (
              <div className="filterName" key={index}>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="brand"
                  checked={filterByBrand.indexOf(val) !== -1 ? true : false}
                  value={val}
                  id={val}
                />
                <label htmlFor={val}>{val}</label>
              </div>
            );
          })}
        </div>
        <div className="categories-filter x">
          <h3>Categories</h3>
          {category.map((val, index) => {
            return (
              <div className="filterName" key={index}>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="category"
                  checked={filterByCategory.indexOf(val) !== -1 ? true : false}
                  value={val}
                  id={val}
                />
                <label htmlFor={val}>{val}</label>
              </div>
            );
          })}
        </div>

        <div className="price-filter x">
          <h3>Price</h3>
          {priceRange.map((val, index) => {
            let [f, s] = val.split("-");
            f += " - ";
            if (f === "0 - ") {
              f = " > ";
              s = "100";
            }
            if (f === "1000 - ") {
              f = "< 1000";
            }

            return (
              <div className="filterName" key={index}>
                <input
                  type="checkbox"
                  name="price"
                  value={val}
                  checked={filterByPrice.indexOf(val) !== -1 ? true : false}
                  onChange={handleChange}
                  id={val}
                />
                <label htmlFor={val}>
                  {f}
                  {s}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filter;
