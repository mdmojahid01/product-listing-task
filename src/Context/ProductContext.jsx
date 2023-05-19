import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext(1);
function ProductContextApi({ children }) {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [priceRange, setPriceRange] = useState([]);

  const [filteredProductData, setFilteredProductData] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByPrice, setFilterByprice] = useState([]);
  const [filterByBrand, setFilterByBrand] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const hardcoreBrandName = ["Brand1", "Abcd2", "Brand3", "Abcd4"];
  const hardcorePriceRange = [
    "0-100",
    "100-200",
    "200-600",
    "600-1000",
    "1000-",
  ];

  const apiCall = async () => {
    let resCat = await fetch("https://fakestoreapi.com/products/categories");
    let categoriesData = await resCat.json();
    setCategory(categoriesData);
    setBrandName(hardcoreBrandName);
    setPriceRange(hardcorePriceRange);

    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    let count = -1;
    let dataWithBrand = data.map((val) => {
      let i = count < 3 ? (count += 1) : (count = 0);
      val.brand = hardcoreBrandName[i];
      return val;
    });
    setFilteredProductData(dataWithBrand);
    setProductData(dataWithBrand);
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

  const filter = () => {
    const copyData = [...productData];
    // ---------------------------------------------------------------------------
    if (
      filterByCategory.length &&
      filterByPrice.length &&
      filterByBrand.length
    ) {
      const data1 = copyData.filter((val, index) => {
        return filterByCategory.indexOf(val.category) !== -1;
      });

      let data2 = [];
      filterByPrice.forEach((val) => {
        let [first, second] = val.split("-");
        first = parseInt(first);
        if (second === "") {
          second = Infinity;
        } else {
          second = parseInt(second);
        }
        let xData = data1.filter((val) => {
          return first <= val.price && val.price <= second;
        });
        data2 = [...data2, ...xData];
      });

      const data3 = data2.filter((val) => {
        return filterByBrand.indexOf(val.brand) !== -1;
      });
      setFilteredProductData(data3);
    }
    // ----------------------------------------------------------
    else if (filterByCategory.length && filterByPrice.length) {
      const data1 = copyData.filter((val, index) => {
        return filterByCategory.indexOf(val.category) !== -1;
      });

      let data2 = [];
      filterByPrice.forEach((val) => {
        let [first, second] = val.split("-");
        first = parseInt(first);
        if (second === "") {
          second = Infinity;
        } else {
          second = parseInt(second);
        }
        let xData = data1.filter((val) => {
          return first <= val.price && val.price <= second;
        });
        data2 = [...data2, ...xData];
      });
      setFilteredProductData(data2);
    }
    // -------------------------------------------------------------
    else if (filterByBrand.length && filterByPrice.length) {
      let data2 = [];
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
        data2 = [...data2, ...xData];
      });
      const data3 = data2.filter((val) => {
        return filterByBrand.indexOf(val.brand) !== -1;
      });
      setFilteredProductData(data3);
    }
    // ------------------------------------------------------------
    else if (filterByCategory.length && filterByBrand.length) {
      const data1 = copyData.filter((val, index) => {
        return filterByCategory.indexOf(val.category) !== -1;
      });
      const data2 = data1.filter((val) => {
        return filterByBrand.indexOf(val.brand) !== -1;
      });
      setFilteredProductData(data2);
    }
    // --------------------------------------------------------
    else if (filterByCategory.length !== 0) {
      const data = copyData.filter((val, index) => {
        return filterByCategory.indexOf(val.category) !== -1;
      });
      setFilteredProductData(data);
    }
    // ---------------------------------------------------------
    else if (filterByPrice.length !== 0) {
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
      });
      setFilteredProductData(data);
    }
    // -----------------------------------------------------------
    else if (filterByBrand.length !== 0) {
      const data = copyData.filter((val) => {
        return filterByBrand.indexOf(val.brand) !== -1;
      });
      setFilteredProductData(data);
    }
    // -----------------------------------------------------------
    else {
      setFilteredProductData(copyData);
    }
  };
  useEffect(filter, [filterByCategory, filterByPrice, filterByBrand]);

  useEffect(() => {
    if (searchValue.length !== 0) {
      const data = filteredProductData.filter((val, i) => {
        return val.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredProductData(data);
    } else {
      filter();
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
        priceRange,
        brandName,
        filterByBrand,
        setFilterByBrand,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextApi;
