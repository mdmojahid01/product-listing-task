import "./App.css";
import ProductContextApi from "./Context/ProductContext";
import ProductListPage from "./pages/ProductListPage";

function App() {
  // =============================
  return (
    <ProductContextApi>
      <ProductListPage />
    </ProductContextApi>
  );
}

export default App;
