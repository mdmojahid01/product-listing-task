import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext(1);
function ProductContextApi({ children }) {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByPrice, setFilterByprice] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const apiCall = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    setFilteredProductData(data);
    setProductData(data);
    let resCat = await fetch("https://fakestoreapi.com/products/categories");
    let categoriesData = await resCat.json();
    setCategory(categoriesData);
  };
  // ==============================================================
  useEffect(() => {
    apiCall();
  }, []);
  useEffect(() => {
    const copyData = [...filteredProductData];
    if (sortValue === "htl") {
      const data = copyData.sort((a, b) => {
        return b.price - a.price;
      });
      setFilteredProductData(data);
    }
    if (sortValue === "lth") {
      const data = copyData.sort((a, b) => {
        return a.price - b.price;
      });
      setFilteredProductData(data);
    }
  }, [sortValue]);

  useEffect(() => {
    const copyData = [...productData];
    if (filterByCategory.length !== 0) {
      const data = copyData.filter((val, index) => {
        return filterByCategory.indexOf(val.category) !== -1;
      });
      setFilteredProductData(data);
    } else {
      setFilteredProductData(copyData);
    }
  }, [filterByCategory]);

  useEffect(() => {
    const copyData = [...productData];
    if (filterByPrice.length !== 0) {
      let data = [];

      filterByPrice.forEach((val) => {
        let [first, second] = val.split("-");
        first = parseInt(first);
        if (second === "") {
          second = Infinity;
        } else {
          second = parseInt(second);
        }
        let xData = copyData.filter((val) => {
          return first <= val.price && val.price <= second;
        });
        data = [...data, ...xData];
        setFilteredProductData(data);
      });
    } else {
      setFilteredProductData(copyData);
    }
  }, [filterByPrice]);

  useEffect(() => {
    const copyData = [...productData];
    if (searchValue.length !== 0) {
      const data = filteredProductData.filter((val, i) => {
        return val.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredProductData(data);
    } else {
      setFilteredProductData(copyData);
    }
  }, [searchValue]);

  // =======================================================================
  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        category,
        setCategory,
        searchValue,
        setSearchValue,
        filterByCategory,
        setFilterByCategory,
        sortValue,
        setSortValue,
        filteredProductData,
        setFilteredProductData,
        filterByPrice,
        setFilterByprice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextApi;
