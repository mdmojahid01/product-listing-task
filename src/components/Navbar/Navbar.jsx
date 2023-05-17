import { BsFillBellFill } from "react-icons/bs";
import "./Navbar.css";
import { MdOutlineFilterList } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { useEffect, useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

function Navbar() {
  const { serchValue, setSearchValue, category } = useContext(ProductContext);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // =========================
  document.addEventListener("scroll", () => {
    if (window.scrollY <= 80) {
      document
        .querySelector(".navbar-container")
        .classList.remove("navbar-sticky");
    } else {
      document
        .querySelector(".navbar-container")
        .classList.add("navbar-sticky");
    }
  });

  // =======================================================
  return (
    <div className="navbar-container ">
      <div className="left-nav-con">
        <div className="logo">
          W<span>2</span>N
        </div>
        <div className="search-bar">
          <input
            type="search"
            name="product"
            id=""
            onChange={handleChange}
            value={serchValue}
            placeholder="Search"
          />
          <HiSearch className="search-icon" />
        </div>
      </div>
      <div className="right-nav-con">
        <div className="catagories" title={category.map((val) => "  " + val)}>
          <MdOutlineFilterList />
          Categories
        </div>
        <BsFillBellFill
          style={{
            fontSize: "24px",
            margin: "0px 20px 0px 50px",
            cursor: "pointer",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1683526513573-1effdda48dcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1943&q=80"
          className="profile-icon"
          alt=""
        />
      </div>
    </div>
  );
}

export default Navbar;
