import "./ProductItem.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function ProductItem({ title, price, description, category, image, rating }) {
  return (
    <div className="productItem" title={description}>
      <button className="heart-icon">
        <AiOutlineHeart className="heart" />
        {/* <AiFillHeart style={{ color: "red" }} /> */}
      </button>
      <img src={image} alt={title} />
      <div className="product-content">
        <h1 title={title}>{title}</h1>
        <p>{category}</p>
        <div title={`${rating.rate} star rated by ${rating.count} people`}>
          <span>{rating.rate} ⭐ Rating </span>
          <span>({rating.count})</span>
        </div>
        <div className="price">${price}</div>
      </div>
    </div>
  );
}

export default ProductItem;
